import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";
import type { ChatMessage } from "../types/ai-assistant.types";
import { TypingIndicator } from "./TypingIndicator";
import { PromptChip } from "./PromptChip";
import { MessageBubble } from "./MessageBubble";

export const ChatView = memo(function ChatView({
  messages,
  isTyping,
  input,
  quickPrompts,
  scrollRef,
  onPrompt,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  input: string;
  quickPrompts: string[];
  scrollRef: React.RefObject<HTMLDivElement>;
  onPrompt: (prompt: string) => void;
}) {
  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="flex-1 flex flex-col min-h-0"
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 py-2 overflow-x-auto flex gap-2" style={{ scrollbarWidth: "none" }}>
        {quickPrompts.map((p) => (
          <PromptChip key={p} prompt={p} onClick={() => onPrompt(p)} />
        ))}
      </div>
    </motion.div>
  );
});

