import { useState } from "react";
import { Search, Pencil, Trash2, SlidersHorizontal, CheckSquare, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AddTaskButton,
  DeleteDialog,
  EmptyState,
  PageHeading,
  TaskEditor,
  TaskRow,
} from "./common";
import { useDemo } from "./store";
import { subjects, type Task } from "@/lib/study/demo";
export function Tasks() {
  const { tasks, removeTask } = useDemo();
  const [filter, setFilter] = useState("All tasks");
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All subjects");
  const [sort, setSort] = useState("date");
  const [editing, setEditing] = useState<Task | undefined>();
  const [deleting, setDeleting] = useState<Task | undefined>();
  const filtered = tasks
    .filter(
      (t) =>
        (filter === "All tasks" || (filter === "Completed" ? t.completed : !t.completed)) &&
        (subject === "All subjects" || t.subject === subject) &&
        (t.title + t.subject).toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "date"
        ? a.due.localeCompare(b.due)
        : ["High", "Medium", "Low"].indexOf(a.priority) -
          ["High", "Medium", "Low"].indexOf(b.priority),
    );
  return (
    <>
      <PageHeading
        title="Task Manager"
        description="Clear your mind. Make a plan. Check things off."
        action={<AddTaskButton />}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { name: "All tasks", value: tasks.length, tone: "tone-indigo" },
          {
            name: "In progress",
            value: tasks.filter((t) => !t.completed).length,
            tone: "tone-amber",
          },
          { name: "Completed", value: tasks.filter((t) => t.completed).length, tone: "tone-green" },
        ].map((s) => (
          <div key={s.name} className="panel flex items-center gap-4 p-5">
            <span className={`icon-tile ${s.tone}`}>
              <ListChecks />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{s.name}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="panel p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1 rounded-lg bg-muted p-1">
            {["All tasks", "In progress", "Completed"].map((f) => (
              <Button
                key={f}
                variant={f === filter ? "outline" : "ghost"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
          <label className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
            <input
              className="field pl-9"
              aria-label="Search tasks"
              placeholder="Search tasks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2 flex flex-wrap gap-3">
          <select
            className="field w-auto text-xs"
            aria-label="Filter by subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>All subjects</option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="field w-auto text-xs"
            aria-label="Sort tasks"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date">Sort by due date</option>
            <option value="priority">Sort by priority</option>
          </select>
          <span className="ml-auto self-center text-xs text-muted-foreground">
            {filtered.length} tasks
          </span>
        </div>
        {filtered.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            extra={
              <div className="flex flex-col sm:flex-row">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Edit ${task.title}`}
                  title="Edit task"
                  onClick={() => setEditing(task)}
                >
                  <Pencil size={15} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                  onClick={() => setDeleting(task)}
                >
                  <Trash2 size={15} className="text-muted-foreground" />
                </Button>
              </div>
            }
          />
        ))}
        {!filtered.length && (
          <EmptyState title="No tasks here — a fresh start.">
            <Button
              variant="outline"
              onClick={() => {
                setFilter("All tasks");
                setSubject("All subjects");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </EmptyState>
        )}
      </section>
      {editing && <TaskEditor open onClose={() => setEditing(undefined)} task={editing} />}
      <DeleteDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(undefined)}
        label="task"
        onDelete={() => {
          if (deleting) removeTask(deleting.id);
        }}
      />
    </>
  );
}
