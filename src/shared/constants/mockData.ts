export type Status = "backlog" | "todo" | "in-progress" | "in-review" | "done" | "cancelled";
export type Priority = "urgent" | "high" | "medium" | "low" | "none";

export interface Issue {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: { name: string; initials: string; color: string };
  project: string;
  labels: string[];
  updatedAt: string;
  comments: number;
  description?: string;
}

export const statusConfig: Record<Status, { label: string; color: string; bg: string; icon: string }> = {
  backlog: { label: "Backlog", color: "#6B7280", bg: "rgba(107,114,128,0.15)", icon: "○" },
  todo: { label: "To Do", color: "#60A5FA", bg: "rgba(96,165,250,0.15)", icon: "◎" },
  "in-progress": { label: "In Progress", color: "#F59E0B", bg: "rgba(245,158,11,0.15)", icon: "◑" },
  "in-review": { label: "In Review", color: "#A78BFA", bg: "rgba(167,139,250,0.15)", icon: "◕" },
  done: { label: "Done", color: "#34D399", bg: "rgba(52,211,153,0.15)", icon: "●" },
  cancelled: { label: "Cancelled", color: "#F87171", bg: "rgba(248,113,113,0.15)", icon: "⊗" },
};

export const priorityConfig: Record<Priority, { label: string; color: string; icon: string }> = {
  urgent: { label: "Urgent", color: "#F87171", icon: "⚡" },
  high: { label: "High", color: "#FB923C", icon: "▲" },
  medium: { label: "Medium", color: "#FBBF24", icon: "◆" },
  low: { label: "Low", color: "#60A5FA", icon: "▼" },
  none: { label: "None", color: "#6B7280", icon: "–" },
};

export const statusOrder: Status[] = ["backlog", "todo", "in-progress", "in-review", "done"];

export const nextStatus = (s: Status): Status => {
  const idx = statusOrder.indexOf(s);
  return idx < statusOrder.length - 1 ? statusOrder[idx + 1] : s;
};

export const prevStatus = (s: Status): Status => {
  const idx = statusOrder.indexOf(s);
  return idx > 0 ? statusOrder[idx - 1] : s;
};

const team = {
  sarah: { name: "Sarah Chen", initials: "SC", color: "#F87171" },
  marcus: { name: "Marcus Webb", initials: "MW", color: "#34D399" },
  priya: { name: "Priya Sharma", initials: "PS", color: "#FBBF24" },
  alex: { name: "Alex Kim", initials: "AK", color: "#60A5FA" },
  chen: { name: "Chen Liu", initials: "CL", color: "#A78BFA" },
};

export const issues: Issue[] = [
  {
    id: "TRK-001",
    title: "Auth flow breaks on iOS Safari when using biometric login",
    status: "in-progress",
    priority: "urgent",
    assignee: team.sarah,
    project: "Auth Service",
    labels: ["bug", "mobile", "ios"],
    updatedAt: "2m ago",
    comments: 8,
    description: "Biometric authentication fails silently on iOS 17.4+ Safari. Users are redirected to a blank screen instead of the dashboard. WebAuthn fallback not triggering.",
  },
  {
    id: "TRK-002",
    title: "Dashboard recharts not rendering on Firefox 120+",
    status: "todo",
    priority: "high",
    assignee: team.marcus,
    project: "Tracker Pro",
    labels: ["bug", "charts", "firefox"],
    updatedAt: "14m ago",
    comments: 3,
    description: "SVG rendering in Firefox 120+ changed how it handles foreignObject elements. Recharts tooltips and custom labels are not visible.",
  },
  {
    id: "TRK-003",
    title: "Implement real-time collaboration cursors",
    status: "in-review",
    priority: "high",
    assignee: team.priya,
    project: "Tracker Pro",
    labels: ["feature", "realtime", "collab"],
    updatedAt: "1h ago",
    comments: 12,
    description: "Add live user presence indicators with colored cursors and name badges when multiple users are viewing the same issue or document.",
  },
  {
    id: "TRK-004",
    title: "Add bulk action support to issue list view",
    status: "in-progress",
    priority: "medium",
    assignee: team.alex,
    project: "Tracker Pro",
    labels: ["feature", "ux"],
    updatedAt: "2h ago",
    comments: 5,
    description: "Implement checkbox multi-select on issue list. Bulk actions: assign, change status, change priority, add label, delete.",
  },
  {
    id: "TRK-005",
    title: "Memory leak in WebSocket connection handler",
    status: "backlog",
    priority: "high",
    assignee: team.chen,
    project: "Data Pipeline",
    labels: ["bug", "perf", "backend"],
    updatedAt: "3h ago",
    comments: 2,
    description: "WebSocket connections are not being properly cleaned up on component unmount. Observed 200MB+ memory growth over 30-minute sessions.",
  },
  {
    id: "TRK-006",
    title: "Mobile keyboard pushes content off screen in create issue modal",
    status: "todo",
    priority: "high",
    assignee: team.sarah,
    project: "Tracker Pro",
    labels: ["bug", "mobile", "ux"],
    updatedAt: "4h ago",
    comments: 6,
    description: "When opening the virtual keyboard on Android, the modal content shifts up and the submit button becomes inaccessible without scrolling.",
  },
  {
    id: "TRK-007",
    title: "Add dark mode toggle to user settings",
    status: "done",
    priority: "low",
    assignee: team.marcus,
    project: "Tracker Pro",
    labels: ["feature", "settings"],
    updatedAt: "1d ago",
    comments: 4,
  },
  {
    id: "TRK-008",
    title: "Rate limit errors not surfaced in UI — silent failures",
    status: "todo",
    priority: "medium",
    assignee: team.priya,
    project: "Auth Service",
    labels: ["bug", "api", "ux"],
    updatedAt: "1d ago",
    comments: 1,
  },
  {
    id: "TRK-009",
    title: "Implement AI-powered issue deduplication",
    status: "in-review",
    priority: "high",
    assignee: team.alex,
    project: "Tracker Pro",
    labels: ["feature", "ai", "ml"],
    updatedAt: "2d ago",
    comments: 17,
  },
  {
    id: "TRK-010",
    title: "Export to CSV missing date range filter",
    status: "backlog",
    priority: "low",
    assignee: team.chen,
    project: "Tracker Pro",
    labels: ["feature", "export"],
    updatedAt: "3d ago",
    comments: 0,
  },
];

export const sprintStats = {
  name: "Sprint 23",
  dates: "Jun 2 – Jun 16",
  completed: 7,
  inProgress: 4,
  remaining: 12,
  velocity: 34,
  burndown: 68,
};

export const activityItems = [
  { id: 1, user: team.sarah, action: "moved", issue: "TRK-001", from: "todo", to: "in-progress", time: "2m ago" },
  { id: 2, user: team.priya, action: "commented on", issue: "TRK-003", from: "", to: "", time: "18m ago" },
  { id: 3, user: team.alex, action: "created", issue: "TRK-009", from: "", to: "", time: "1h ago" },
  { id: 4, user: team.marcus, action: "closed", issue: "TRK-007", from: "in-review", to: "done", time: "1d ago" },
  { id: 5, user: team.chen, action: "assigned", issue: "TRK-005", from: "", to: "", time: "3h ago" },
];

export const roadmapItems = [
  {
    id: "m1",
    title: "Q2 Auth Hardening",
    status: "in-progress" as Status,
    progress: 72,
    dueDate: "Jun 30",
    issues: 8,
    owner: team.sarah,
    color: "#A78BFA",
  },
  {
    id: "m2",
    title: "Collaboration v2",
    status: "in-progress" as Status,
    progress: 45,
    dueDate: "Jul 15",
    issues: 12,
    owner: team.priya,
    color: "#34D399",
  },
  {
    id: "m3",
    title: "AI Features Launch",
    status: "todo" as Status,
    progress: 20,
    dueDate: "Jul 31",
    issues: 15,
    owner: team.alex,
    color: "#F59E0B",
  },
  {
    id: "m4",
    title: "Performance Sprint",
    status: "backlog" as Status,
    progress: 5,
    dueDate: "Aug 15",
    issues: 9,
    owner: team.chen,
    color: "#60A5FA",
  },
  {
    id: "m5",
    title: "Mobile Native SDK",
    status: "backlog" as Status,
    progress: 0,
    dueDate: "Sep 1",
    issues: 22,
    owner: team.marcus,
    color: "#F87171",
  },
];
