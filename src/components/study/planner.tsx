import { useState } from "react";
import { addDays, addMonths, startOfMonth, startOfWeek, format, isSameMonth } from "date-fns";
import { Plus, ChevronLeft, ChevronRight, Clock3, CalendarDays, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PageHeading, EmptyState } from "./common";
import { useDemo } from "./store";
import { subjects, subjectTone, type Session } from "@/lib/study/demo";
export function Planner() {
  const { sessions, saveSession, removeSession } = useDemo();
  const [month, setMonth] = useState(new Date());
  const [selected, setSelected] = useState(format(new Date(), "yyyy-MM-dd"));
  const [view, setView] = useState("Month");
  const [open, setOpen] = useState(false);
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const days = Array.from({ length: 35 }, (_, i) => addDays(start, i));
  const week = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(new Date(`${selected}T12:00:00`), { weekStartsOn: 1 }), i),
  );
  const selectedSessions = sessions
    .filter((s) => s.date === selected)
    .sort((a, b) => a.time.localeCompare(b.time));
  return (
    <>
      <PageHeading
        title="Study Planner"
        description="A little structure for your biggest ambitions."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Plan a session
          </Button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div className="flex items-center gap-3">
              <h2 className="section-title">{format(month, "MMMM yyyy")}</h2>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous month"
                title="Previous month"
                onClick={() => setMonth(addMonths(month, -1))}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next month"
                title="Next month"
                onClick={() => setMonth(addMonths(month, 1))}
              >
                <ChevronRight />
              </Button>
            </div>
            <div className="flex gap-1 rounded-lg bg-muted p-1">
              {["Month", "Week", "Day"].map((v) => (
                <Button
                  key={v}
                  variant={v === view ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => setView(v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-between px-5 pb-4">
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                setMonth(new Date());
                setSelected(format(new Date(), "yyyy-MM-dd"));
              }}
            >
              Today
            </Button>
            <span className="self-center text-xs text-muted-foreground">
              {sessions.length} planned sessions
            </span>
          </div>
          {view !== "Day" ? (
            <>
              <div className="calendar-grid border-y bg-background py-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span
                    key={d}
                    className="text-center text-[11px] font-medium text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div className="calendar-grid">
                {(view === "Month" ? days : week).map((day) => {
                  const key = format(day, "yyyy-MM-dd");
                  return (
                    <div
                      key={key}
                      className={`calendar-cell ${!isSameMonth(day, month) && view === "Month" ? "bg-background" : ""} ${key === selected ? "bg-primary-soft/40" : ""}`}
                    >
                      <Button
                        variant={key === selected ? "default" : "ghost"}
                        className={`calendar-date text-xs ${!isSameMonth(day, month) ? "text-muted-foreground" : ""}`}
                        aria-label={`Select ${format(day, "MMMM d, yyyy")}`}
                        onClick={() => setSelected(key)}
                      >
                        {format(day, "d")}
                      </Button>
                      {sessions
                        .filter((s) => s.date === key)
                        .map((s) => (
                          <Button
                            key={s.id}
                            variant="ghost"
                            className={`calendar-session h-auto w-full justify-start ${subjectTone[s.subject]}`}
                            onClick={() => {
                              setSelected(key);
                              setView("Day");
                            }}
                            title={`${s.time} ${s.title}`}
                          >
                            {s.time} {s.title}
                          </Button>
                        ))}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="border-t p-6">
              <h3 className="mb-5 font-semibold">
                {format(new Date(`${selected}T12:00:00`), "EEEE, MMMM d")}
              </h3>
              {selectedSessions.length ? (
                selectedSessions.map((s) => (
                  <div key={s.id} className="mb-4 flex items-center gap-4 rounded-lg border p-4">
                    <span className="font-semibold text-primary">{s.time}</span>
                    <div className="flex-1">
                      <p className="font-medium">{s.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {s.subject} · {s.minutes} minutes
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${s.title}`}
                      onClick={() => removeSession(s.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))
              ) : (
                <EmptyState title="A little room for something new.">
                  <Button onClick={() => setOpen(true)}>
                    <Plus />
                    Plan a session
                  </Button>
                </EmptyState>
              )}
            </div>
          )}
        </section>
        <aside className="space-y-5">
          <section className="panel p-5">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays size={18} className="text-primary" />
              <h2 className="section-title">
                {format(new Date(`${selected}T12:00:00`), "EEE, MMM d")}
              </h2>
            </div>
            {selectedSessions.length ? (
              selectedSessions.map((s) => (
                <div key={s.id} className="border-b py-4 last:border-0">
                  <span className={`badge ${subjectTone[s.subject]}`}>{s.subject}</span>
                  <p className="mt-3 text-sm font-semibold">{s.title}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock3 size={13} />
                    {s.time} · {s.minutes} min
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto size-7"
                      title="Remove session"
                      aria-label={`Delete session ${s.title}`}
                      onClick={() => removeSession(s.id)}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </p>
                </div>
              ))
            ) : (
              <p className="py-5 text-xs leading-6 text-muted-foreground">
                No sessions planned for this day.
              </p>
            )}
            <Button variant="outline" className="mt-4 w-full" onClick={() => setOpen(true)}>
              <Plus />
              Add session
            </Button>
          </section>
          <div className="rounded-xl bg-sky-soft p-5">
            <p className="text-sm font-semibold text-sky">Make time for a break.</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              A little breathing room between sessions helps you come back refreshed.
            </p>
          </div>
        </aside>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Plan a study session</DialogTitle>
          <DialogDescription>Give your next goal a place on the calendar.</DialogDescription>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              const session: Session = {
                id: crypto.randomUUID(),
                title: String(d.get("title")).trim(),
                subject: String(d.get("subject")) as Session["subject"],
                date: String(d.get("date")),
                time: String(d.get("time")),
                minutes: Number(d.get("minutes")),
              };
              saveSession(session);
              setSelected(session.date);
              setMonth(new Date(`${session.date}T12:00:00`));
              setOpen(false);
            }}
          >
            <label className="field-label">
              Session name
              <input className="field" name="title" required placeholder="e.g. Calculus revision" />
            </label>
            <label className="field-label">
              Subject
              <select className="field" name="subject">
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="field-label">
                Date
                <input className="field" type="date" name="date" required defaultValue={selected} />
              </label>
              <label className="field-label">
                Start time
                <input className="field" type="time" name="time" required defaultValue="09:00" />
              </label>
            </div>
            <label className="field-label">
              Duration (minutes)
              <input
                className="field"
                name="minutes"
                type="number"
                required
                min="5"
                max="480"
                defaultValue="60"
              />
            </label>
            <Button className="w-full" type="submit">
              <CalendarDays />
              Save session
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
