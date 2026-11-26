import { describe, expect, it } from "vitest";
import { initialTasks, toggleTask, quizScore, daysUntil } from "@/lib/study/demo";
describe("Student demo interactions", () => {
  it("completes a task without modifying another task", () => {
    const result = toggleTask(initialTasks, "task-1");
    expect(result.find((t) => t.id === "task-1")?.completed).toBe(true);
    expect(result.find((t) => t.id === "task-2")?.completed).toBe(false);
    expect(initialTasks.find((t) => t.id === "task-1")?.completed).toBe(false);
  });
  it("reopens a completed task", () => {
    expect(toggleTask(initialTasks, "task-5").find((t) => t.id === "task-5")?.completed).toBe(
      false,
    );
  });
  it("scores actual quiz answers and rejects incorrect answers", () => {
    expect(quizScore([1, 2, 3])).toBe(3);
    expect(quizScore([0, 0, 0])).toBe(0);
    expect(quizScore([1, 0, 3])).toBe(2);
  });
  it("calculates exam countdown and clamps past exams to zero", () => {
    expect(daysUntil("2026-12-02", new Date("2026-11-26T12:00:00"))).toBe(6);
    expect(daysUntil("2026-11-25", new Date("2026-11-26T12:00:00"))).toBe(0);
  });
});
