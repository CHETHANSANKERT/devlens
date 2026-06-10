import { Route, Routes } from "react-router-dom";
import AppLayout from "@/app/layouts/AppLayout";
import { HomeScreen } from "@/features/dashboard/pages/HomePage";
import { IssuesScreen } from "@/features/issues/pages/IssuesPage";
import { RoadmapScreen } from "@/features/dashboard/pages/RoadmapPage";
import { AIAssistantPage } from "@/features/enhancements/pages/AIAssistantPage";
import { ProfileScreen } from "@/features/auth/pages/ProfilePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="issues" element={<IssuesScreen />} />
        <Route path="roadmap" element={<RoadmapScreen />} />
        <Route path="ai" element={<AIAssistantPage />} />
        <Route path="profile" element={<ProfileScreen />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
