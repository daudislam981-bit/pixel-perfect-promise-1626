import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/study/auth";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Welcome back | Student Life Assistant" },
      {
        name: "description",
        content:
          "Welcome back with Student Life Assistant. Explore your student workspace with a frontend-only account demonstration.",
      },
      { property: "og:title", content: "Welcome back | Student Life Assistant" },
      {
        property: "og:description",
        content:
          "Welcome back with Student Life Assistant. Explore your student workspace with a frontend-only account demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <AuthPage mode="login" />;
}
