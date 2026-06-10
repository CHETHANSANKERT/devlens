import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomNav } from "@/shared/components/BottomNav";
import { CreateIssueSheet } from "@/shared/components/CreateIssueSheet";
import { getRouteIdFromPath, pathByRouteId } from "@/app/router/routes";

const pageVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = { duration: 0.35, ease: "easeOut" as const };

function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return (
    <div className="flex items-center justify-between px-6 py-2 shrink-0" style={{ height: 44 }}>
      <span style={{ fontSize: "13px", fontWeight: 700, color: "oklch(0.94 0.01 275)" }}>
        {time}
      </span>
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-0.5">
          {[3, 5, 7, 9].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-sm"
              style={{ height: h, background: i < 3 ? "oklch(0.94 0.01 275)" : "oklch(0.30 0.01 275)" }}
            />
          ))}
        </div>
        <div style={{ fontSize: "11px", color: "oklch(0.94 0.01 275)" }}>WiFi</div>
        <div
          className="rounded-sm flex items-center relative"
          style={{ width: 22, height: 11, border: "1px solid oklch(0.50 0.01 275)", padding: 1.5 }}
        >
          <div className="h-full rounded-sm" style={{ width: "80%", background: "#34D399" }} />
          <div
            className="absolute rounded-r-sm"
            style={{ width: 3, height: 5, background: "oklch(0.50 0.01 275)", right: -4, top: "50%", transform: "translateY(-50%)" }}
          />
        </div>
      </div>
    </div>
  );
}

function FAB({ onPress, isOpen }: { onPress: () => void; isOpen: boolean }) {
  return (
    <motion.div className="absolute right-5 z-40" style={{ bottom: 88 }}>
      {!isOpen && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ background: "oklch(0.58 0.22 280 / 0.35)" }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.button
        onClick={onPress}
        whileTap={{ scale: 0.88 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: isOpen ? "oklch(0.55 0.22 25)" : "oklch(0.58 0.22 280)",
          boxShadow: isOpen
            ? "0 4px 20px oklch(0.55 0.22 25 / 0.4)"
            : "0 4px 20px oklch(0.58 0.22 280 / 0.5)",
        }}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <Plus size={24} className="text-white" strokeWidth={2.5} />
        )}
      </motion.button>
    </motion.div>
  );
}

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);

  const activeTab = useMemo(() => getRouteIdFromPath(location.pathname), [location.pathname]);

  const handleTabChange = (tab: string) => {
    navigate(pathByRouteId[tab as keyof typeof pathByRouteId]);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.05 0.01 275)" }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.58 0.22 280 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative overflow-hidden"
        style={{
          width: "min(100vw, 390px)",
          height: "min(100svh, 844px)",
          borderRadius: "clamp(0px, 3vw, 48px)",
          border: "clamp(0px, 0.3vw, 2px) solid oklch(0.22 0.012 275 / 0.8)",
          background: "oklch(0.08 0.015 275)",
          boxShadow:
            "0 32px 80px oklch(0 0 0 / 0.7), 0 0 0 1px oklch(0.30 0.012 275 / 0.3)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        <StatusBar />

        <div className="absolute inset-0" style={{ top: 44 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="absolute inset-0"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>

        {activeTab !== "profile" && (
          <FAB onPress={() => setShowCreate(!showCreate)} isOpen={showCreate} />
        )}

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

        <AnimatePresence>
          {showCreate && <CreateIssueSheet onClose={() => setShowCreate(false)} />}
        </AnimatePresence>
      </div>

      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 rounded-full px-4 py-2"
        style={{
          background: "oklch(0.13 0.012 275 / 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid oklch(0.26 0.012 275 / 0.5)",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "oklch(0.50 0.015 275)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ← swipe cards to update status · tap to view details →
        </span>
      </div>
    </div>
  );
}
