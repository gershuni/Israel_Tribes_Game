
import React from 'react';
import { TRIBES, UI_LABELS } from '../constants';
import { Selection, TribeId, Difficulty, Language } from '../types';

interface TribeListProps {
  matchedTribes: TribeId[];
  selection: Selection | null;
  onSelectTribe: (id: TribeId) => void;
  difficulty: Difficulty;
  language: Language;
}

const TribeList: React.FC<TribeListProps> = ({ matchedTribes, selection, onSelectTribe, difficulty, language }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 w-full">
      {TRIBES.map((tribe) => {
        const isMatched = matchedTribes.includes(tribe.id);
        const isSelected = selection?.type === 'NAME' && selection.value === tribe.id;
        
        let displayText = tribe.name[language];
        let subText = '';

        if (difficulty === 'HARD') {
          displayText = tribe.judge[language];
          if (isMatched) {
            subText = tribe.name[language];
          } else {
            subText = UI_LABELS.whichTribe[language];
          }
        } else {
           // Easy Mode
           displayText = tribe.name[language];
        }

        return (
          <button
            key={tribe.id}
            onClick={() => !isMatched && onSelectTribe(tribe.id)}
            disabled={isMatched}
            className={`
              px-2 py-1.5 rounded-md transition-all shadow-sm border
              flex flex-col items-center justify-center text-center min-h-[48px]
              ${isMatched 
                ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-default opacity-70' 
                : isSelected 
                    ? 'bg-blue-600 text-white border-blue-700 transform scale-102 shadow-md z-10' 
                    : 'bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }
            `}
          >
            <span className="font-bold text-sm sm:text-base leading-tight">{displayText}</span>
            {subText && <span className="text-[10px] font-medium leading-none mt-0.5 opacity-80">{subText}</span>}
            
            {isMatched && (
              <div className="mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TribeList;
