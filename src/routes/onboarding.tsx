import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/components/study/auth";
export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Make it yours | Student Life Assistant" },
      {
        name: "description",
        content: "Set up your student profile, subjects, and goals for a personal study workspace.",
      },
      { property: "og:title", content: "Make it yours | Student Life Assistant" },
      {
        property: "og:description",
        content: "Set up your student profile, subjects, and goals for a personal study workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});
