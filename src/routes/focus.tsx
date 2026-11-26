import { createFileRoute } from "@tanstack/react-router";
import { Focus } from "@/components/study/focus";
export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "Focus Room | Student Life Assistant" },
      {
        name: "description",
        content: "Find your focus with a Pomodoro timer, study sessions, and well-earned breaks.",
      },
      { property: "og:title", content: "Focus Room | Student Life Assistant" },
      {
        property: "og:description",
        content: "Find your focus with a Pomodoro timer, study sessions, and well-earned breaks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Focus,
});
