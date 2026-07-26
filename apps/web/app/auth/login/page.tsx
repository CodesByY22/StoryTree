import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
    title: "Log in | StoryTree",
    description: "Log in to your StoryTree account to continue reading and writing.",
};

export default function LoginPage() {
    return <LoginClient />;
}
