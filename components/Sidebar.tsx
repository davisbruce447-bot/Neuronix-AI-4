
import React from 'react';
import { Model, ChatSessionSummary } from '../services/types';

interface SidebarProps {
  models: Model[];
  selectedModels: string[];
  onModelChange: (selected: string[]) => void;
  onNewChat: () => void;
  chatHistory: ChatSessionSummary[];
  onSelectSession: (sessionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ models, selectedModels, onModelChange, onNewChat, chatHistory, onSelectSession }) => {
  const handleCheckboxChange = (modelId: string) => {
    const newSelection = selectedModels.includes(modelId)
      ? selectedModels.filter((id) => id !== modelId)
      : [...selectedModels, modelId];
    onModelChange(newSelection);
  };

  return (
    <aside className="w-64 bg-brand-bg border-r border-brand-border flex flex-col p-4">
      <button 
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-blue-500 transition-colors"
      >
        <PlusIcon />
        New Chat
      </button>

      <div className="mt-6">
        <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">Models</h3>
        <div className="space-y-2">
          {models.map((model) => (
            <label
              key={model.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-brand-surface cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded bg-brand-surface border-brand-border text-brand-primary focus:ring-brand-primary"
                checked={selectedModels.includes(model.id)}
                onChange={() => handleCheckboxChange(model.id)}
              />
              {model.icon}
              <span className="text-sm font-medium text-brand-secondary">{model.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-brand-border flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">History</h3>
        <div className="space-y-2 text-sm text-brand-muted">
            {chatHistory.length > 0 ? (
                chatHistory.map(session => (
                    <button 
                        key={session.id}
                        onClick={() => onSelectSession(session.id)}
                        className="w-full text-left p-2 rounded-md hover:bg-brand-surface truncate text-brand-secondary"
                    >
                        {session.title}
                    </button>
                ))
            ) : (
                <p className="p-2 text-xs">No chat history yet.</p>
            )}
        </div>
      </div>
    </aside>
  );
};

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);


export default Sidebar;
