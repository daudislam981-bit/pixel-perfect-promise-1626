import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/components/study/settings";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | Student Life Assistant" },
      {
        name: "description",
        content: "Personalize your student profile, theme, language, and notification preferences.",
      },
      { property: "og:title", content: "Settings | Student Life Assistant" },
      {
        property: "og:description",
        content: "Personalize your student profile, theme, language, and notification preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});
