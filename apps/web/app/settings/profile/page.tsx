import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
    title: "Profile Settings | StoryTree",
    description: "Update your StoryTree profile information.",
};

export default function ProfilePage() {
    return <ProfileClient />;
}
