import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/study/dashboard";
export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Student Life Assistant" },
      {
        name: "description",
        content:
          "Your personal student dashboard: study progress, tasks, exams, notes, and quick actions.",
      },
      { property: "og:title", content: "Dashboard | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Your personal student dashboard: study progress, tasks, exams, notes, and quick actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
