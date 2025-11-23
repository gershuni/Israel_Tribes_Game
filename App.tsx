
import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import TribeList from './components/TribeList';
import { GameState, Selection, TribeId, Difficulty, Language } from './types';
import { TRIBES, WIN_SCORE, PENALTY_SCORE, MAP_REGIONS, UI_LABELS } from './constants';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    matchedTribes: [],
    mistakes: 0,
    currentFact: null,
    loadingFact: false,
    gameCompleted: false,
  });

  const [selection, setSelection] = useState<Selection | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [language, setLanguage] = useState<Language>('he');
  
  // Check if game is complete
  useEffect(() => {
    if (gameState.matchedTribes.length === TRIBES.length && !gameState.gameCompleted) {
      setGameState(prev => ({ ...prev, gameCompleted: true }));
      triggerWinConfetti();
    }
  }, [gameState.matchedTribes, gameState.gameCompleted]);

  const triggerWinConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d97706', '#f59e0b', '#78350f']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d97706', '#f59e0b', '#78350f']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleMatchSuccess = async (tribeId: TribeId) => {
    const tribe = TRIBES.find(t => t.id === tribeId);
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + WIN_SCORE,
      matchedTribes: [...prev.matchedTribes, tribeId],
      loadingFact: false,
      currentFact: null
    }));

    setSelection(null);
    
    const successMsg = difficulty === 'HARD' 
      ? UI_LABELS.correctMatchJudge[language]
          .replace('{judge}', tribe?.judge[language] || '')
          .replace('{name}', tribe?.name[language] || '')
      : UI_LABELS.correctMatch[language]
          .replace('{name}', tribe?.name[language] || '');

    setNotification({ type: 'success', message: successMsg });
  };

  const handleMatchFailure = (selectedTribeId: TribeId, clickedIncorrectTribeId?: TribeId) => {
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score - PENALTY_SCORE), // Prevent negative score
      mistakes: prev.mistakes + 1
    }));
    setSelection(null);

    const errorMsg = UI_LABELS.errorMatch[language];
    
    setNotification({ type: 'error', message: errorMsg });
    
    setTimeout(() => {
        setNotification(null);
    }, 3500);
  };

  const getTribeIdFromRegionSelection = (regionId: string): TribeId | undefined => {
      const region = MAP_REGIONS.find((r) => r.id === regionId);
      return region ? region.tribeId : undefined;
  };

  const handleInteraction = (type: 'NAME' | 'REGION', value: string, relatedTribeId?: TribeId) => {
    if (showAll) return; 
    
    if (type === 'NAME' && gameState.matchedTribes.includes(value as TribeId)) {
        return;
    }
    if (type === 'REGION' && relatedTribeId && gameState.matchedTribes.includes(relatedTribeId)) return;

    if (!selection) {
      setSelection({ type, value });
      
      let instructions = '';
      if (type === 'NAME') {
        instructions = UI_LABELS.selectRegion[language];
      } else {
        instructions = difficulty === 'HARD' ? UI_LABELS.selectJudge[language] : UI_LABELS.selectTribe[language];
      }
      
      setNotification({ type: 'info', message: instructions });
    } else {
      if (selection.type === type) {
        setSelection({ type, value });
        return;
      }

      const nameId = type === 'NAME' ? value : selection.value;
      const regionTribeId = type === 'REGION' ? relatedTribeId : (selection.type === 'REGION' ? getTribeIdFromRegionSelection(selection.value) : null);

      if (nameId === regionTribeId) {
        handleMatchSuccess(nameId as TribeId);
      } else {
        if (type === 'REGION' && regionTribeId) {
             handleMatchFailure(nameId as TribeId, regionTribeId);
        } else if (type === 'NAME') {
             const target = selection.type === 'NAME' ? selection.value : getTribeIdFromRegionSelection(selection.value);
             const mistake = type === 'NAME' ? value : relatedTribeId;
             handleMatchFailure(target as TribeId, mistake as TribeId);
        } else {
             handleMatchFailure(nameId as TribeId);
        }
      }
    }
  };

  const onRegionClick = (regionId: string, tribeId: TribeId) => {
    if (showAll) return;

    if (selection?.type === 'NAME') {
      if (selection.value === tribeId) {
        handleMatchSuccess(tribeId);
      } else {
        handleMatchFailure(selection.value as TribeId, tribeId);
      }
    } else {
      handleInteraction('REGION', regionId, tribeId);
    }
  };

  const onSelectTribe = (tribeId: TribeId) => {
     if (showAll) return;

     if (selection?.type === 'REGION') {
       const regionTribeId = getTribeIdFromRegionSelection(selection.value);
       if (regionTribeId === tribeId) {
         handleMatchSuccess(tribeId);
       } else {
         handleMatchFailure(regionTribeId as TribeId, tribeId);
       }
     } else {
       handleInteraction('NAME', tribeId);
     }
  };

  const handleHint = () => {
    if (!selection) {
      setNotification({ type: 'info', message: UI_LABELS.hintError[language] });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    let targetTribeId: TribeId | undefined;

    if (selection.type === 'NAME') {
      targetTribeId = selection.value as TribeId;
    } else if (selection.type === 'REGION') {
      targetTribeId = getTribeIdFromRegionSelection(selection.value);
    }

    if (targetTribeId) {
      const tribe = TRIBES.find(t => t.id === targetTribeId);
      
      setGameState(prev => ({
        ...prev,
        score: Math.max(0, prev.score - 1)
      }));
      
      const hintMsg = tribe?.hint[language] || UI_LABELS.hintNotFound[language];
      setNotification({ type: 'info', message: UI_LABELS.hintUsed[language].replace('{msg}', hintMsg) });
    }
  };

  const resetGame = () => {
    setGameState({
      score: 0,
      matchedTribes: [],
      mistakes: 0,
      currentFact: null,
      loadingFact: false,
      gameCompleted: false,
    });
    setSelection(null);
    setNotification(null);
    setShowAll(false);
  };

  const changeDifficulty = (mode: Difficulty) => {
    if (mode !== difficulty) {
      setDifficulty(mode);
      resetGame();
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setSelection(null);
    setNotification(null);
  };

  // Display logic for the "Info Card"
  const lastMatchedTribeId = gameState.matchedTribes.length > 0 ? gameState.matchedTribes[gameState.matchedTribes.length - 1] : null;
  const lastMatchedTribe = lastMatchedTribeId ? TRIBES.find(t => t.id === lastMatchedTribeId) : null;

  return (
    <div dir={language === 'he' ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col items-center py-4 px-4 max-w-7xl mx-auto font-assistant bg-stone-50 text-stone-900">
      
      {/* Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center mb-4 bg-[#fffbf0] p-3 rounded-xl shadow-md border border-amber-200/50 gap-3 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]">
        
        {/* Language & Difficulty Controls */}
        <div className="flex flex-col gap-2 order-3 md:order-1 items-center md:items-start">
           <div className="flex bg-stone-200/50 p-1 rounded-lg">
             <button 
                onClick={() => handleLanguageChange('he')} 
                className={`px-2 py-1 rounded text-xs font-bold ${language === 'he' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'}`}
             >
               עברית
             </button>
             <button 
                onClick={() => handleLanguageChange('en')} 
                className={`px-2 py-1 rounded text-xs font-bold ${language === 'en' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500'}`}
             >
               English
             </button>
           </div>
           
           <div className="flex bg-stone-200/50 p-1 rounded-lg">
             <button 
               onClick={() => changeDifficulty('EASY')}
               className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${difficulty === 'EASY' ? 'bg-white shadow-sm text-amber-700' : 'text-stone-500 hover:text-stone-700'}`}
             >
               {UI_LABELS.modeTribes[language]}
             </button>
             <button 
               onClick={() => changeDifficulty('HARD')}
               className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${difficulty === 'HARD' ? 'bg-white shadow-sm text-red-700' : 'text-stone-500 hover:text-stone-700'}`}
             >
               {UI_LABELS.modeJudges[language]}
             </button>
          </div>
        </div>

        <div className="text-center order-1 md:order-2">
          <h1 className="text-3xl font-extrabold text-amber-900 font-rubik tracking-tight drop-shadow-sm">{UI_LABELS.title[language]}</h1>
          <p className="text-amber-800 font-medium text-sm">
            {difficulty === 'EASY' ? UI_LABELS.subtitleEasy[language] : UI_LABELS.subtitleHard[language]}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-2 order-2 md:order-3">
           <button
            onClick={() => setShowCities(!showCities)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg font-bold transition-colors text-xs ${
              showCities 
              ? 'bg-stone-700 text-stone-100'
              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">{UI_LABELS.citiesShow[language]}</span>
          </button>

          <button
            onClick={handleHint}
            disabled={!selection || showAll || gameState.gameCompleted}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg font-bold transition-colors text-xs ${
              !selection || showAll || gameState.gameCompleted
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">{UI_LABELS.hint[language]}</span>
          </button>

          <button 
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg font-bold transition-colors text-xs ${showAll ? 'bg-stone-800 text-stone-100' : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'}`}
          >
            <span className="hidden sm:inline">{showAll ? UI_LABELS.hideAll[language] : UI_LABELS.showAll[language]}</span>
          </button>

          <div className="text-center hidden lg:block bg-white/50 px-2 py-0.5 rounded-lg border border-stone-200">
            <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider">{UI_LABELS.score[language]}</span>
            <span className="text-xl font-bold text-amber-700 font-rubik leading-none">{gameState.score}</span>
          </div>
          <button 
            onClick={resetGame}
            className="bg-stone-100 hover:bg-stone-200 text-stone-600 p-1.5 rounded-full transition-colors border border-stone-200"
            title={UI_LABELS.restart[language]}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <div className="flex flex-col lg:flex-row gap-6 w-full flex-grow items-start">
        
        {/* Map Container */}
        <div className="w-full lg:w-2/3 flex flex-col">
            <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-[#dcd7c9] bg-[#f0eadd]">
               <Map 
                 matchedTribes={gameState.matchedTribes} 
                 selection={selection}
                 onRegionClick={onRegionClick}
                 showAll={showAll}
                 difficulty={difficulty}
                 showCities={showCities}
                 language={language}
               />
               
               {/* Overlay Notification */}
               {notification && (
                 <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-xl font-bold text-white transition-all animate-bounce z-[2500] w-auto max-w-[85%] text-center text-base border-2 border-white/20 backdrop-blur-sm whitespace-normal break-words leading-relaxed ${
                   notification.type === 'success' ? 'bg-green-700/95' : 
                   notification.type === 'error' ? 'bg-red-700/95' : 'bg-amber-600/95'
                 }`}>
                   {notification.message}
                 </div>
               )}
            </div>
            <div className="mt-2 text-center">
                <span className="text-stone-500 text-xs italic">{UI_LABELS.footerQuote[language]}</span>
            </div>
        </div>

        {/* Sidebar / Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3 lg:h-[600px]">
          
          {/* Mobile Stats */}
          <div className="flex justify-around lg:hidden bg-white p-2 rounded-lg shadow-sm border border-stone-200 shrink-0">
             <div className="text-center">
                <span className="text-[10px] text-stone-400 font-bold">{UI_LABELS.score[language]}</span>
                <span className="block font-bold text-amber-700 font-rubik text-sm">{gameState.score}</span>
             </div>
             <div className="text-center">
                <span className="text-[10px] text-stone-400 font-bold">{UI_LABELS.completed[language]}</span>
                <span className="block font-bold text-green-700 font-rubik text-sm">{gameState.matchedTribes.length}/{TRIBES.length}</span>
             </div>
          </div>

          {/* Education Card (Pasuk / Info) */}
          <div className={`bg-[#fffbf0] rounded-xl shadow-md border-r-4 ${lastMatchedTribe ? 'border-amber-500' : 'border-stone-300'} p-4 min-h-[110px] shrink-0 transition-all relative overflow-hidden`}>
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 to-transparent opacity-50"></div>
             
             <h3 className="text-amber-900/60 font-bold text-xs mb-2 uppercase tracking-wide flex items-center gap-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
               </svg>
               {lastMatchedTribe ? UI_LABELS.infoTitle[language] : UI_LABELS.instructionsTitle[language]}
             </h3>
             
             <div className="max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent pl-1">
                {lastMatchedTribe ? (
                  <div className="animate-fade-in">
                    <p className="text-lg font-rubik text-stone-800 leading-snug mb-1">
                      "{lastMatchedTribe.biblicalSource.text[language]}"
                    </p>
                    <p className="text-xs text-amber-700 font-bold mb-2">
                      ({lastMatchedTribe.biblicalSource.source[language]})
                    </p>
                    
                    {difficulty === 'HARD' && (
                      <div className="mt-2 p-2 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-700">
                        <span className="font-bold block mb-0.5 text-stone-900">{UI_LABELS.identification[language]}</span>
                        {lastMatchedTribe.judgeDescription?.[language]}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {difficulty === 'HARD' 
                      ? UI_LABELS.instructionsHard[language]
                      : UI_LABELS.instructionsEasy[language]}
                  </p>
                )}
             </div>
          </div>

          {/* Tribe Selection List - Scrollable on desktop */}
          <div className="bg-white rounded-xl shadow-sm p-3 border border-stone-200 flex-1 overflow-y-auto custom-scrollbar min-h-0">
             <TribeList 
               matchedTribes={gameState.matchedTribes}
               selection={selection}
               onSelectTribe={onSelectTribe}
               difficulty={difficulty}
               language={language}
             />
          </div>

        </div>
      </div>
      
      {/* Game Completed Modal */}
      {gameState.gameCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-[#fffbf0] rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform scale-100 transition-transform border-4 border-amber-200 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]">
            <h2 className="text-4xl font-extrabold text-amber-800 mb-2 font-rubik">{UI_LABELS.winTitle[language]}</h2>
            <p className="text-xl text-stone-700 mb-6">{UI_LABELS.winMessage[language]}</p>
            
            <div className="bg-white/80 rounded-lg p-4 mb-6 border border-amber-100">
              <p className="text-stone-500 text-sm uppercase tracking-widest">{UI_LABELS.finalScore[language]}</p>
              <p className="text-5xl font-bold text-amber-600 font-rubik">{gameState.score}</p>
            </div>

            <button 
              onClick={resetGame}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl font-rubik"
            >
              {UI_LABELS.restart[language]}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
