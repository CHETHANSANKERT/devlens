import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { DashboardView } from "../components/DashboardView";
import { ChatView } from "../components/ChatView";
import { useAIChat } from "../hooks/useAIChat";
import type { ViewMode } from "../types/ai-assistant.types";
import { AI_ASSISTANT_BRAND } from "../constants/ai-assistant.constants";

export function AIAssistantPage() {
  const { messages, input, isTyping, view, quickPrompts, chatQuickPrompts, setView, setInput, sendMessage } =
    useAIChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  // Preserve behavior: after switching to chat / sending messages, scroll.
  const onPrompt = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
      scrollToBottom();
    },
    [sendMessage, scrollToBottom]
  );

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-4 pt-6 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.58 0.22 280 / 0.2)" }}
            >
              <Sparkles
                size={16}
                style={{
                  color: "oklch(0.72 0.19 280)",
                  filter: "drop-shadow(0 0 4px oklch(0.62 0.22 280 / 0.6))",
                }}
              />
            </div>
            <div>
              <h1 style={{ fontSize: "18px", fontWeight: 700, color: "oklch(0.94 0.01 275)", lineHeight: 1 }}>
                {AI_ASSISTANT_BRAND.name}
              </h1>
              <div style={{ fontSize: "10px", color: "oklch(0.72 0.19 280)" }}>{AI_ASSISTANT_BRAND.poweredBy}</div>
            </div>
          </div>

          <div
            className="flex rounded-xl p-0.5 gap-0.5"
            style={{ background: "oklch(0.17 0.010 275)", border: "1px solid oklch(0.26 0.012 275 / 0.5)" }}
          >
            {(["dashboard", "chat"] as const as ViewMode[]).map((v) => (
              <motion.button
                key={v}
                onClick={() => setView(v)}
                className="rounded-lg px-3 py-1.5 capitalize"
                style={{
                  background: view === v ? "oklch(0.58 0.22 280)" : "transparent",
                  fontSize: "11px",
                  fontWeight: view === v ? 600 : 400,
                  color: view === v ? "white" : "oklch(0.55 0.015 275)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {v}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "dashboard" ? (
          <DashboardView onPrompt={onPrompt} />
        ) : (
          <ChatView
            messages={messages}
            isTyping={isTyping}
            input={input}
            quickPrompts={chatQuickPrompts}
            scrollRef={scrollRef}
            onPrompt={onPrompt}
          />
        )}
      </AnimatePresence>

      <div
        className="px-4 py-3 shrink-0"
        style={{
          background: "oklch(0.08 0.015 275)",
          borderTop: "1px solid oklch(0.26 0.012 275 / 0.4)",
          paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div
          className="flex items-center gap-2 rounded-2xl px-4 py-2"
          style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onPrompt(input);
              }
            }}
            placeholder="Ask AI anything about your project…"
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: "13px", color: "oklch(0.85 0.01 275)" }}
          />
          <motion.button
            onClick={() => onPrompt(input)}
            whileTap={{ scale: 0.88 }}
            animate={{ opacity: input.trim() ? 1 : 0.4 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.58 0.22 280)" }}
          >
            <Send size={14} className="text-white" style={{ marginLeft: 1 }} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

