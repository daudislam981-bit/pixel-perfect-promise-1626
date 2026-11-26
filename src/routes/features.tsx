import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, FeaturesSection } from "@/components/study/marketing";
export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Your student toolkit | Student Life Assistant" },
      {
        name: "description",
        content:
          "Explore study planning, tasks, notes, focus sessions, quizzes, and student insights.",
      },
      { property: "og:title", content: "Your student toolkit | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Explore study planning, tasks, notes, focus sessions, quizzes, and student insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <MarketingLayout>
      <main>
        <FeaturesSection />
      </main>
    </MarketingLayout>
  );
}
