import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  BookOpen,
  Plus,
  FileText,
  CalendarDays,
  Timer,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { subjects, subjectTone, taskDue, type Task } from "@/lib/study/demo";
import { useDemo } from "./store";
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <span className="brand-mark">
        <BookOpen strokeWidth={2} />
      </span>
      {!compact && (
        <span>
          Student Life
          <span className="block text-xs font-medium text-muted-foreground">Assistant</span>
        </span>
      )}
    </span>
  );
}
export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
export function SectionHeading({
  title,
  to,
  label = "View all",
}: {
  title: string;
  to?: "/tasks" | "/notes" | "/planner" | "/exams" | "/analytics";
  label?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="section-title">{title}</h2>
      {to && (
        <Link to={to} className="flex items-center gap-1 text-xs font-medium text-primary">
          {label}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="py-14 text-center">
      <BookOpen className="mx-auto mb-4 text-muted-foreground" size={30} />
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
export function TaskRow({ task, extra }: { task: Task; extra?: ReactNode }) {
  const { completeTask } = useDemo();
  return (
    <div className="task-row">
      <Button
        variant="ghost"
        className={`task-check ${task.completed ? "complete" : ""}`}
        aria-label={`${task.completed ? "Reopen" : "Complete"} ${task.title}`}
        onClick={() => completeTask(task.id)}
      >
        {task.completed && <Check size={12} />}
      </Button>
      <div className="min-w-0 flex-1">
        <p
          className={`text-[13px] font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {task.title}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`badge ${subjectTone[task.subject]}`}>{task.subject}</span>
          <span className="text-[11px] text-muted-foreground">{taskDue(task.due)}</span>
        </div>
      </div>
      <span
        className={`badge ${task.priority === "High" ? "tone-amber" : "bg-muted text-muted-foreground"}`}
      >
        {task.priority}
      </span>
      {extra}
    </div>
  );
}
export function TaskEditor({
  open,
  onClose,
  task,
}: {
  open: boolean;
  onClose: () => void;
  task?: Task;
}) {
  const { saveTask } = useDemo();
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit task" : "Add a new task"}</DialogTitle>
          <DialogDescription>A little planning goes a long way.</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            saveTask({
              id: task?.id ?? crypto.randomUUID(),
              title: String(data.get("title")).trim(),
              subject: String(data.get("subject")) as Task["subject"],
              due: String(data.get("due")),
              priority: String(data.get("priority")) as Task["priority"],
              completed: task?.completed ?? false,
            });
            onClose();
          }}
        >
          <label className="field-label">
            Task name
            <input
              className="field"
              name="title"
              placeholder="e.g. Complete calculus assignment"
              required
              defaultValue={task?.title}
            />
          </label>
          <label className="field-label">
            Subject
            <select className="field" name="subject" defaultValue={task?.subject}>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="field-label">
              Due date
              <input
                className="field"
                type="date"
                name="due"
                defaultValue={task?.due ?? "2026-11-27"}
                required
              />
            </label>
            <label className="field-label">
              Priority
              <select className="field" name="priority" defaultValue={task?.priority ?? "Medium"}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {task ? "Save changes" : "Create task"}
              <Plus size={16} />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export function AddTaskButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus />
        Add task
      </Button>
      <TaskEditor open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export function QuickActions() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-11 justify-start text-xs"
          onClick={() => setOpen(true)}
        >
          <Plus className="text-primary" />
          Add task
        </Button>
        <Button variant="outline" asChild className="h-11 justify-start text-xs">
          <Link to="/planner">
            <CalendarDays className="text-sky" />
            Plan a session
          </Link>
        </Button>
        <Button variant="outline" asChild className="h-11 justify-start text-xs">
          <Link to="/notes">
            <FileText className="text-warning" />
            Create note
          </Link>
        </Button>
        <Button variant="outline" asChild className="h-11 justify-start text-xs">
          <Link to="/focus">
            <Timer className="text-success" />
            Start focusing
          </Link>
        </Button>
      </div>
      <TaskEditor open={open} onClose={() => setOpen(false)} />
    </>
  );
}
export function ActivityChart({ bars = false }: { bars?: boolean }) {
  return (
    <svg
      viewBox="0 0 560 200"
      role="img"
      aria-label="Weekly study activity: Monday 2 hours, Tuesday 3, Wednesday 2.5, Thursday 4, Friday 3.2, Saturday 5, Sunday 3.5"
      className="mt-5 w-full"
    >
      {[30, 70, 110, 150].map((y, i) => (
        <g key={y}>
          <line x1="35" x2="545" y1={y} y2={y} className="chart-grid" />
          <text x="8" y={y + 4} className="chart-text">
            {4 - i}h
          </text>
        </g>
      ))}
      {bars ? (
        [45, 120, 195, 270, 345, 420, 495].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={150 - ([55, 80, 65, 110, 85, 130, 95][i] ?? 0)}
            width="30"
            height={[55, 80, 65, 110, 85, 130, 95][i]}
            rx="4"
            fill={i === 3 ? "var(--primary)" : "var(--primary-soft)"}
          />
        ))
      ) : (
        <>
          <path
            d="M 42 118 C 65 118 88 75 120 78 S 166 108 202 95 S 242 40 285 52 S 330 87 367 73 S 406 17 450 30 S 494 64 530 55 L 530 150 L 42 150 Z"
            className="chart-area"
          />
          <path
            d="M 42 118 C 65 118 88 75 120 78 S 166 108 202 95 S 242 40 285 52 S 330 87 367 73 S 406 17 450 30 S 494 64 530 55"
            className="chart-line"
          />
          <circle cx="285" cy="52" r="5" className="chart-dot" />
        </>
      )}
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
        <text key={day} x={42 + i * 81} y="182" textAnchor="middle" className="chart-text">
          {day}
        </text>
      ))}
    </svg>
  );
}
export function TipBanner() {
  return (
    <div className="study-banner">
      <div className="flex items-start gap-3">
        <span className="icon-tile bg-card text-primary">
          <Sparkles />
        </span>
        <div>
          <h3 className="font-semibold">Small steps. Big progress.</h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            A focused 25 minutes today can make all the difference tomorrow.
          </p>
          <Button asChild size="sm" className="mt-3">
            <Link to="/focus">
              Start a focus session
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
export function DeleteDialog({
  open,
  onClose,
  onDelete,
  label,
}: {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  label: string;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent>
        <DialogTitle>Delete {label}?</DialogTitle>
        <DialogDescription>
          This will remove it from your demo library. This action cannot be undone.
        </DialogDescription>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            <X />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
