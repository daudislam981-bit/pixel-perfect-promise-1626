import { createFileRoute } from "@tanstack/react-router";
import { Tasks } from "@/components/study/tasks";
export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Manager | Student Life Assistant" },
      {
        name: "description",
        content:
          "Manage assignments, priorities, deadlines, and completed tasks in your student workspace.",
      },
      { property: "og:title", content: "Task Manager | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Manage assignments, priorities, deadlines, and completed tasks in your student workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tasks,
});
