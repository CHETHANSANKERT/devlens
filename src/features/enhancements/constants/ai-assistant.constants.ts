import { AlertTriangle, CheckCircle2, Zap, TrendingUp } from "lucide-react";
import type { ChatMessage, Insight } from "../types/ai-assistant.types";

export const AI_ASSISTANT_BRAND = {
  name: "AI Assistant",
  poweredBy: "Powered by Claude",
} as const;

export const AI_ASSISTANT_PROMPTS = {
  quickPrompts: [
    "Summarize sprint health",
    "Find duplicate issues",
    "Release risk analysis",
    "Suggest assignments",
    "Categorize backlog",
    "Draft release notes",
  ] as const,
} as const;

export const AI_ASSISTANT_INSIGHTS: Insight[] = [
  {
    icon: AlertTriangle,
    title: "Release Risk: Medium",
    desc: "TRK-001 (iOS auth) blocks 3 downstream features",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
  },
  {
    icon: TrendingUp,
    title: "Velocity Trending Up",
    desc: "+12% vs last sprint. Team is accelerating.",
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
  },
  {
    icon: Zap,
    title: "4 Likely Duplicates",
    desc: "TRK-006, TRK-002 may overlap. Review suggested.",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
  },
  {
    icon: CheckCircle2,
    title: "On Track: Auth Service",
    desc: "All P0 issues resolved. Deployment ready.",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.12)",
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    role: "ai",
    text: "Hi Sarah! I've analyzed your project. Sprint 23 is at 68% velocity — slightly behind target. There are 2 urgent bugs that could block the Q2 release. Want me to prioritize the backlog?",
    time: "now",
  },
];

export const MOCK_PROMPT_TO_RESPONSE: Record<string, string> = {
  "Summarize sprint health":
    "Sprint 23 health: ⚡ Velocity at 68% (target: 80%). 7 issues closed, 4 active, 12 remaining. Critical blocker: TRK-001 iOS auth bug. Recommend fast-tracking this to unblock the Q2 release pipeline.",
  "Find duplicate issues":
    "Found 3 potential duplicates: TRK-006 and TRK-002 both address mobile rendering. TRK-008 and TRK-001 share root cause in Safari WebKit. Merging TRK-006 into TRK-002 would save ~4 engineering hours.",
  "Release risk analysis":
    "Q2 release risk: 🟡 MEDIUM. 2 critical bugs unresolved (TRK-001, TRK-005). Memory leak (TRK-005) could surface under production load. Auth blocker (TRK-001) affects 40% of iOS users. Recommend 3-day freeze after resolving these.",
  "Suggest assignments":
    "Optimal assignments based on expertise + load: Marcus → TRK-002 (Firefox, his specialty). Priya → TRK-008 (API, her domain). Chen → TRK-005 (WebSocket, previous experience). This balances load within 10% variance.",
  "Categorize backlog":
    "Backlog analysis: 40% bugs (prioritize), 35% features (defer 2 to Q3), 25% chores (batch in one sprint). 3 issues can be closed as won't-fix based on low engagement and duplicate coverage.",
  "Draft release notes":
    "**v2.4.0 Release Notes**\n\n✅ Dark mode toggle (TRK-007)\n🔧 Firefox chart rendering fix (in progress)\n🔒 Auth service hardening\n⚡ Performance improvements\n\n*Expected: Jun 30, 2026*",
};

