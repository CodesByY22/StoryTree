import { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
    title: "Search | StoryTree",
    description: "Discover stories, authors, and genres on StoryTree.",
};

export default function SearchPage() {
    return <SearchClient />;
}
