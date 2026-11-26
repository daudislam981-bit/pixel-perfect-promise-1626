import { createFileRoute } from "@tanstack/react-router";
import { Planner } from "@/components/study/planner";
export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Study Planner | Student Life Assistant" },
      {
        name: "description",
        content: "Organize your study sessions in monthly, weekly, and daily calendars.",
      },
      { property: "og:title", content: "Study Planner | Student Life Assistant" },
      {
        property: "og:description",
        content: "Organize your study sessions in monthly, weekly, and daily calendars.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});
