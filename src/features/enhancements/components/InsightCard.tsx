import { motion } from "motion/react";
import { memo } from "react";
import type { Insight } from "../types/ai-assistant.types";

export const InsightCard = memo(function InsightCard({
  insight,
  index,
  onClick,
}: {
  insight: Insight;
  index: number;
  onClick: () => void;
}) {
  const Icon = insight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 280, damping: 24 }}
      whileTap={{ scale: 0.97 }}
      className="rounded-2xl p-4 flex items-start gap-3 cursor-pointer"
      style={{ background: insight.bg, border: `1px solid ${insight.color}30` }}
      onClick={onClick}
    >
      <div className="rounded-xl p-2 shrink-0" style={{ background: `${insight.color}20` }}>
        <Icon size={16} style={{ color: insight.color }} />
      </div>
      <div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "oklch(0.92 0.01 275)",
            marginBottom: 3,
          }}
        >
          {insight.title}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "oklch(0.55 0.015 275)",
            lineHeight: 1.4,
          }}
        >
          {insight.desc}
        </div>
      </div>
    </motion.div>
  );
});

