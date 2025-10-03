export interface Model {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export enum UserPlan {
  FREE = 'FREE',
  PRO = 'PRO',
}

export interface AiResponse {
  id: string;
  role: 'model';
  content: string;
  model: string;
  modelIcon?: React.ReactNode;
}

export interface UserMessage {
    id: string;
    role: 'user';
    content: string;
}

export type Message = UserMessage | AiResponse;

export interface ChatTurn {
  id: string;
  userMessage: UserMessage;
  aiResponses: AiResponse[];
}

export interface ChatSession {
  id: string;
  title: string;
  turns: ChatTurn[];
}

export interface ChatSessionSummary {
    id: string;
    title: string;
}