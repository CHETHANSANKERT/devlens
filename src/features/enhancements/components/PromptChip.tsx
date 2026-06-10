import { motion } from "motion/react";
import { memo } from "react";

export const PromptChip = memo(function PromptChip({
  prompt,
  onClick,
}: {
  prompt: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="rounded-full px-3 py-1.5 shrink-0"
      style={{
        background: "oklch(0.17 0.010 275)",
        border: "1px solid oklch(0.26 0.012 275 / 0.5)",
        fontSize: "11px",
        color: "oklch(0.60 0.015 275)",
      }}
    >
      {prompt}
    </motion.button>
  );
});

