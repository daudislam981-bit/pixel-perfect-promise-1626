import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckSquare,
  FileText,
  Timer,
  BarChart3,
  GraduationCap,
  BookOpen,
  Menu,
  X,
  Sparkles,
  Globe,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "./common";
import hero from "@/assets/student-study.png.asset.json";
import { useState, type ReactNode } from "react";
const featureList = [
  {
    icon: CalendarDays,
    title: "A plan that fits your life",
    text: "Bring your classes, study sessions, and deadlines together in one calm calendar.",
    tone: "tone-indigo",
  },
  {
    icon: CheckSquare,
    title: "Less stress. More done.",
    text: "Break down big assignments, set priorities, and enjoy checking off the little wins.",
    tone: "tone-sky",
  },
  {
    icon: FileText,
    title: "Your ideas, all together",
    text: "Keep your notes organized by subject, ready whenever inspiration or exam season strikes.",
    tone: "tone-amber",
  },
  {
    icon: Timer,
    title: "Find your focus",
    text: "Make time for deep work with a simple focus timer and well-earned breaks.",
    tone: "tone-green",
  },
  {
    icon: GraduationCap,
    title: "Walk into exams ready",
    text: "Stay ahead of exam dates and test your understanding with practice quizzes.",
    tone: "tone-indigo",
  },
  {
    icon: BarChart3,
    title: "See how far you’ve come",
    text: "Celebrate your consistency with clear study insights and weekly progress.",
    tone: "tone-sky",
  },
];
export function MarketingLayout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <header className="border-b bg-card">
        <div className="marketing-container flex h-20 items-center justify-between gap-4">
          <Link to="/" aria-label="Student Life Assistant home">
            <Brand />
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium md:flex">
            <Link to="/features" className="text-muted-foreground hover:text-primary">
              Features
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-primary">
              Pricing
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-primary">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/signup">
                Get started
                <ArrowRight />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              className="md:hidden"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menu && (
          <nav className="marketing-container flex flex-col gap-4 border-t py-5 text-sm md:hidden">
            {[
              { to: "/features", label: "Features" },
              { to: "/pricing", label: "Pricing" },
              { to: "/faq", label: "FAQ" },
              { to: "/login", label: "Log in" },
              { to: "/signup", label: "Get started" },
            ].map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      {children}
      <footer className="border-t bg-card py-10">
        <div className="marketing-container">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div>
              <Brand />
              <p className="mt-4 text-xs text-muted-foreground">
                Your Study. Your Goals. Your Future.
              </p>
            </div>
            <nav className="flex flex-wrap gap-8 text-xs text-muted-foreground">
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/dashboard">Explore the demo</Link>
            </nav>
          </div>
          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t pt-6 text-[11px] text-muted-foreground">
            <span>© 2026 Student Life Assistant</span>
            <span className="flex items-center gap-1">
              Made for students, everywhere.
              <Globe size={13} />
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
export function FeaturesSection() {
  return (
    <section className="marketing-section bg-card">
      <div className="marketing-container">
        <div className="mb-10 text-center">
          <span className="badge tone-indigo mb-4">A little more organized. A lot more you.</span>
          <h2>Everything for your next chapter.</h2>
          <p className="mt-4 text-muted-foreground">
            One space for your studies, your ideas, and your biggest ambitions.
          </p>
        </div>
        <div className="marketing-grid">
          {featureList.map((f) => (
            <div className="panel p-7" key={f.title}>
              <span className={`icon-tile mb-5 ${f.tone}`}>
                <f.icon />
              </span>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PricingSection() {
  return (
    <section className="marketing-section">
      <div className="marketing-container">
        <div className="mb-10 text-center">
          <span className="badge tone-green mb-4">Room to grow</span>
          <h2>Big ambitions. A simple start.</h2>
          <p className="mt-4 text-muted-foreground">Explore everything in the free student demo.</p>
        </div>
        <div className="mx-auto max-w-lg panel p-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Student essentials</h3>
            <span className="badge tone-indigo">Free demo</span>
          </div>
          <p className="mt-6 text-5xl font-bold">
            $0
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / forever in this demo
            </span>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            A thoughtful space to get your academic life together.
          </p>
          <ul className="my-7 space-y-4">
            {[
              "Study planner & task manager",
              "Organized notes library",
              "Focus timer & study insights",
              "Exam planning & practice quizzes",
            ].map((text) => (
              <li key={text} className="flex items-center gap-3 text-sm">
                <Check size={16} className="text-success" />
                {text}
              </li>
            ))}
          </ul>
          <Button asChild className="h-11 w-full">
            <Link to="/signup">
              Start your next chapter
              <ArrowRight />
            </Link>
          </Button>
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            No credit card. No commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
export function FAQSection() {
  const [active, setActive] = useState<number | null>(0);
  const faqs = [
    [
      "What is Student Life Assistant?",
      "A focused space to plan study sessions, organize tasks and notes, prepare for exams, and track your progress.",
    ],
    [
      "Who is it for?",
      "Students around the world, from secondary school to university and beyond. Make it your own with subjects and goals that fit your studies.",
    ],
    [
      "Can I try it without an account?",
      "Absolutely. Select Explore the demo to open a fully interactive sample workspace. Registration and login are demonstrations at this stage.",
    ],
    [
      "Will my demo tasks be saved?",
      "Your demo tasks, notes, sessions, and preferences are saved on this browser. They are not synced to other devices. Passwords are never stored.",
    ],
    [
      "Is the platform free?",
      "This prototype is free to explore. Future plans and pricing have not been finalized.",
    ],
  ];
  return (
    <section className="marketing-section bg-card">
      <div className="marketing-container">
        <h2 className="text-center">A few things you might be wondering.</h2>
        <div className="mx-auto mt-10 max-w-2xl">
          {faqs.map(([q, a], i) => (
            <div className="border-b py-5" key={q}>
              <Button
                variant="ghost"
                className="h-auto w-full justify-between whitespace-normal px-0 text-left text-sm"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
              >
                {q}
                <ChevronDown
                  className={`shrink-0 transition-transform ${active === i ? "rotate-180" : ""}`}
                />
              </Button>
              {active === i && <p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Landing() {
  return (
    <MarketingLayout>
      <main>
        <section className="hero">
          <img
            className="hero-photo"
            src={hero.url}
            alt="University students studying together in a bright study space"
          />
          <div className="hero-content">
            <span className="badge tone-indigo mb-6">
              <Sparkles size={13} />
              For your next chapter
            </span>
            <h1>
              Student Life
              <br />
              <span className="text-primary">Assistant.</span>
            </h1>
            <p className="mt-6 font-medium">Your Study. Your Goals. Your Future.</p>
            <p className="mt-3 text-muted-foreground">
              Less juggling, more living. A thoughtful space to organize your studies and make
              progress on what matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 px-6">
                <Link to="/signup">
                  Get started for free
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6">
                <Link to="/dashboard">Explore the demo</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-success" />
                No credit card needed
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={14} />
                Built for students everywhere
              </span>
            </div>
          </div>
        </section>
        <div className="border-y bg-card py-7">
          <div className="marketing-container flex flex-wrap items-center justify-between gap-6">
            <p className="text-xs font-medium text-muted-foreground">
              More clarity. Less overwhelm.
            </p>
            {[
              { icon: BookOpen, label: "Study with intention" },
              { icon: Heart, label: "Make space for life" },
              { icon: GraduationCap, label: "Grow with confidence" },
            ].map((x) => (
              <span key={x.label} className="flex items-center gap-2 text-sm font-medium">
                <x.icon size={18} className="text-primary" />
                {x.label}
              </span>
            ))}
          </div>
        </div>
        <FeaturesSection />
        <section className="marketing-section">
          <div className="marketing-container">
            <div className="text-center">
              <span className="badge tone-sky mb-4">Simple by design</span>
              <h2>From “where do I start?” to “I've got this.”</h2>
            </div>
            <div className="marketing-grid mt-12">
              {[
                {
                  title: "Make it yours",
                  text: "Choose your subjects, set a goal, and create a workspace that feels like you.",
                },
                {
                  title: "Find your rhythm",
                  text: "Plan the week, collect your notes, and focus on one thing at a time.",
                },
                {
                  title: "Watch yourself grow",
                  text: "Build a study streak, see your progress, and celebrate every little win.",
                },
              ].map((s, i) => (
                <div className="text-center" key={s.title}>
                  <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-semibold">{s.title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-primary-soft py-14">
          <div className="marketing-container flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">A calmer mind. A clearer path forward.</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Your academic life, together at last.
              </p>
            </div>
            <Button asChild className="h-11">
              <Link to="/dashboard">
                See your workspace
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
        <PricingSection />
        <FAQSection />
      </main>
    </MarketingLayout>
  );
}
