import { supabase } from '../lib/supabaseClient';
import { AiResponse, ChatSessionSummary, ChatTurn, UserMessage } from './types';

export const fetchChatHistory = async (userId: string): Promise<ChatSessionSummary[]> => {
    const { data, error } = await supabase
        .from('chat_sessions')
        .select('id, title')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching chat history:', error);
        throw error;
    }
    return data || [];
};

export const fetchChatSessionTurns = async (sessionId: string): Promise<ChatTurn[]> => {
    const { data, error } = await supabase
        .from('chat_turns')
        .select('id, user_message_content, ai_responses')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching chat session turns:', error);
        throw error;
    }
    
    // Transform the data to match the ChatTurn interface
    return data.map(turn => ({
        id: turn.id,
        userMessage: {
            id: `user-${turn.id}`,
            role: 'user',
            content: turn.user_message_content
        },
        aiResponses: turn.ai_responses || []
    }));
};


export const createNewChatSession = async (
    userId: string, 
    firstTurn: { userMessage: UserMessage, aiResponses: AiResponse[] }
): Promise<{ newSession: ChatSessionSummary, newTurn: ChatTurn }> => {
    // Create a title from the first user message
    const title = firstTurn.userMessage.content.split('\n')[0].substring(0, 50);

    // Insert the new session
    const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .insert({ user_id: userId, title })
        .select('id, title')
        .single();
    
    if (sessionError) {
        console.error('Error creating chat session:', sessionError);
        throw sessionError;
    }

    // Insert the first turn
    const { data: turnData, error: turnError } = await supabase
        .from('chat_turns')
        .insert({
            session_id: sessionData.id,
            user_message_content: firstTurn.userMessage.content,
            ai_responses: firstTurn.aiResponses,
        })
        .select('id')
        .single();
    
    if (turnError) {
        console.error('Error creating first chat turn:', turnError);
        // Potentially delete the session here for cleanup
        throw turnError;
    }

    return {
        newSession: sessionData,
        newTurn: {
            ...firstTurn,
            id: turnData.id,
        }
    };
};

export const addTurnToChatSession = async (
    sessionId: string,
    turn: { userMessage: UserMessage, aiResponses: AiResponse[] }
): Promise<ChatTurn> => {
     const { data, error } = await supabase
        .from('chat_turns')
        .insert({
            session_id: sessionId,
            user_message_content: turn.userMessage.content,
            ai_responses: turn.aiResponses,
        })
        .select('id')
        .single();

    if (error) {
        console.error('Error adding turn to session:', error);
        throw error;
    }

    return { ...turn, id: data.id };
};
