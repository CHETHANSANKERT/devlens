import { motion } from "motion/react";
import { Bell, Search, TrendingUp, Zap, Clock, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { sprintStats, activityItems, statusConfig, issues } from "@/shared/constants/mockData";

const stagger: any = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ label, value, sub, color, icon: Icon }: { label: string; value: string | number; sub: string; color: string; icon: React.ElementType }) {
  return (
    <motion.div
      variants={fadeUp}
      whileTap={{ scale: 0.96 }}
      className="rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden cursor-pointer"
      style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl" style={{ background: color }} />
      <div className="flex items-center justify-between">
        <div className="rounded-lg p-1.5" style={{ background: `${color}22` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span style={{ fontSize: "10px", color: "oklch(0.50 0.015 275)", fontFamily: "'JetBrains Mono', monospace" }}>
          {sub}
        </span>
      </div>
      <div>
        <div style={{ fontSize: "26px", fontWeight: 700, color: "oklch(0.94 0.01 275)", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: "11px", color: "oklch(0.50 0.015 275)", marginTop: 4 }}>{label}</div>
      </div>
    </motion.div>
  );
}

function SprintCard() {
  const pct = sprintStats.burndown;
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl p-4 overflow-hidden relative"
      style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
    >
      <div className="absolute inset-0 opacity-5" style={{ background: "linear-gradient(135deg, oklch(0.58 0.22 280) 0%, transparent 60%)" }} />
      <div className="flex items-center justify-between mb-3">
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "oklch(0.94 0.01 275)" }}>{sprintStats.name}</div>
          <div style={{ fontSize: "11px", color: "oklch(0.50 0.015 275)" }}>{sprintStats.dates}</div>
        </div>
        <div
          className="rounded-full px-2.5 py-1"
          style={{ background: "oklch(0.58 0.22 280 / 0.15)", fontSize: "11px", color: "oklch(0.72 0.19 280)", fontWeight: 600 }}
        >
          Active
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: "Done", value: sprintStats.completed, color: "#34D399" },
          { label: "Active", value: sprintStats.inProgress, color: "#F59E0B" },
          { label: "Remaining", value: sprintStats.remaining, color: "#60A5FA" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div style={{ fontSize: "20px", fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "10px", color: "oklch(0.50 0.015 275)" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-1.5" style={{ fontSize: "11px" }}>
          <span style={{ color: "oklch(0.50 0.015 275)" }}>Sprint progress</span>
          <span style={{ color: "oklch(0.72 0.19 280)", fontWeight: 600 }}>{pct}%</span>
        </div>
        <div className="rounded-full overflow-hidden h-1.5" style={{ background: "oklch(0.19 0.008 275)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, oklch(0.58 0.22 280), oklch(0.72 0.19 280))" }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function ActivityFeed() {
  return (
    <motion.div variants={fadeUp}>
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: "13px", fontWeight: 600, color: "oklch(0.94 0.01 275)" }}>Recent Activity</span>
        <button style={{ fontSize: "11px", color: "oklch(0.72 0.19 280)" }} className="flex items-center gap-0.5">
          All <ChevronRight size={12} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {activityItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 280, damping: 24 }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5"
            style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.4)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${item.user.color}22` }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, color: item.user.color }}>{item.user.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: "12px", color: "oklch(0.85 0.01 275)" }}>
                <span style={{ fontWeight: 600 }}>{item.user.name.split(" ")[0]}</span>{" "}
                <span style={{ color: "oklch(0.50 0.015 275)" }}>{item.action}</span>{" "}
                <span
                  style={{
                    color: "oklch(0.72 0.19 280)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                  }}
                >
                  {item.issue}
                </span>
              </div>
            </div>
            <span style={{ fontSize: "10px", color: "oklch(0.40 0.015 275)", flexShrink: 0 }}>{item.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MyIssues() {
  const mine = issues.filter((i) => i.assignee.name === "Sarah Chen").slice(0, 3);
  return (
    <motion.div variants={fadeUp}>
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: "13px", fontWeight: 600, color: "oklch(0.94 0.01 275)" }}>My Issues</span>
        <button style={{ fontSize: "11px", color: "oklch(0.72 0.19 280)" }} className="flex items-center gap-0.5">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {mine.map((issue) => {
          const st = statusConfig[issue.status];
          return (
            <motion.div
              key={issue.id}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl px-3 py-3 flex items-center gap-3 cursor-pointer"
              style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.4)" }}
            >
              <span style={{ fontSize: "14px" }}>{st.icon}</span>
              <div className="flex-1 min-w-0">
                <div
                  style={{ fontSize: "12px", color: "oklch(0.88 0.01 275)", fontWeight: 500 }}
                  className="truncate"
                >
                  {issue.title}
                </div>
                <div
                  style={{ fontSize: "10px", color: "oklch(0.72 0.19 280)", fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}
                >
                  {issue.id}
                </div>
              </div>
              <div
                className="rounded-full px-2 py-0.5 shrink-0"
                style={{ background: st.bg, fontSize: "10px", color: st.color, fontWeight: 600 }}
              >
                {st.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function HomeScreen() {
  const notifCount = 3;

  return (
    <div className="absolute inset-0 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="px-4 pt-6 flex flex-col gap-5"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: "11px", color: "oklch(0.50 0.015 275)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Tracker Pro
            </div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "oklch(0.94 0.01 275)", lineHeight: 1.2, marginTop: 2 }}>
              Good morning, Sarah 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: "oklch(0.17 0.010 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
            >
              <Search size={16} style={{ color: "oklch(0.60 0.015 275)" }} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: "oklch(0.17 0.010 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
            >
              <Bell size={16} style={{ color: "oklch(0.60 0.015 275)" }} />
              {notifCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "#F87171", fontSize: "9px", fontWeight: 700, color: "white" }}
                >
                  {notifCount}
                </motion.div>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Completed" value={sprintStats.completed} sub="this sprint" color="#34D399" icon={CheckCircle2} />
          <StatCard label="In Progress" value={sprintStats.inProgress} sub="active now" color="#F59E0B" icon={Activity} />
          <StatCard label="Velocity" value={sprintStats.velocity} sub="pts/sprint" color="#A78BFA" icon={TrendingUp} />
          <StatCard label="Open Issues" value={sprintStats.remaining} sub="total open" color="#60A5FA" icon={Zap} />
        </div>

        {/* Sprint progress */}
        <SprintCard />

        {/* My issues */}
        <MyIssues />

        {/* Activity */}
        <ActivityFeed />

        <div className="h-2" />
      </motion.div>
    </div>
  );
}
