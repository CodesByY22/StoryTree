import { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
    title: "Sign up | StoryTree",
    description: "Create a StoryTree account to start your reading and writing journey.",
};

export default function SignupPage() {
    return <SignupClient />;
}
