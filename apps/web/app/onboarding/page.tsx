import { Metadata } from "next";
import OnboardingClient from "./OnboardingClient";

export const metadata: Metadata = {
    title: "Onboarding | StoryTree",
    description: "Set up your StoryTree profile and start discovering stories.",
};

export default function OnboardingPage() {
    return <OnboardingClient />;
}
