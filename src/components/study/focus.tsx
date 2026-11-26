import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Coffee, Timer, Target, Headphones, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, SectionHeading } from "./common";
import { useDemo } from "./store";
import { subjects } from "@/lib/study/demo";
const modes = { Focus: 25, "Short break": 5, "Long break": 15 };
export function Focus() {
  const { history, addFocus } = useDemo();
  const [mode, setMode] = useState<keyof typeof modes>("Focus");
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState("Mathematics");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(25);
  const end = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!running) return;
    end.current = Date.now() + remaining * 1000;
    const interval = setInterval(() => {
      const value = Math.max(0, Math.ceil(((end.current ?? Date.now()) - Date.now()) / 1000));
      setRemaining(value);
      if (value === 0) {
        setRunning(false);
        if (mode === "Focus") {
          addFocus(duration, subject);
          setMessage("Session complete. A little closer to your goals!");
        } else setMessage("Break complete. Ready for a fresh start?");
      }
    }, 250);
    return () => clearInterval(interval);
  }, [running]);
  function reset() {
    setRunning(false);
    setRemaining((mode === "Focus" ? duration : modes[mode]) * 60);
    setMessage("");
  }
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  return (
    <>
      <PageHeading title="Focus Room" description="One thing at a time. This moment is yours." />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,1fr)]">
        <section className="panel p-6 text-center sm:p-8">
          <div className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-lg bg-muted p-1">
            {(Object.keys(modes) as (keyof typeof modes)[]).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={mode === m ? "outline" : "ghost"}
                onClick={() => {
                  setMode(m);
                  setRunning(false);
                  setRemaining((m === "Focus" ? duration : modes[m]) * 60);
                  setMessage("");
                }}
              >
                {m}
              </Button>
            ))}
          </div>
          <div className="focus-circle">
            <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">
              {mode === "Focus" ? "Time to focus" : "Take a breath"}
            </p>
            <span
              className="text-6xl font-semibold tabular-nums"
              role="timer"
              aria-label="Time remaining"
            >
              {minutes}:{seconds}
            </span>
            <span className="mt-4 text-xs text-muted-foreground">
              {mode === "Focus" ? subject : "You’ve earned a little rest."}
            </span>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              className="h-11 min-w-36"
              onClick={() => {
                if (!remaining) {
                  setRemaining((mode === "Focus" ? duration : modes[mode]) * 60);
                }
                setRunning(!running);
                setMessage("");
              }}
            >
              {running ? <Pause /> : <Play />}
              {running
                ? "Pause"
                : remaining === (mode === "Focus" ? duration : modes[mode]) * 60
                  ? "Start focus"
                  : "Resume"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-11"
              onClick={reset}
              title="Reset timer"
              aria-label="Reset timer"
            >
              <RotateCcw />
            </Button>
          </div>
          {message && (
            <p role="status" className="mt-5 rounded-lg bg-success-soft p-3 text-sm text-success">
              {message}
            </p>
          )}
          <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-3 text-left">
            <label className="field-label">
              Study subject
              <select
                className="field"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={running}
              >
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Focus length
              <select
                className="field"
                value={duration}
                disabled={running || mode !== "Focus"}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setDuration(v);
                  setRemaining(v * 60);
                }}
              >
                {[15, 25, 45, 60].map((n) => (
                  <option key={n} value={n}>
                    {n} minutes
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            “You don't have to be great to start, but you have to start to be great.”
          </p>
        </section>
        <aside className="space-y-6">
          <section className="panel p-5">
            <SectionHeading title="Your focus, in numbers" />
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary-soft p-4">
                <Timer size={20} className="text-primary" />
                <p className="mt-3 text-2xl font-bold">
                  {history.reduce((n, s) => n + s.minutes, 0)}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">min</span>
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">Total focus time</p>
              </div>
              <div className="rounded-lg bg-success-soft p-4">
                <Target size={20} className="text-success" />
                <p className="mt-3 text-2xl font-bold">{history.length}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">Sessions completed</p>
              </div>
            </div>
          </section>
          <section className="panel p-5">
            <SectionHeading title="Recent sessions" />
            {history.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center gap-3 border-b py-4 last:border-0">
                <span className="icon-tile tone-green">
                  <Check />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium">{s.subject}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {new Date(s.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span className="text-xs font-medium">{s.minutes} min</span>
              </div>
            ))}
          </section>
          <div className="rounded-xl bg-sky-soft p-5">
            <Coffee size={24} className="mb-3 text-sky" />
            <h3 className="text-sm font-semibold">Rest is part of the work.</h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              After a focus session, stretch, drink some water, and give your mind a moment to
              recharge.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
