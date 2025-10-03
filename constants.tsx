
import React from 'react';
import { Model } from './services/types';

const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.46 11.23a5.83 5.83 0 0 0-3.32-3.32l-1.32.9a7.22 7.22 0 0 1 4.14 4.14l.9-1.32.41-.6zM8.38 6.51a5.83 5.83 0 0 0-1.87 5.18l-1.4.2a7.22 7.22 0 0 1 2.33-6.4l.94.98.04.04zM15.62 17.49a5.83 5.83 0 0 0 1.87-5.18l1.4-.2a7.22 7.22 0 0 1-2.33 6.4l-.94-.98-.04-.04zM9.54 12.77a5.83 5.83 0 0 0 3.32 3.32l1.32-.9a7.22 7.22 0 0 1-4.14-4.14l-.9 1.32-.41.6zM6 12a6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6zm6-7.5a7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5 7.5 7.5 0 0 0-7.5-7.5z"/>
  </svg>
);

const GptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-3.388.232c-.126-.232-.303-.424-.515-.562l-3.32-2.147-1.026 1.768 1.956 1.25c.07.045.11.12.11.202v3.313c0 .082-.04.157-.11.202l-1.956 1.25-1.026 1.768 3.32-2.147c.212-.138.389-.33.515-.562.126-.233.19-.5.19-.778v-3.313c0-.278-.064-.545-.19-.778zm-13.224 0c-.126-.232-.303-.424-.515-.562L1.553 9.523l1.026 1.768L4.535 12.54c.07.045.11.12.11.202v3.313c0 .082-.04.157-.11.202l-1.956 1.25 1.026 1.768 3.32-2.147c.212-.138.389-.33.515-.562.126-.233.19-.5.19-.778v-3.313c0-.278-.064-.545-.19-.778zM12 5.5c.345 0 .625.28.625.625v2.75h-1.25V6.125c0-.345.28-.625.625-.625zm0 13c-.345 0-.625-.28-.625-.625v-2.75h1.25v2.75c0 .345-.28.625-.625.625zm-2.81-5.182l1.025-1.768-1.955-1.25c-.07-.045-.11-.12-.11-.202V7.873c0-.278.064-.545.19-.778.126-.232.303-.424.515-.562L12 5.047l3.13 2.24c.212.138.389.33.515.562.126.233.19.5.19.778v3.313c0 .082-.04.157-.11.202l-1.956 1.25-1.026-1.768 1.956-1.25c.07-.045.11-.12.11-.202v-3.313c0-.082-.04-.157-.11-.202l-1.956-1.25-1.026 1.768 1.956 1.25c.07.045.11.12.11.202v.001c0 .082-.04.157-.11.202L12 14.953l-1.174-.75z"/>
  </svg>
);


export const MODELS: Model[] = [
  { id: 'chatgpt', name: 'ChatGPT', icon: <GptIcon className="w-5 h-5 text-[#74AA9C]" /> },
  { id: 'gemini', name: 'Gemini', icon: <GeminiIcon className="w-5 h-5 text-[#8E76D8]" /> },
  { id: 'claude', name: 'Claude', icon: <div className="w-4 h-4 rounded-md bg-[#D97755] flex items-center justify-center text-white text-xs font-bold">C</div> },
  { id: 'grok', name: 'Grok', icon: <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">G</div> },
  { id: 'mistral', name: 'Mistral', icon: <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">M</div> },
  { id: 'llama', name: 'Llama', icon: <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">L</div> },
];

export const DAILY_FREE_CREDITS = 10;
