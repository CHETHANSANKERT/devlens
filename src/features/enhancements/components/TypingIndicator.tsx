import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { memo } from "react";

function TypingIndicatorInner() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "oklch(0.58 0.22 280 / 0.2)" }}
      >
        <Sparkles size={13} style={{ color: "oklch(0.72 0.19 280)" }} />
      </div>
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5"
        style={{ background: "oklch(0.17 0.010 275)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "oklch(0.55 0.015 275)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}

export const TypingIndicator = memo(TypingIndicatorInner);

