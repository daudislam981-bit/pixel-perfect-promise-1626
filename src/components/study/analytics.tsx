import { useState } from "react";
import { Clock3, CheckSquare, Flame, TrendingUp, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityChart, PageHeading, SectionHeading } from "./common";
import { useDemo } from "./store";
import { subjects, subjectTone } from "@/lib/study/demo";
export function Analytics() {
  const { tasks, history } = useDemo();
  const [period, setPeriod] = useState("This week");
  const completed = tasks.filter((t) => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100) || 0;
  const multiplier = period === "This month" ? 4 : 1;
  return (
    <>
      <PageHeading
        title="Learning Analytics"
        description="See the bigger picture. Celebrate every little win."
        action={
          <div className="flex gap-2">
            <select
              className="field w-auto text-xs"
              aria-label="Analytics period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>This week</option>
              <option>This month</option>
            </select>
            <Button
              variant="outline"
              title="Download report"
              aria-label="Download report"
              size="icon"
              className="h-10 w-10"
              onClick={() => {
                const csv = `Metric,Value\nStudy hours,${24.5 * multiplier}\nTasks completed,${completed}\nCompletion rate,${percent}%\nFocus sessions,${history.length}\n`;
                const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
                const a = document.createElement("a");
                a.href = url;
                a.download = "student-study-report.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download />
            </Button>
          </div>
        }
      />
      <div className="stat-grid">
        {[
          {
            label: "Total study hours",
            value: `${24.5 * multiplier}h`,
            icon: Clock3,
            tone: "tone-indigo",
            detail: "12% more than last period",
          },
          {
            label: "Completed tasks",
            value: completed,
            icon: CheckSquare,
            tone: "tone-sky",
            detail: `${tasks.length} tasks in your workspace`,
          },
          {
            label: "Study streak",
            value: "7 days",
            icon: Flame,
            tone: "tone-amber",
            detail: "A little progress, every day",
          },
          {
            label: "Focus sessions",
            value: history.length,
            icon: TrendingUp,
            tone: "tone-green",
            detail: `${history.reduce((s, h) => s + h.minutes, 0)} minutes of focused work`,
          },
        ].map((s) => (
          <div key={s.label} className="panel stat-card">
            <div className="flex justify-between gap-2">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <span className={`icon-tile ${s.tone}`}>
                <s.icon />
              </span>
            </div>
            <p className="stat-number">{s.value}</p>
            <p className="mt-3 text-[10px] text-muted-foreground">{s.detail}</p>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="panel p-6">
          <SectionHeading
            title={
              period === "This week" ? "Weekly study hours" : "Average weekly hours this month"
            }
          />
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold">
              {24.5 * multiplier}
              <span className="ml-2 text-sm font-normal text-muted-foreground">hours</span>
            </p>
            <span className="badge tone-green">
              <ArrowUpRight size={12} />
              12%
            </span>
          </div>
          <ActivityChart bars />
        </section>
        <section className="panel p-6">
          <SectionHeading title="Task completion" />
          <div className="relative mx-auto my-5 size-40">
            <svg
              className="progress-ring size-40"
              viewBox="0 0 120 120"
              aria-label={`${percent} percent of tasks complete`}
            >
              <circle cx="60" cy="60" r="49" strokeWidth="10" className="ring-track" />
              <circle
                cx="60"
                cy="60"
                r="49"
                strokeWidth="10"
                strokeDasharray="307.8"
                strokeDashoffset={307.8 * (1 - percent / 100)}
                className="ring-value"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{percent}%</span>
              <p className="mt-1 text-xs text-muted-foreground">completed</p>
            </div>
          </div>
          <div className="flex justify-center gap-5 text-xs">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Done · {completed}
            </span>
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary-soft" />
              Remaining · {tasks.length - completed}
            </span>
          </div>
        </section>
      </div>
      <section className="panel mt-6 p-6">
        <SectionHeading title="Subject-wise progress" />
        <div className="grid gap-6 sm:grid-cols-2">
          {subjects.map((s, i) => {
            const value = [78, 65, 86, 54][i] ?? 0;
            return (
              <div key={s}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`badge ${subjectTone[s]}`}>{s}</span>
                  <span className="text-xs font-semibold">{value}%</span>
                </div>
                <svg
                  viewBox="0 0 400 8"
                  className="h-2 w-full"
                  aria-label={`${s}: ${value} percent progress`}
                >
                  <rect width="400" height="8" rx="4" fill="var(--muted)" />
                  <rect
                    width={value * 4}
                    height="8"
                    rx="4"
                    fill={
                      i === 0
                        ? "var(--primary)"
                        : i === 1
                          ? "var(--sky)"
                          : i === 2
                            ? "var(--success)"
                            : "var(--warning)"
                    }
                  />
                </svg>
                <p className="mt-2 text-[10px] text-muted-foreground">
                  {[8.5, 6, 7, 3][i]} study hours this week
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <div className="mt-6 rounded-xl bg-success-soft p-6">
        <h3 className="font-semibold">Consistency looks good on you.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You've kept showing up for 7 days. That's something worth celebrating.
        </p>
      </div>
    </>
  );
}
