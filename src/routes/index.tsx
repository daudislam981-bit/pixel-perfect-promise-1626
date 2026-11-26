import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/study/marketing";

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Life Assistant — Your Study. Your Goals. Your Future." },
      {
        name: "description",
        content:
          "Organize your studies, plan your week, and make progress on what matters with Student Life Assistant.",
      },
      { property: "og:title", content: "Student Life Assistant — Your next chapter starts here" },
      {
        property: "og:description",
        content: "A thoughtful student workspace for tasks, notes, study sessions, and goals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
