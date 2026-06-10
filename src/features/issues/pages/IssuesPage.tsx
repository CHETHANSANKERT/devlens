import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { SlidersHorizontal, MessageSquare, ChevronRight, ArrowRight, ArrowLeft, MoreHorizontal } from "lucide-react";
import { issues as allIssues, statusConfig, priorityConfig, nextStatus, prevStatus, type Issue, type Status } from "@/shared/constants/mockData";

const filters = ["All", "Mine", "Urgent", "In Progress", "Review"];

function SwipeableIssueCard({
  issue,
  onAdvance,
  onRevert,
  onPress,
}: {
  issue: Issue;
  onAdvance: (id: string) => void;
  onRevert: (id: string) => void;
  onPress: (issue: Issue) => void;
}) {
  const x = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rotate = useTransform(x, [-180, 180], [-4, 4]);
  const advanceBg = useTransform(x, [0, 80], ["oklch(0.52 0.18 160 / 0)", "oklch(0.52 0.18 160 / 1)"]);
  const revertBg = useTransform(x, [-80, 0], ["oklch(0.58 0.22 280 / 1)", "oklch(0.58 0.22 280 / 0)"]);
  const advanceOpacity = useTransform(x, [20, 80], [0, 1]);
  const revertOpacity = useTransform(x, [-80, -20], [1, 0]);
  const cardOpacity = useTransform(x, [-200, -120, 0, 120, 200], [0, 1, 1, 1, 0]);

  const st = statusConfig[issue.status];
  const pr = priorityConfig[issue.priority];

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 80) {
      animate(x, 320, { type: "spring", stiffness: 300, damping: 25 });
      setTimeout(() => onAdvance(issue.id), 250);
    } else if (info.offset.x < -80) {
      animate(x, -320, { type: "spring", stiffness: 300, damping: 25 });
      setTimeout(() => onRevert(issue.id), 250);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ height: "auto" }}>
      {/* Advance background (swipe right) */}
      <motion.div
        className="absolute inset-0 flex items-center pl-5 rounded-2xl"
        style={{ background: advanceBg }}
      >
        <motion.div style={{ opacity: advanceOpacity }} className="flex items-center gap-2">
          <ArrowRight size={18} className="text-white" />
          <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>
            Move to {statusConfig[nextStatus(issue.status)]?.label}
          </span>
        </motion.div>
      </motion.div>

      {/* Revert background (swipe left) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pr-5 rounded-2xl"
        style={{ background: revertBg }}
      >
        <motion.div style={{ opacity: revertOpacity }} className="flex items-center gap-2">
          <span style={{ color: "white", fontSize: "12px", fontWeight: 600 }}>
            Back to {statusConfig[prevStatus(issue.status)]?.label}
          </span>
          <ArrowLeft size={18} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.985 }}
        onClick={() => onPress(issue)}
        className="relative rounded-2xl p-4 cursor-pointer"
        style={{
          x,
          rotate,
          opacity: cardOpacity,
          background: "oklch(0.13 0.012 275)",
          border: "1px solid oklch(0.26 0.012 275 / 0.6)",
          touchAction: "pan-y",
        }}
      >
        <div className="flex items-start gap-3">
          {/* Priority indicator */}
          <div className="pt-0.5 shrink-0">
            <span style={{ fontSize: "12px" }}>{pr.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                style={{
                  fontSize: "10px",
                  color: "oklch(0.72 0.19 280)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                }}
              >
                {issue.id}
              </span>
              <span
                className="rounded-full px-2 py-0.5"
                style={{ background: st.bg, fontSize: "9px", color: st.color, fontWeight: 700, letterSpacing: "0.04em" }}
              >
                {st.label}
              </span>
            </div>

            {/* Title */}
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "oklch(0.88 0.01 275)",
                lineHeight: 1.45,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {issue.title}
            </p>

            {/* Labels */}
            {issue.labels.length > 0 && (
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {issue.labels.slice(0, 3).map((l) => (
                  <span
                    key={l}
                    className="rounded-full px-2 py-0.5"
                    style={{ background: "oklch(0.19 0.008 275)", fontSize: "9px", color: "oklch(0.50 0.015 275)", fontWeight: 500 }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: `${issue.assignee.color}22` }}
                >
                  <span style={{ fontSize: "9px", fontWeight: 700, color: issue.assignee.color }}>
                    {issue.assignee.initials}
                  </span>
                </div>
                <span style={{ fontSize: "10px", color: "oklch(0.40 0.015 275)" }}>{issue.updatedAt}</span>
              </div>
              <div className="flex items-center gap-1" style={{ color: "oklch(0.40 0.015 275)" }}>
                <MessageSquare size={11} />
                <span style={{ fontSize: "10px" }}>{issue.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IssueDetailSheet({ issue, onClose }: { issue: Issue; onClose: () => void }) {
  const st = statusConfig[issue.status];
  const pr = priorityConfig[issue.priority];

  return (
    <motion.div
      className="absolute inset-0 z-40 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "oklch(0.04 0.01 275 / 0.8)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <motion.div
        className="relative rounded-t-3xl overflow-hidden"
        style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)", maxHeight: "80vh" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: "oklch(0.30 0.01 275)" }} />
        </div>

        <div className="px-5 pb-8 overflow-y-auto" style={{ maxHeight: "72vh", scrollbarWidth: "none" }}>
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{
                fontSize: "11px",
                color: "oklch(0.72 0.19 280)",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            >
              {issue.id}
            </span>
            <span className="rounded-full px-2.5 py-0.5" style={{ background: st.bg, fontSize: "10px", color: st.color, fontWeight: 700 }}>
              {st.label}
            </span>
          </div>

          <h2
            style={{ fontSize: "17px", fontWeight: 700, color: "oklch(0.94 0.01 275)", lineHeight: 1.35, marginBottom: 12 }}
          >
            {issue.title}
          </h2>

          {issue.description && (
            <p style={{ fontSize: "13px", color: "oklch(0.60 0.015 275)", lineHeight: 1.6, marginBottom: 16 }}>
              {issue.description}
            </p>
          )}

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: "Priority", value: pr.label, color: pr.color },
              { label: "Project", value: issue.project, color: "oklch(0.72 0.19 280)" },
              { label: "Assignee", value: issue.assignee.name.split(" ")[0], color: issue.assignee.color },
              { label: "Updated", value: issue.updatedAt, color: "oklch(0.50 0.015 275)" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl p-3" style={{ background: "oklch(0.17 0.010 275)" }}>
                <div style={{ fontSize: "10px", color: "oklch(0.40 0.015 275)", marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ fontSize: "11px", color: "oklch(0.50 0.015 275)", marginBottom: 8, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["Assign", "Comment", "Change Priority", "Close Issue"].map((action) => (
              <motion.button
                key={action}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl py-2.5 text-center"
                style={{ background: "oklch(0.17 0.010 275)", border: "1px solid oklch(0.26 0.012 275 / 0.4)", fontSize: "12px", fontWeight: 500, color: "oklch(0.75 0.01 275)" }}
              >
                {action}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function IssuesScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [issueList, setIssueList] = useState(allIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const filtered = issueList.filter((issue) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Mine") return issue.assignee.name === "Sarah Chen";
    if (activeFilter === "Urgent") return issue.priority === "urgent" || issue.priority === "high";
    if (activeFilter === "In Progress") return issue.status === "in-progress";
    if (activeFilter === "Review") return issue.status === "in-review";
    return true;
  });

  const handleAdvance = (id: string) => {
    setIssueList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: nextStatus(i.status) } : i))
    );
  };

  const handleRevert = (id: string) => {
    setIssueList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: prevStatus(i.status) } : i))
    );
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "oklch(0.94 0.01 275)" }}>Issues</h1>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.17 0.010 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
            >
              <SlidersHorizontal size={16} style={{ color: "oklch(0.60 0.015 275)" }} />
            </motion.button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => {
            const active = activeFilter === f;
            return (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileTap={{ scale: 0.93 }}
                className="rounded-full px-3 py-1.5 shrink-0 relative"
                style={{
                  background: active ? "oklch(0.58 0.22 280)" : "oklch(0.17 0.010 275)",
                  fontSize: "12px",
                  fontWeight: active ? 600 : 400,
                  color: active ? "white" : "oklch(0.55 0.015 275)",
                  border: active ? "none" : "1px solid oklch(0.26 0.012 275 / 0.5)",
                }}
              >
                {f}
              </motion.button>
            );
          })}
        </div>

        {/* Swipe hint */}
        <div className="flex items-center justify-between mt-3">
          <span style={{ fontSize: "10px", color: "oklch(0.35 0.01 275)" }}>
            {filtered.length} issues
          </span>
          <span style={{ fontSize: "10px", color: "oklch(0.35 0.01 275)" }}>
            ← swipe to change status →
          </span>
        </div>
      </div>

      {/* Issue list */}
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        <motion.div
          className="flex flex-col gap-3"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          <AnimatePresence>
            {filtered.map((issue) => (
              <motion.div
                key={issue.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                <SwipeableIssueCard
                  issue={issue}
                  onAdvance={handleAdvance}
                  onRevert={handleRevert}
                  onPress={setSelectedIssue}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Issue detail sheet */}
      <AnimatePresence>
        {selectedIssue && (
          <IssueDetailSheet issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
