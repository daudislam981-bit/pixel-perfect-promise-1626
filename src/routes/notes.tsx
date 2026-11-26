import { createFileRoute } from "@tanstack/react-router";
import { Notes } from "@/components/study/notes";
export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes Library | Student Life Assistant" },
      {
        name: "description",
        content: "Organize, search, and create your study notes by subject and tag.",
      },
      { property: "og:title", content: "Notes Library | Student Life Assistant" },
      {
        property: "og:description",
        content: "Organize, search, and create your study notes by subject and tag.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notes,
});
