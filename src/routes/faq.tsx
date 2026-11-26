import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, FAQSection } from "@/components/study/marketing";
export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Your questions, answered | Student Life Assistant" },
      {
        name: "description",
        content:
          "Find answers about the student workspace, free demo, account previews, and browser storage.",
      },
      { property: "og:title", content: "Your questions, answered | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Find answers about the student workspace, free demo, account previews, and browser storage.",
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
        <FAQSection />
      </main>
    </MarketingLayout>
  );
}
