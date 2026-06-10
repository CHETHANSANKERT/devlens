import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { memo } from "react";
import { AI_ASSISTANT_INSIGHTS, AI_ASSISTANT_PROMPTS } from "../constants/ai-assistant.constants";
import { InsightCard } from "./InsightCard";

export const DashboardView = memo(function DashboardView({
  onPrompt,
}: {
  onPrompt: (prompt: string) => void;
}) {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="flex-1 overflow-y-auto px-4 pb-28"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Insights */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 500,
          color: "oklch(0.45 0.015 275)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Project Insights
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {AI_ASSISTANT_INSIGHTS.map((ins, i) => (
          <InsightCard
            key={ins.title}
            insight={ins}
            index={i}
            onClick={() => onPrompt(ins.title)}
          />
        ))}
      </div>

      {/* Quick prompts */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 500,
          color: "oklch(0.45 0.015 275)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Ask AI
      </div>
      <div className="grid grid-cols-2 gap-2">
        {AI_ASSISTANT_PROMPTS.quickPrompts.map((p, i) => (
          <motion.button
            key={p}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPrompt(p)}
            className="rounded-xl px-3 py-3 text-left"
            style={{
              background: "oklch(0.13 0.012 275)",
              border: "1px solid oklch(0.26 0.012 275 / 0.6)",
              fontSize: "12px",
              fontWeight: 500,
              color: "oklch(0.75 0.01 275)",
            }}
          >
            {p}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

