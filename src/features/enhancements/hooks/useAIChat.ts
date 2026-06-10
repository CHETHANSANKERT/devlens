import { useCallback, useMemo, useRef, useState } from "react";
import type { ChatMessage, ViewMode } from "../types/ai-assistant.types";
import { AI_ASSISTANT_PROMPTS } from "../constants/ai-assistant.constants";
import { getAiAssistantService } from "../services/ai.service";
import { INITIAL_MESSAGES } from "../constants/ai-assistant.constants";

export interface UseAIChatViewModel {
  view: ViewMode;
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;

  quickPrompts: string[];
  chatQuickPrompts: string[];

  setView: (v: ViewMode) => void;
  setInput: (v: string) => void;
  sendMessage: (text: string) => void;
}

export function useAIChat(): UseAIChatViewModel {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [view, setView] = useState<ViewMode>("dashboard");

  const idRef = useRef(10);

  const quickPrompts = useMemo(
    () => [...AI_ASSISTANT_PROMPTS.quickPrompts],
    []
  );

  const chatQuickPrompts = useMemo(() => quickPrompts.slice(0, 4), [quickPrompts]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: ChatMessage = {
        id: idRef.current++,
        role: "user",
        text,
        time: "now",
      };

      setMessages((p) => [...p, userMsg]);
      setInput("");
      setIsTyping(true);
      setView("chat");

      const service = getAiAssistantService();
      void service.generateChatReply({ prompt: text }).then(({ reply }) => {
        setIsTyping(false);
        const aiMsg: ChatMessage = {
          id: idRef.current++,
          role: "ai",
          text: reply,
          time: "now",
        };
        setMessages((p) => [...p, aiMsg]);
      });
    },
    [isTyping]
  );

  return {
    view,
    messages,
    input,
    isTyping,

    quickPrompts,
    chatQuickPrompts,

    setView,
    setInput,
    sendMessage,
  };
}

