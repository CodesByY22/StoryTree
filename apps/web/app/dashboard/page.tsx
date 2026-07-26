import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
    title: "Dashboard | StoryTree",
    description: "Manage your stories, view your library, and discover new authors on StoryTree.",
};

export default function DashboardPage() {
    return <DashboardClient />;
}
