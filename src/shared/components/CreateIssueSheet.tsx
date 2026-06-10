import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, ChevronDown } from "lucide-react";

interface CreateIssueSheetProps {
  onClose: () => void;
}

const priorities = [
  { id: "urgent", label: "Urgent", icon: "⚡", color: "#F87171" },
  { id: "high", label: "High", icon: "▲", color: "#FB923C" },
  { id: "medium", label: "Medium", icon: "◆", color: "#FBBF24" },
  { id: "low", label: "Low", icon: "▼", color: "#60A5FA" },
];

const statuses = [
  { id: "backlog", label: "Backlog", icon: "○", color: "#6B7280" },
  { id: "todo", label: "To Do", icon: "◎", color: "#60A5FA" },
  { id: "in-progress", label: "In Progress", icon: "◑", color: "#F59E0B" },
];

const assignees = [
  { id: "sarah", name: "Sarah Chen", initials: "SC", color: "#F87171" },
  { id: "marcus", name: "Marcus Webb", initials: "MW", color: "#34D399" },
  { id: "priya", name: "Priya Sharma", initials: "PS", color: "#FBBF24" },
  { id: "alex", name: "Alex Kim", initials: "AK", color: "#60A5FA" },
];

const steps = ["Details", "Priority", "Assign"];

export function CreateIssueSheet({ onClose }: CreateIssueSheetProps) {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [assignee, setAssignee] = useState("sarah");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(onClose, 1200);
  };

  const canNext = step === 0 ? title.trim().length > 3 : true;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "oklch(0.04 0.01 275 / 0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Sheet */}
      <motion.div
        className="relative rounded-t-3xl overflow-hidden"
        style={{ background: "oklch(0.12 0.013 275)", border: "1px solid oklch(0.26 0.012 275 / 0.7)", maxHeight: "88vh" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <div className="w-10 h-1 rounded-full" style={{ background: "oklch(0.30 0.01 275)" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "oklch(0.94 0.01 275)" }}>New Issue</h2>
            <div className="flex gap-1 mt-1">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className="rounded-full h-1"
                  style={{
                    width: i === step ? 20 : 8,
                    background: i <= step ? "oklch(0.58 0.22 280)" : "oklch(0.26 0.012 275 / 0.6)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.19 0.008 275)" }}
          >
            <X size={15} style={{ color: "oklch(0.60 0.015 275)" }} />
          </motion.button>
        </div>

        {/* Steps */}
        <div className="px-5 pb-6 overflow-y-auto" style={{ maxHeight: "62vh", scrollbarWidth: "none" }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.52 0.18 160 / 0.2)" }}
                >
                  <span style={{ fontSize: "32px" }}>✓</span>
                </motion.div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "oklch(0.94 0.01 275)" }}>Issue Created!</div>
                <div style={{ fontSize: "12px", color: "oklch(0.50 0.015 275)", marginTop: 4 }}>TRK-011 · {title}</div>
              </motion.div>
            ) : step === 0 ? (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="flex flex-col gap-4"
              >
                {/* Title */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 500, color: "oklch(0.45 0.015 275)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Title *
                  </label>
                  <textarea
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Short, clear issue title…"
                    rows={2}
                    className="w-full mt-2 rounded-xl px-4 py-3 resize-none outline-none"
                    style={{
                      background: "oklch(0.17 0.010 275)",
                      border: "1px solid oklch(0.26 0.012 275 / 0.6)",
                      fontSize: "14px",
                      color: "oklch(0.88 0.01 275)",
                      lineHeight: 1.4,
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 500, color: "oklch(0.45 0.015 275)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Description
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Steps to reproduce, expected behavior…"
                    rows={4}
                    className="w-full mt-2 rounded-xl px-4 py-3 resize-none outline-none"
                    style={{
                      background: "oklch(0.17 0.010 275)",
                      border: "1px solid oklch(0.26 0.012 275 / 0.6)",
                      fontSize: "13px",
                      color: "oklch(0.78 0.01 275)",
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                {/* Status quick select */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 500, color: "oklch(0.45 0.015 275)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, display: "block" }}>
                    Status
                  </label>
                  <div className="flex gap-2">
                    {statuses.map((s) => (
                      <motion.button
                        key={s.id}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setStatus(s.id)}
                        className="flex-1 rounded-xl py-2.5 flex flex-col items-center gap-1"
                        style={{
                          background: status === s.id ? `${s.color}22` : "oklch(0.17 0.010 275)",
                          border: `1px solid ${status === s.id ? s.color + "66" : "oklch(0.26 0.012 275 / 0.5)"}`,
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>{s.icon}</span>
                        <span style={{ fontSize: "10px", color: status === s.id ? s.color : "oklch(0.50 0.015 275)", fontWeight: status === s.id ? 600 : 400 }}>
                          {s.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="flex flex-col gap-3"
              >
                <div style={{ fontSize: "13px", color: "oklch(0.55 0.015 275)", marginBottom: 4 }}>
                  How urgent is this issue?
                </div>
                {priorities.map((p) => (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPriority(p.id)}
                    className="flex items-center gap-4 rounded-2xl px-4 py-4"
                    style={{
                      background: priority === p.id ? `${p.color}18` : "oklch(0.17 0.010 275)",
                      border: `1px solid ${priority === p.id ? p.color + "55" : "oklch(0.26 0.012 275 / 0.5)"}`,
                    }}
                  >
                    <span style={{ fontSize: "20px", width: 28 }}>{p.icon}</span>
                    <div className="flex-1 text-left">
                      <div style={{ fontSize: "14px", fontWeight: 600, color: priority === p.id ? p.color : "oklch(0.80 0.01 275)" }}>
                        {p.label}
                      </div>
                    </div>
                    {priority === p.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: p.color }}
                      >
                        <span style={{ fontSize: "10px", color: "white" }}>✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="flex flex-col gap-3"
              >
                <div style={{ fontSize: "13px", color: "oklch(0.55 0.015 275)", marginBottom: 4 }}>
                  Who should work on this?
                </div>
                {assignees.map((a) => (
                  <motion.button
                    key={a.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setAssignee(a.id)}
                    className="flex items-center gap-4 rounded-2xl px-4 py-3.5"
                    style={{
                      background: assignee === a.id ? `${a.color}18` : "oklch(0.17 0.010 275)",
                      border: `1px solid ${assignee === a.id ? a.color + "55" : "oklch(0.26 0.012 275 / 0.5)"}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${a.color}22` }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: 700, color: a.color }}>{a.initials}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div style={{ fontSize: "14px", fontWeight: 600, color: assignee === a.id ? a.color : "oklch(0.80 0.01 275)" }}>
                        {a.name}
                      </div>
                    </div>
                    {assignee === a.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: a.color }}
                      >
                        <span style={{ fontSize: "10px", color: "white" }}>✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        {!submitted && (
          <div className="px-5 pb-8 flex gap-3" style={{ borderTop: "1px solid oklch(0.26 0.012 275 / 0.4)", paddingTop: 16 }}>
            {step > 0 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(step - 1)}
                className="flex-1 rounded-2xl py-4"
                style={{
                  background: "oklch(0.17 0.010 275)",
                  border: "1px solid oklch(0.26 0.012 275 / 0.6)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "oklch(0.65 0.01 275)",
                }}
              >
                Back
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleNext}
              disabled={!canNext}
              animate={{ opacity: canNext ? 1 : 0.4 }}
              className="flex-[2] rounded-2xl py-4 flex items-center justify-center gap-2"
              style={{
                background: "oklch(0.58 0.22 280)",
                fontSize: "14px",
                fontWeight: 700,
                color: "white",
              }}
            >
              {step < steps.length - 1 ? (
                <>
                  Next <ChevronRight size={16} />
                </>
              ) : (
                "Create Issue"
              )}
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
