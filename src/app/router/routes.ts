export type AppRouteId = "home" | "issues" | "roadmap" | "ai" | "profile";

export interface AppRoute {
  id: AppRouteId;
  path: string;
  label: string;
}

export const appRoutes: AppRoute[] = [
  { id: "home", path: "/", label: "Home" },
  { id: "issues", path: "/issues", label: "Issues" },
  { id: "roadmap", path: "/roadmap", label: "Roadmap" },
  { id: "ai", path: "/ai", label: "AI" },
  { id: "profile", path: "/profile", label: "Profile" },
];

export const pathByRouteId: Record<AppRouteId, string> = {
  home: "/",
  issues: "/issues",
  roadmap: "/roadmap",
  ai: "/ai",
  profile: "/profile",
};

export function getRouteIdFromPath(pathname: string): AppRouteId {
  if (pathname === "/issues") return "issues";
  if (pathname === "/roadmap") return "roadmap";
  if (pathname === "/ai") return "ai";
  if (pathname === "/profile") return "profile";
  return "home";
}
