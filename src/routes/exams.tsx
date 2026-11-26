import { createFileRoute } from "@tanstack/react-router";
import { Exams } from "@/components/study/exams";
export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Exams & Quiz | Student Life Assistant" },
      {
        name: "description",
        content: "Prepare for upcoming exams and check your knowledge with practice quizzes.",
      },
      { property: "og:title", content: "Exams & Quiz | Student Life Assistant" },
      {
        property: "og:description",
        content: "Prepare for upcoming exams and check your knowledge with practice quizzes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Exams,
});
