export type ChatRole = "user" | "ai";

export interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
  time: string;
}

export type ViewMode = "dashboard" | "chat";

export interface Insight {
  title: string;
  desc: string;
  color: string;
  bg: string;
  /**
   * Icon is intentionally typed loosely to avoid coupling this feature layer
   * to any specific icon library.
   */
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

export interface GenerateChatReplyRequest {
  prompt: string;
}

export interface GenerateChatReplyResponse {
  reply: string;
}

export interface IAiAssistantService {
  generateChatReply(
    req: GenerateChatReplyRequest
  ): Promise<GenerateChatReplyResponse>;
}

