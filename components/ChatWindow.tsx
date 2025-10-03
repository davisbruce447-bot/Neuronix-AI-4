
import React, { useRef, useEffect } from 'react';
import { ChatTurn, AiResponse } from '../services/types';
import { MODELS } from '../constants';

interface ChatWindowProps {
  chatTurns: ChatTurn[];
  isLoading: boolean;
  selectedModels: string[];
}

const ModelResponseCard: React.FC<{ response: AiResponse }> = ({ response }) => (
  <div className="bg-brand-bg rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      {response.modelIcon}
      <h4 className="font-semibold text-sm text-brand-secondary">{response.model}</h4>
    </div>
    <p className="text-brand-secondary whitespace-pre-wrap">{response.content}</p>
  </div>
);

const LoadingSkeleton: React.FC<{ modelId: string }> = ({ modelId }) => {
    const model = MODELS.find(m => m.id === modelId);
    if (!model) return null;

    return (
        <div className="bg-brand-bg rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-2 mb-3">
                {model.icon}
                <h4 className="font-semibold text-sm text-brand-secondary">{model.name}</h4>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-brand-surface rounded w-3/4"></div>
                <div className="h-4 bg-brand-surface rounded w-full"></div>
                <div className="h-4 bg-brand-surface rounded w-1/2"></div>
            </div>
        </div>
    );
};


const ChatWindow: React.FC<ChatWindowProps> = ({ chatTurns, isLoading, selectedModels }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatTurns, isLoading]);

  const isLastTurnLoading = isLoading && chatTurns.length > 0 && chatTurns[chatTurns.length - 1].aiResponses.length === 0;

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {chatTurns.length === 0 && !isLoading && (
            <div className="text-center pt-20">
                <h2 className="text-3xl font-bold text-white">Neuronix-AI</h2>
                <p className="mt-2 text-brand-muted">Start a new chat or select one from your history.</p>
            </div>
        )}
        {chatTurns.map((turn) => (
          <div key={turn.id}>
            <div className="mb-4">
              <div className="font-bold text-lg text-brand-primary mb-2">You</div>
              <p className="text-brand-secondary whitespace-pre-wrap">{turn.userMessage.content}</p>
            </div>
            {turn.aiResponses.length > 0 && (
                <div className="space-y-4">
                    {turn.aiResponses.map((response) => (
                        <ModelResponseCard key={response.id} response={response} />
                    ))}
                </div>
            )}
          </div>
        ))}
         {isLastTurnLoading && (
            <div className="space-y-4">
                {selectedModels.map(modelId => <LoadingSkeleton key={modelId} modelId={modelId} />)}
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
