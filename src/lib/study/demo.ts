export type Subject = "Mathematics" | "Physics" | "Computer Science" | "English";
export type Task = {
  id: string;
  title: string;
  subject: Subject;
  due: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};
export type Note = {
  id: string;
  title: string;
  subject: Subject;
  content: string;
  tags: string[];
  updated: string;
};
export type Session = {
  id: string;
  title: string;
  subject: Subject;
  date: string;
  time: string;
  minutes: number;
};
export const subjects: Subject[] = ["Mathematics", "Physics", "Computer Science", "English"];
export const subjectTone: Record<Subject, string> = {
  Mathematics: "tone-indigo",
  Physics: "tone-sky",
  "Computer Science": "tone-green",
  English: "tone-amber",
};
export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete calculus assignment",
    subject: "Mathematics",
    due: "2026-11-26",
    priority: "High",
    completed: false,
  },
  {
    id: "task-2",
    title: "Read chapter 5: Wave optics",
    subject: "Physics",
    due: "2026-11-27",
    priority: "Medium",
    completed: false,
  },
  {
    id: "task-3",
    title: "Submit programming project",
    subject: "Computer Science",
    due: "2026-11-28",
    priority: "High",
    completed: false,
  },
  {
    id: "task-4",
    title: "Review essay outline",
    subject: "English",
    due: "2026-11-29",
    priority: "Low",
    completed: false,
  },
  {
    id: "task-5",
    title: "Practice derivatives",
    subject: "Mathematics",
    due: "2026-11-25",
    priority: "Medium",
    completed: true,
  },
];
export const initialNotes: Note[] = [
  {
    id: "note-1",
    title: "Calculus: Integration basics",
    subject: "Mathematics",
    content:
      "Integration is the reverse of differentiation. The integral of xⁿ is xⁿ⁺¹ / (n + 1) + C, for n ≠ −1.\n\nKey techniques\n• Substitution\n• Integration by parts\n• Partial fractions",
    tags: ["Calculus", "Chapter 4"],
    updated: "2026-11-26",
  },
  {
    id: "note-2",
    title: "Laws of thermodynamics",
    subject: "Physics",
    content:
      "The first law describes conservation of energy: ΔU = Q − W. The second law states that the entropy of an isolated system never decreases.",
    tags: ["Thermodynamics"],
    updated: "2026-11-25",
  },
  {
    id: "note-3",
    title: "Data structures & algorithms",
    subject: "Computer Science",
    content:
      "Arrays provide constant-time indexed access. Linked lists support efficient insertion. A binary search on a sorted array runs in O(log n) time.",
    tags: ["Algorithms", "Revision"],
    updated: "2026-11-24",
  },
];
export const initialSessions: Session[] = [
  {
    id: "session-1",
    title: "Calculus revision",
    subject: "Mathematics",
    date: "2026-11-26",
    time: "09:00",
    minutes: 60,
  },
  {
    id: "session-2",
    title: "Physics practice",
    subject: "Physics",
    date: "2026-11-26",
    time: "14:00",
    minutes: 45,
  },
  {
    id: "session-3",
    title: "Programming practice",
    subject: "Computer Science",
    date: "2026-11-27",
    time: "10:00",
    minutes: 90,
  },
  {
    id: "session-4",
    title: "English literature",
    subject: "English",
    date: "2026-11-28",
    time: "11:00",
    minutes: 45,
  },
];
export const exams = [
  {
    id: "exam-1",
    title: "Calculus midterm",
    subject: "Mathematics" as Subject,
    date: "2026-12-02",
    time: "09:00",
    room: "Room B-204",
    topics: "Integration, derivatives, limits",
  },
  {
    id: "exam-2",
    title: "Physics final exam",
    subject: "Physics" as Subject,
    date: "2026-12-08",
    time: "10:30",
    room: "Science Hall",
    topics: "Waves, optics, thermodynamics",
  },
  {
    id: "exam-3",
    title: "Computer science practical",
    subject: "Computer Science" as Subject,
    date: "2026-12-12",
    time: "14:00",
    room: "Computer Lab 2",
    topics: "Data structures and algorithms",
  },
];
export const quizQuestions = [
  {
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x³", "2"],
    answer: 1,
    explanation: "The power rule gives d(x²)/dx = 2x.",
  },
  {
    question: "What is the integral of 2x?",
    options: ["2x² + C", "x + C", "x² + C", "2 + C"],
    answer: 2,
    explanation: "An antiderivative of 2x is x², plus a constant of integration.",
  },
  {
    question: "What is the limit of sin(x)/x as x approaches 0?",
    options: ["0", "∞", "−1", "1"],
    answer: 3,
    explanation: "The standard trigonometric limit is 1 (with angles in radians).",
  },
];
export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
}
export function quizScore(answers: number[]): number {
  return answers.reduce(
    (score, answer, index) => score + (quizQuestions[index]?.answer === answer ? 1 : 0),
    0,
  );
}
export function daysUntil(date: string, today = new Date()): number {
  const current = new Date(today);
  current.setHours(0, 0, 0, 0);
  return Math.max(
    0,
    Math.ceil((new Date(`${date}T00:00:00`).getTime() - current.getTime()) / 86400000),
  );
}
export function dateLabel(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
export function taskDue(date: string): string {
  const today = new Date();
  const local = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (date === local) return "Today";
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const next = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
  return date === next ? "Tomorrow" : dateLabel(date);
}
