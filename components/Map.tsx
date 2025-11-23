
import React, { useEffect, useRef } from 'react';
import { MAP_REGIONS, TRIBES, BIBLICAL_CITIES } from '../constants';
import { Selection, TribeId, Difficulty, Language } from '../types';

// Leaflet global
declare const L: any;

interface MapProps {
  matchedTribes: TribeId[];
  selection: Selection | null;
  onRegionClick: (regionId: string, tribeId: TribeId) => void;
  showAll?: boolean;
  difficulty?: Difficulty;
  showCities?: boolean;
  language: Language;
}

const Map: React.FC<MapProps> = ({ 
  matchedTribes, 
  selection, 
  onRegionClick, 
  showAll = false, 
  difficulty = 'EASY', 
  showCities = false,
  language
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{ [key: string]: { polygon: any; label: any; isMatched?: boolean } }>({});
  const citiesLayerRef = useRef<any>(null);
  
  // Keep a ref to the latest callback to avoid stale closures in Leaflet event listeners
  const onRegionClickRef = useRef(onRegionClick);

  // Update the ref whenever the callback prop changes (which happens when state/language changes in App)
  useEffect(() => {
    onRegionClickRef.current = onRegionClick;
  }, [onRegionClick]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [32.15, 35.3], // Center of Israel
      zoom: 8,
      zoomControl: true,
      minZoom: 7,
      maxZoom: 11,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Draw Polygons
    MAP_REGIONS.forEach((region) => {
      const polygon = L.polygon(region.coords, {
        color: '#78716c', // Stone gray
        weight: 1,
        fillColor: '#e7e5e4', // warm gray
        fillOpacity: 0.5,
        lineJoin: 'round', // Smoother corners
        className: 'cursor-pointer transition-all duration-300'
      }).addTo(map);

      // Event Listeners
      polygon.on('click', (e: any) => {
        L.DomEvent.stopPropagation(e); 
        // Use the ref to call the latest version of the function
        onRegionClickRef.current(region.id, region.tribeId);
      });

      polygon.on('mouseover', () => {
        const layerState = layersRef.current[region.id];
        if (!layerState) return;
        
        const isMatched = layerState.isMatched; 
        const isSelected = polygon.options.className?.includes('selected');
        
        if (!isMatched && !isSelected) {
             polygon.setStyle({ 
               fillOpacity: 0.8, 
               fillColor: '#d6d3d1', // slightly darker warm gray
               weight: 2 
            });
        } else if (isMatched) {
             polygon.setStyle({ fillOpacity: 0.9, weight: 2 });
        }
      });

      polygon.on('mouseout', () => {
        const layerState = layersRef.current[region.id];
        if (!layerState) return;

        const isMatched = layerState.isMatched;
        const isSelected = polygon.options.className?.includes('selected');

        if (!isMatched && !isSelected) {
             polygon.setStyle({ 
               fillOpacity: 0.5, 
               fillColor: '#e7e5e4',
               weight: 1 
            });
        } else if (isMatched) {
             polygon.setStyle({ fillOpacity: 0.75, weight: 1 });
        }
      });

      layersRef.current[region.id] = { polygon, label: null, isMatched: false };
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); 

  // Update Map Polygons State
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    MAP_REGIONS.forEach((region) => {
      const layer = layersRef.current[region.id];
      if (!layer) return;

      const { polygon } = layer;
      const isMatched = matchedTribes.includes(region.tribeId) || showAll;
      const isSelected = selection?.type === 'REGION' && selection.value === region.id;
      const tribe = TRIBES.find(t => t.id === region.tribeId);

      layer.isMatched = isMatched;

      // Style Update
      if (isMatched) {
        polygon.setStyle({
          fillColor: tribe?.color || '#ccc',
          fillOpacity: 0.75, 
          color: '#44403c', // Darker stone border
          weight: 1,
          className: 'matched'
        });
        
        if (layer.label) {
          layer.label.remove();
        }

        const tribeName = tribe?.name[language];
        let labelContent = `<div class="font-bold text-base text-stone-900 leading-tight font-rubik">${tribeName}</div>`;
        
        if (difficulty === 'HARD') {
           const judgeName = tribe?.judge[language];
           labelContent += `<div class="text-[10px] sm:text-xs font-medium mt-1 pt-1 border-t border-stone-400/50 text-stone-800 leading-none">${judgeName}</div>`;
        }

        const labelIcon = L.divIcon({
          className: 'bg-transparent flex justify-center items-center',
          html: `<div class="font-rubik text-center drop-shadow-md px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm border border-stone-300 shadow-sm min-w-[70px] max-w-[120px] transition-all whitespace-normal transform hover:scale-110" dir="${language === 'he' ? 'rtl' : 'ltr'}">
                  ${labelContent}
                 </div>`,
          iconSize: [100, 'auto'],
          iconAnchor: [50, 20]
        });
        
        layer.label = L.marker(region.center, { icon: labelIcon, interactive: false }).addTo(mapInstanceRef.current);
        layer.label.setZIndexOffset(1000);

      } else if (isSelected) {
        polygon.setStyle({
          fillColor: '#60a5fa',
          fillOpacity: 0.8,
          color: '#2563eb',
          weight: 3,
          className: 'selected'
        });
        if (layer.label) {
          layer.label.remove();
          layer.label = null;
        }
      } else {
        polygon.setStyle({
          fillColor: '#e7e5e4',
          fillOpacity: 0.5,
          color: '#78716c',
          weight: 1,
          className: ''
        });

        if (layer.label) {
          layer.label.remove();
          layer.label = null;
        }
      }

      if (region.id === 'simeon') {
        polygon.bringToFront();
      }
    });
  }, [matchedTribes, selection, showAll, difficulty, language]);

  // Update Biblical Cities Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing cities
    if (citiesLayerRef.current) {
      citiesLayerRef.current.forEach((marker: any) => marker.remove());
    }
    citiesLayerRef.current = [];

    if (showCities) {
      BIBLICAL_CITIES.forEach(city => {
        const cityName = city.name[language];
        const cityIcon = L.divIcon({
          className: 'bg-transparent flex flex-col items-center justify-center pointer-events-none',
          html: `
            <div class="flex flex-col items-center pointer-events-none">
              <div class="w-3 h-3 bg-stone-800 border-2 border-white rounded-full shadow-sm pointer-events-none"></div>
              <span class="text-xs font-bold text-stone-900 mt-1 bg-white/70 px-1 rounded shadow-sm whitespace-nowrap pointer-events-none">${cityName}</span>
            </div>
          `,
          iconSize: [60, 40],
          iconAnchor: [30, 6] // Anchor at the dot
        });

        const marker = L.marker(city.coords, { icon: cityIcon, interactive: false }).addTo(mapInstanceRef.current);
        marker.setZIndexOffset(2000); // Always on top
        citiesLayerRef.current.push(marker);
      });
    }

  }, [showCities, language]);

  return (
    <div className="relative w-full h-[600px] rounded-xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] border-4 border-stone-200 overflow-hidden z-0 bg-[#f5f5dc]">
      {/* Parchment texture overlay effect using opacity */}
      <div className="absolute inset-0 bg-amber-50 opacity-30 pointer-events-none z-10 mix-blend-multiply"></div>
      <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 0 }} />
    </div>
  );
};

export default Map;
