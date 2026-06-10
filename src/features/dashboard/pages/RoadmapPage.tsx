import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight, Calendar, Users } from "lucide-react";
import { roadmapItems, statusConfig } from "@/shared/constants/mockData";

const quarters = ["Q2 2026", "Q3 2026", "Q4 2026"];

function MilestoneBar({ item, index }: { item: typeof roadmapItems[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const st = statusConfig[item.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 280, damping: 24 }}
    >
      <motion.div
        className="rounded-2xl overflow-hidden"
        style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
        layout
      >
        {/* Header */}
        <motion.button
          className="w-full px-4 pt-4 pb-3 flex items-start gap-3 text-left"
          onClick={() => setExpanded(!expanded)}
          whileTap={{ scale: 0.98 }}
        >
          {/* Color accent */}
          <div
            className="w-1 rounded-full shrink-0 mt-0.5"
            style={{ background: item.color, height: "40px" }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                style={{ fontSize: "13px", fontWeight: 600, color: "oklch(0.92 0.01 275)" }}
                className="truncate"
              >
                {item.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Calendar size={11} style={{ color: "oklch(0.45 0.015 275)" }} />
                <span style={{ fontSize: "11px", color: "oklch(0.50 0.015 275)" }}>Due {item.dueDate}</span>
              </div>
              <div
                className="rounded-full px-2 py-0.5"
                style={{ background: st.bg, fontSize: "9px", color: st.color, fontWeight: 700 }}
              >
                {st.label}
              </div>
            </div>
          </div>

          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} style={{ color: "oklch(0.45 0.015 275)" }} />
          </motion.div>
        </motion.button>

        {/* Progress bar */}
        <div className="px-4 pb-3">
          <div className="flex justify-between mb-1.5">
            <span style={{ fontSize: "10px", color: "oklch(0.45 0.015 275)" }}>{item.issues} issues</span>
            <span style={{ fontSize: "10px", fontWeight: 600, color: item.color }}>{item.progress}%</span>
          </div>
          <div className="rounded-full h-1.5 overflow-hidden" style={{ background: "oklch(0.19 0.008 275)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${item.progress}%` }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="px-4 py-3"
                style={{ borderTop: "1px solid oklch(0.26 0.012 275 / 0.4)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: `${item.owner.color}22` }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 700, color: item.owner.color }}>
                      {item.owner.initials}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "oklch(0.40 0.015 275)" }}>Owner</div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "oklch(0.80 0.01 275)" }}>
                      {item.owner.name}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Done", value: Math.round((item.progress / 100) * item.issues), color: "#34D399" },
                    { label: "Active", value: Math.round((1 - item.progress / 100) * item.issues * 0.4), color: "#F59E0B" },
                    { label: "Open", value: Math.round((1 - item.progress / 100) * item.issues * 0.6), color: "#60A5FA" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-2.5 text-center"
                      style={{ background: "oklch(0.17 0.010 275)" }}
                    >
                      <div style={{ fontSize: "18px", fontWeight: 700, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: "10px", color: "oklch(0.45 0.015 275)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-3 rounded-xl py-2.5 flex items-center justify-center gap-2"
                  style={{
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}44`,
                    fontSize: "12px",
                    fontWeight: 600,
                    color: item.color,
                  }}
                >
                  View all issues <ChevronRight size={13} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function TimelineBar() {
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Dec"];
  const today = 1; // Jun is index ~1 out of 6

  return (
    <div
      className="rounded-2xl px-4 py-3 mb-4"
      style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
    >
      <div className="flex justify-between mb-2">
        {months.map((m, i) => (
          <span key={m} style={{ fontSize: "10px", color: i === today ? "oklch(0.72 0.19 280)" : "oklch(0.40 0.015 275)", fontWeight: i === today ? 700 : 400 }}>
            {m}
          </span>
        ))}
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "oklch(0.19 0.008 275)" }}>
        {roadmapItems.map((item, i) => {
          const start = i * 0.15;
          const width = 0.18 + item.progress / 100 * 0.1;
          return (
            <motion.div
              key={item.id}
              className="absolute top-0 h-full rounded-full"
              style={{ left: `${(start + i * 0.02) * 100}%`, background: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${width * 100}%` }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: "easeOut" }}
            />
          );
        })}
        {/* Today marker */}
        <div
          className="absolute top-0 h-full w-0.5"
          style={{ left: "18%", background: "oklch(0.72 0.19 280)", zIndex: 10 }}
        />
      </div>
    </div>
  );
}

export function RoadmapScreen() {
  const [activeQuarter, setActiveQuarter] = useState("Q2 2026");

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "oklch(0.94 0.01 275)" }}>Roadmap</h1>
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5"
            style={{ background: "oklch(0.17 0.010 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)", fontSize: "12px", color: "oklch(0.60 0.015 275)" }}
          >
            <Users size={13} />
            By team
          </motion.button>
        </div>

        {/* Quarter selector */}
        <div className="flex gap-2 mb-4">
          {quarters.map((q) => {
            const active = activeQuarter === q;
            return (
              <motion.button
                key={q}
                onClick={() => setActiveQuarter(q)}
                whileTap={{ scale: 0.93 }}
                className="rounded-full px-3 py-1.5"
                style={{
                  background: active ? "oklch(0.58 0.22 280)" : "oklch(0.17 0.010 275)",
                  fontSize: "12px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "white" : "oklch(0.55 0.015 275)",
                  border: active ? "none" : "1px solid oklch(0.26 0.012 275 / 0.5)",
                }}
              >
                {q}
              </motion.button>
            );
          })}
        </div>

        {/* Timeline bar */}
        <TimelineBar />
      </div>

      {/* Milestones */}
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        <div className="flex flex-col gap-3">
          {roadmapItems.map((item, i) => (
            <MilestoneBar key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
