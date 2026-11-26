import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/study/auth";
export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Password recovery | Student Life Assistant" },
      {
        name: "description",
        content:
          "Password recovery with Student Life Assistant. Explore your student workspace with a frontend-only account demonstration.",
      },
      { property: "og:title", content: "Password recovery | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Password recovery with Student Life Assistant. Explore your student workspace with a frontend-only account demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <AuthPage mode="forgot" />;
}
