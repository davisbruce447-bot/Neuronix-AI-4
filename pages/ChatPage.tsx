
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { ChatTurn, Message, UserMessage, AiResponse, ChatSessionSummary } from '../services/types';
import { getAiResponses } from '../services/aiService';
import { useCredits } from '../contexts/CreditContext';
import { MODELS } from '../constants';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as chatService from '../services/chatService';

const ChatPage: React.FC = () => {
    const [chatTurns, setChatTurns] = useState<ChatTurn[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>(['gemini', 'chatgpt']);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatSessionSummary[]>([]);

    const { credits, deductCredit, isCreditInitialized } = useCredits();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            chatService.fetchChatHistory(user.id).then(setChatHistory);
        }
    }, [user]);

    const handleSendMessage = useCallback(async (prompt: string, file?: File) => {
        if (!prompt.trim() || isLoading || credits <= 0 || !user) return;

        deductCredit();

        const userMessage: UserMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: prompt,
        };

        const tempTurnId = `turn-${Date.now()}`;
        const newTurnForDisplay: ChatTurn = {
            id: tempTurnId,
            userMessage,
            aiResponses: [],
        };
        
        setChatTurns(prev => [...prev, newTurnForDisplay]);
        setIsLoading(true);

        try {
            const responses = await getAiResponses(prompt, selectedModels);
            
            if (currentSessionId) {
                const savedTurn = await chatService.addTurnToChatSession(currentSessionId, { userMessage, aiResponses: responses });
                setChatTurns(prev => prev.map(t => t.id === tempTurnId ? savedTurn : t));
            } else {
                const { newSession, newTurn } = await chatService.createNewChatSession(user.id, { userMessage, aiResponses: responses });
                setCurrentSessionId(newSession.id);
                setChatHistory(prev => [newSession, ...prev]);
                setChatTurns(prev => prev.map(t => t.id === tempTurnId ? newTurn : t));
            }

        } catch (error) {
            console.error("Failed to process message:", error);
            const errorResponse: AiResponse = {
                id: `error-${Date.now()}`,
                role: 'model',
                content: "Sorry, something went wrong. Please try again.",
                model: "System",
            };
            setChatTurns(prev => prev.map(turn => 
                turn.id === tempTurnId ? { ...turn, aiResponses: [errorResponse] } : turn
            ));
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, credits, selectedModels, deductCredit, user, currentSessionId]);

    const handleNewChat = () => {
        setChatTurns([]);
        setCurrentSessionId(null);
    }
    
    const handleSelectSession = async (sessionId: string) => {
        setIsLoading(true);
        try {
            const turns = await chatService.fetchChatSessionTurns(sessionId);
            setChatTurns(turns);
            setCurrentSessionId(sessionId);
        } catch (error) {
            console.error("Failed to load session:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const showCreditWarning = isCreditInitialized && credits <= 0;

    return (
        <div className="h-[calc(100vh-64px)] flex">
            <Sidebar 
                models={MODELS}
                selectedModels={selectedModels}
                onModelChange={setSelectedModels}
                onNewChat={handleNewChat}
                chatHistory={chatHistory}
                onSelectSession={handleSelectSession}
            />
            <div className="flex flex-col flex-1 bg-brand-surface">
                <ChatWindow chatTurns={chatTurns} isLoading={isLoading} selectedModels={selectedModels} />
                 {showCreditWarning ? (
                    <div className="p-4 text-center bg-yellow-900/50 border-t border-brand-border">
                        <p className="text-yellow-300">Daily limit reached. <Link to="/upgrade" className="font-bold underline hover:text-yellow-200">Upgrade to Pro</Link> for unlimited access.</p>
                    </div>
                ) : (
                    <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} isDisabled={credits <= 0 && isCreditInitialized} />
                )}
            </div>
        </div>
    );
};

export default ChatPage;
