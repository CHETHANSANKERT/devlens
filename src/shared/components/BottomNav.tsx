import { motion } from "motion/react";
import { Home, ListChecks, Map, Sparkles, User } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "issues", label: "Issues", icon: ListChecks },
  { id: "roadmap", label: "Roadmap", icon: Map },
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "profile", label: "Profile", icon: User },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string, direction: number) => void;
}

const tabOrder = ["home", "issues", "roadmap", "ai", "profile"];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const handleTabChange = (tabId: string) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const nextIndex = tabOrder.indexOf(tabId);
    const direction = nextIndex > currentIndex ? 1 : -1;
    onTabChange(tabId, direction);
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(to top, oklch(0.08 0.015 275) 85%, transparent)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="flex items-end justify-around px-2 pt-2 pb-3"
        style={{ borderTop: "1px solid oklch(0.26 0.012 275 / 0.4)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 relative px-3 py-1.5 rounded-2xl"
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: "oklch(0.58 0.22 280 / 0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  style={{
                    color: isActive ? "oklch(0.72 0.19 280)" : "oklch(0.50 0.015 275)",
                    filter: isActive ? "drop-shadow(0 0 6px oklch(0.62 0.22 280 / 0.6))" : "none",
                  }}
                />
              </motion.div>

              <motion.span
                animate={{
                  color: isActive ? "oklch(0.72 0.19 280)" : "oklch(0.45 0.015 275)",
                  fontWeight: isActive ? 600 : 400,
                }}
                style={{ fontSize: "10px", letterSpacing: "0.02em" }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
