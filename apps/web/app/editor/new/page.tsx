import { Metadata } from "next";
import NewStoryClient from "./NewStoryClient";

export const metadata: Metadata = {
    title: "New Story | StoryTree",
    description: "Start drafting a new story on StoryTree.",
};

export default function NewStoryPage() {
    return <NewStoryClient />;
}
