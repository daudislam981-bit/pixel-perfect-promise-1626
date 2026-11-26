import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, PricingSection } from "@/components/study/marketing";
export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Simple student pricing | Student Life Assistant" },
      {
        name: "description",
        content: "Start with the free Student Life Assistant demo. No credit card or commitment.",
      },
      { property: "og:title", content: "Simple student pricing | Student Life Assistant" },
      {
        property: "og:description",
        content: "Start with the free Student Life Assistant demo. No credit card or commitment.",
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
        <PricingSection />
      </main>
    </MarketingLayout>
  );
}
