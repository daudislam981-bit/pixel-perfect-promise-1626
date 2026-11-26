import { Link } from "@tanstack/react-router";
import {
  Clock3,
  CheckSquare,
  Flame,
  Target,
  ArrowUpRight,
  ArrowRight,
  CalendarDays,
  FileText,
  Sun,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "./store";
import {
  ActivityChart,
  AddTaskButton,
  QuickActions,
  SectionHeading,
  TaskRow,
  TipBanner,
} from "./common";
import { dateLabel, daysUntil, exams, subjectTone } from "@/lib/study/demo";
export function Dashboard() {
  const { profile, tasks, notes, sessions } = useDemo();
  const complete = tasks.filter((t) => t.completed).length;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Sun size={15} className="text-warning" />
            {today}
          </div>
          <h1 className="page-title">
            Welcome back, {profile.name.split(" ")[0]} <span className="text-2xl">👋</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A little progress every day adds up to big results. Let's make today count.
          </p>
        </div>
        <AddTaskButton />
      </div>
      <div className="stat-grid">
        {[
          {
            label: "Study hours",
            value: "24.5",
            suffix: "hrs",
            icon: Clock3,
            tone: "tone-indigo",
            detail: "+12% from last week",
          },
          {
            label: "Tasks completed",
            value: String(complete + 17),
            suffix: `/ ${tasks.length + 19}`,
            icon: CheckSquare,
            tone: "tone-sky",
            detail: `${tasks.filter((t) => !t.completed).length} tasks remaining`,
          },
          {
            label: "Study streak",
            value: "7",
            suffix: "days",
            icon: Flame,
            tone: "tone-amber",
            detail: "Your best streak is 12 days",
          },
          {
            label: "Weekly goal",
            value: "82",
            suffix: "%",
            icon: Target,
            tone: "tone-green",
            detail: "You're right on track!",
          },
        ].map((s) => (
          <div className="panel stat-card" key={s.label}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <span className={`icon-tile ${s.tone}`}>
                <s.icon />
              </span>
            </div>
            <div className="stat-number">
              {s.value}
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">{s.suffix}</span>
            </div>
            <p className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
              {s.label === "Study hours" && <ArrowUpRight size={12} className="text-success" />}
              {s.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <div className="space-y-[22px]">
          <section className="panel p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="section-title">Weekly study activity</h2>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Building consistency, one day at a time
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/analytics">
                  <CalendarDays />
                  This week
                  <ChevronRight />
                </Link>
              </Button>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-3xl font-bold">
                24.5<span className="ml-1 text-sm font-normal text-muted-foreground">hours</span>
              </span>
              <span className="badge tone-green mb-1">
                <ArrowUpRight size={12} />
                12.3%
              </span>
              <span className="mb-1 hidden text-[11px] text-muted-foreground sm:block">
                vs. last week
              </span>
            </div>
            <ActivityChart />
            <div className="flex justify-center gap-2 text-[10px] text-muted-foreground">
              <span className="mt-1 size-1.5 rounded-full bg-primary" />
              Study hours
            </div>
          </section>
          <section className="panel p-5 sm:p-6">
            <SectionHeading title="Upcoming tasks" to="/tasks" />
            {tasks
              .filter((t) => !t.completed)
              .slice(0, 3)
              .map((task) => (
                <TaskRow task={task} key={task.id} />
              ))}
            {tasks.every((t) => t.completed) && (
              <p className="py-8 text-center text-muted-foreground">
                All done! Enjoy a well-earned break.
              </p>
            )}
          </section>
        </div>
        <div className="space-y-[22px]">
          <section className="panel p-5 sm:p-6">
            <SectionHeading title="Today's study progress" />
            <div className="flex items-center gap-5">
              <div className="relative size-32 shrink-0">
                <svg
                  className="progress-ring size-32"
                  viewBox="0 0 120 120"
                  aria-label="Daily study goal: 75 percent complete"
                >
                  <circle cx="60" cy="60" r="49" strokeWidth="8" className="ring-track" />
                  <circle
                    cx="60"
                    cy="60"
                    r="49"
                    strokeWidth="8"
                    strokeDasharray="307.8"
                    strokeDashoffset="76.95"
                    className="ring-value"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">
                    75<span className="text-sm">%</span>
                  </span>
                  <span className="mt-1 text-[10px] text-muted-foreground">Daily goal</span>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">
                  3 <span className="text-sm font-normal text-muted-foreground">/ 4 hours</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">You've studied today</p>
                <span className="badge tone-green mt-3">Keep it going! ✨</span>
              </div>
            </div>
            <div className="mt-5 border-t pt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Next session</span>
                <span className="font-medium">{sessions[1]?.time ?? "14:00"}</span>
              </div>
              <Link to="/planner" className="mt-3 flex items-center gap-3">
                <span className="icon-tile tone-sky">
                  <BookOpen />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium">{sessions[1]?.title ?? "Physics practice"}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {sessions[1]?.minutes ?? 45} min · {sessions[1]?.subject ?? "Physics"}
                  </p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
            </div>
          </section>
          <section className="panel p-5 sm:p-6">
            <SectionHeading title="Upcoming exams" to="/exams" />
            {exams.slice(0, 2).map((exam) => (
              <Link
                to="/exams"
                key={exam.id}
                className="flex items-center gap-3 border-b py-3 last:border-0"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg ${subjectTone[exam.subject]}`}
                >
                  <span className="text-[9px] uppercase">{dateLabel(exam.date).split(" ")[0]}</span>
                  <span className="text-lg font-semibold">
                    {dateLabel(exam.date).split(" ")[1]}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">{exam.title}</p>
                  <p className="mt-1.5 text-[10px] text-muted-foreground">{exam.subject}</p>
                </div>
                <span className="text-[10px] font-medium text-warning">
                  {daysUntil(exam.date)} days
                </span>
              </Link>
            ))}
          </section>
        </div>
      </div>
      <div className="dashboard-grid mt-[22px]">
        <section className="panel p-5 sm:p-6">
          <SectionHeading title="Recent notes" to="/notes" />
          <div className="grid gap-4 sm:grid-cols-3">
            {notes.slice(0, 3).map((note) => (
              <Link
                to="/notes"
                key={note.id}
                className="group rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <span className={`icon-tile mb-4 ${subjectTone[note.subject]}`}>
                  <FileText />
                </span>
                <p className="text-xs font-semibold leading-5">{note.title}</p>
                <span className={`badge mt-2 ${subjectTone[note.subject]}`}>{note.subject}</span>
                <p className="mt-4 text-[10px] text-muted-foreground">
                  Updated {dateLabel(note.updated)}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <section className="panel p-5 sm:p-6">
          <SectionHeading title="Quick actions" />
          <QuickActions />
          <p className="mt-5 flex items-center gap-1 text-[11px] text-muted-foreground">
            <Target size={13} />
            One small action, one step closer.
          </p>
        </section>
      </div>
      <div className="mt-[22px]">
        <TipBanner />
      </div>
      <footer className="mt-6 flex flex-wrap justify-between gap-2 text-[10px] text-muted-foreground">
        <span>Made for your next chapter.</span>
        <span>Student Life Assistant · Your Study. Your Goals. Your Future.</span>
      </footer>
    </>
  );
}
