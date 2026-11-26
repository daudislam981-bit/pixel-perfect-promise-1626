import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/components/study/analytics";
export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Learning Analytics | Student Life Assistant" },
      {
        name: "description",
        content: "Track study hours, task completion, and your learning progress.",
      },
      { property: "og:title", content: "Learning Analytics | Student Life Assistant" },
      {
        property: "og:description",
        content: "Track study hours, task completion, and your learning progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Analytics,
});
