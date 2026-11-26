import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/study/auth";
export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start your next chapter | Student Life Assistant" },
      {
        name: "description",
        content:
          "Start your next chapter with Student Life Assistant. Explore your student workspace with a frontend-only account demonstration.",
      },
      { property: "og:title", content: "Start your next chapter | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Start your next chapter with Student Life Assistant. Explore your student workspace with a frontend-only account demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <AuthPage mode="signup" />;
}
