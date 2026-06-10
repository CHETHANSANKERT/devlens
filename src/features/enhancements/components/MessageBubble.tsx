import { motion } from "motion/react";
import { memo } from "react";
import { Sparkles } from "lucide-react";
import type { ChatMessage } from "../types/ai-assistant.types";

export const MessageBubble = memo(function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`flex items-end gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
    >
      {message.role === "ai" && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.58 0.22 280 / 0.2)" }}
        >
          <Sparkles size={13} style={{ color: "oklch(0.72 0.19 280)" }} />
        </div>
      )}
      <div
        className="max-w-[78%] rounded-2xl px-4 py-3"
        style={{
          background:
            message.role === "user" ? "oklch(0.58 0.22 280)" : "oklch(0.17 0.010 275)",
          borderRadius:
            message.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: message.role === "user" ? "white" : "oklch(0.88 0.01 275)",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}
        >
          {message.text}
        </p>
      </div>
    </motion.div>
  );
});

