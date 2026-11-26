import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  initialTasks,
  initialNotes,
  initialSessions,
  toggleTask,
  type Task,
  type Note,
  type Session,
} from "@/lib/study/demo";
type Profile = {
  name: string;
  level: string;
  country: string;
  language: string;
  subjects: string[];
  goal: string;
};
type Preferences = { dark: boolean; reminders: boolean; email: boolean; language: string };
type FocusEntry = { id: string; date: string; minutes: number; subject: string };
type DemoState = {
  tasks: Task[];
  notes: Note[];
  sessions: Session[];
  profile: Profile;
  preferences: Preferences;
  history: FocusEntry[];
};
const defaults: DemoState = {
  tasks: initialTasks,
  notes: initialNotes,
  sessions: initialSessions,
  profile: {
    name: "Alex Johnson",
    level: "University",
    country: "United States",
    language: "English",
    subjects: ["Mathematics", "Physics", "Computer Science"],
    goal: "Build a consistent study routine",
  },
  preferences: { dark: false, reminders: true, email: false, language: "English" },
  history: [
    { id: "focus-1", date: "2026-11-26T09:00:00", minutes: 25, subject: "Mathematics" },
    { id: "focus-2", date: "2026-11-25T14:00:00", minutes: 25, subject: "Physics" },
  ],
};
const STORAGE_KEY = "student-life-demo-v1";
type Store = DemoState & {
  saveTask: (task: Task) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  saveNote: (note: Note) => void;
  removeNote: (id: string) => void;
  saveSession: (session: Session) => void;
  removeSession: (id: string) => void;
  saveProfile: (profile: Profile) => void;
  savePreferences: (value: Partial<Preferences>) => void;
  addFocus: (minutes: number, subject: string) => void;
};
const Context = createContext<Store | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(defaults);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (saved && typeof saved === "object") setState({ ...defaults, ...saved });
      }
    } catch {
      /* A fresh demo remains available if storage is unavailable. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Demo continues in memory. */
    }
    document.documentElement.classList.toggle("dark", state.preferences.dark);
  }, [state, ready]);
  const store: Store = {
    ...state,
    saveTask: (task) =>
      setState((s) => ({
        ...s,
        tasks: s.tasks.some((t) => t.id === task.id)
          ? s.tasks.map((t) => (t.id === task.id ? task : t))
          : [task, ...s.tasks],
      })),
    removeTask: (id) => setState((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== id) })),
    completeTask: (id) => setState((s) => ({ ...s, tasks: toggleTask(s.tasks, id) })),
    saveNote: (note) =>
      setState((s) => ({
        ...s,
        notes: s.notes.some((n) => n.id === note.id)
          ? s.notes.map((n) => (n.id === note.id ? note : n))
          : [note, ...s.notes],
      })),
    removeNote: (id) => setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) })),
    saveSession: (session) =>
      setState((s) => ({
        ...s,
        sessions: s.sessions.some((t) => t.id === session.id)
          ? s.sessions.map((t) => (t.id === session.id ? session : t))
          : [...s.sessions, session],
      })),
    removeSession: (id) =>
      setState((s) => ({ ...s, sessions: s.sessions.filter((t) => t.id !== id) })),
    saveProfile: (profile) => setState((s) => ({ ...s, profile })),
    savePreferences: (value) =>
      setState((s) => ({ ...s, preferences: { ...s.preferences, ...value } })),
    addFocus: (minutes, subject) =>
      setState((s) => ({
        ...s,
        history: [
          { id: crypto.randomUUID(), date: new Date().toISOString(), minutes, subject },
          ...s.history,
        ],
      })),
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
export function useDemo() {
  const value = useContext(Context);
  if (!value) throw new Error("DemoProvider is required");
  return value;
}
