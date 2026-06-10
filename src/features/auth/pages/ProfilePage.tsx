import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Bell, Moon, Wifi, ChevronRight, LogOut, Github, Zap, Award, Target } from "lucide-react";

const stats = [
  { label: "Issues Closed", value: 47, icon: "✓", color: "#34D399" },
  { label: "Comments", value: 124, icon: "💬", color: "#60A5FA" },
  { label: "Streak", value: "12d", icon: "🔥", color: "#F59E0B" },
  { label: "Velocity", value: 89, icon: "⚡", color: "#A78BFA" },
];

const settingGroups = [
  {
    title: "Account",
    items: [
      { icon: Shield, label: "Security & Privacy", desc: "2FA, sessions" },
      { icon: Bell, label: "Notifications", desc: "Push, email, Slack" },
      { icon: Github, label: "Integrations", desc: "GitHub, Figma, Slack" },
    ],
  },
  {
    title: "Appearance",
    items: [
      { icon: Moon, label: "Theme", desc: "Dark (current)" },
      { icon: Zap, label: "Density", desc: "Compact" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { icon: Target, label: "Sprint Settings", desc: "2 weeks, 40 pts" },
      { icon: Wifi, label: "Offline Mode", desc: "Enabled, 50MB cached" },
      { icon: Award, label: "Team Members", desc: "5 members, Pro plan" },
    ],
  },
];

const recentActivity = [
  { text: "Closed TRK-007 · Dark mode", time: "1d ago", color: "#34D399" },
  { text: "Reviewed TRK-003 · Collab cursors", time: "2d ago", color: "#A78BFA" },
  { text: "Created TRK-001 · iOS auth bug", time: "3d ago", color: "#F87171" },
];

export function ProfileScreen() {
  const [notifs, setNotifs] = useState(true);

  return (
    <div className="absolute inset-0 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
      {/* Hero section */}
      <div
        className="relative px-4 pt-10 pb-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, oklch(0.14 0.015 275) 0%, oklch(0.08 0.015 275) 100%)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-32 opacity-20 blur-3xl"
          style={{ background: "oklch(0.58 0.22 280)" }}
        />

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="flex flex-col items-center mb-4"
        >
          <div className="relative mb-3">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F87171, #FB923C)" }}
            >
              <span style={{ fontSize: "28px", fontWeight: 800, color: "white" }}>SC</span>
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{ background: "#34D399", borderColor: "oklch(0.08 0.015 275)" }}
            >
              <span style={{ fontSize: "9px" }}>✓</span>
            </div>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "oklch(0.94 0.01 275)" }}>Sarah Chen</h2>
          <div style={{ fontSize: "12px", color: "oklch(0.50 0.015 275)", marginTop: 2 }}>Lead Engineer · Tracker Pro</div>
          <div
            className="mt-2 rounded-full px-3 py-1"
            style={{ background: "oklch(0.58 0.22 280 / 0.15)", fontSize: "11px", color: "oklch(0.72 0.19 280)", fontWeight: 600 }}
          >
            Pro Plan
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 280, damping: 24 }}
              className="rounded-2xl p-3 text-center"
              style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
            >
              <div style={{ fontSize: "16px", marginBottom: 2 }}>{s.icon}</div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "9px", color: "oklch(0.40 0.015 275)", marginTop: 3, lineHeight: 1.2 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4 mt-4">
        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 280, damping: 24 }}
        >
          <div style={{ fontSize: "11px", fontWeight: 500, color: "oklch(0.40 0.015 275)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
            Recent Activity
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
          >
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < recentActivity.length - 1 ? "1px solid oklch(0.26 0.012 275 / 0.4)" : "none" }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                <div style={{ fontSize: "12px", color: "oklch(0.75 0.01 275)", flex: 1 }}>{a.text}</div>
                <div style={{ fontSize: "10px", color: "oklch(0.40 0.015 275)" }}>{a.time}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings groups */}
        {settingGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + gi * 0.08, type: "spring", stiffness: 280, damping: 24 }}
          >
            <div style={{ fontSize: "11px", fontWeight: 500, color: "oklch(0.40 0.015 275)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
              {group.title}
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "oklch(0.13 0.012 275)", border: "1px solid oklch(0.26 0.012 275 / 0.6)" }}
            >
              {group.items.map((item, ii) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.98, backgroundColor: "oklch(0.17 0.010 275)" }}
                    className="w-full flex items-center gap-3 px-4 py-3.5"
                    style={{
                      borderBottom: ii < group.items.length - 1 ? "1px solid oklch(0.26 0.012 275 / 0.4)" : "none",
                      textAlign: "left",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.19 0.008 275)" }}
                    >
                      <Icon size={15} style={{ color: "oklch(0.60 0.015 275)" }} />
                    </div>
                    <div className="flex-1">
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "oklch(0.85 0.01 275)" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "oklch(0.45 0.015 275)" }}>{item.desc}</div>
                    </div>
                    <ChevronRight size={15} style={{ color: "oklch(0.35 0.01 275)" }} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Sign out */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2"
          style={{ background: "oklch(0.55 0.22 25 / 0.12)", border: "1px solid oklch(0.55 0.22 25 / 0.3)", fontSize: "13px", fontWeight: 600, color: "oklch(0.65 0.18 25)" }}
        >
          <LogOut size={15} />
          Sign Out
        </motion.button>

        <div
          className="text-center pb-2"
          style={{ fontSize: "10px", color: "oklch(0.30 0.01 275)", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Tracker Pro v2.4.0 · Build 240610
        </div>
      </div>
    </div>
  );
}
