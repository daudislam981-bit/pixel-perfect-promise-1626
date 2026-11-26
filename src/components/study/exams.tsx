import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
  Check,
  RotateCcw,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "./common";
import {
  dateLabel,
  daysUntil,
  exams,
  subjectTone,
  quizQuestions,
  quizScore,
} from "@/lib/study/demo";
export function Exams() {
  const [tab, setTab] = useState("Upcoming exams");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [choice, setChoice] = useState<number | undefined>();
  const [finished, setFinished] = useState(false);
  const question = quizQuestions[answers.length];
  return (
    <>
      <PageHeading
        title="Exams & Quiz"
        description="A little preparation today. A lot more confidence tomorrow."
      />
      <div className="mb-6 flex w-fit gap-1 rounded-lg bg-muted p-1">
        {["Upcoming exams", "Practice quiz"].map((t) => (
          <Button key={t} variant={tab === t ? "outline" : "ghost"} onClick={() => setTab(t)}>
            {t}
          </Button>
        ))}
      </div>
      {tab === "Upcoming exams" ? (
        <>
          <div className="grid gap-5 lg:grid-cols-3">
            {exams.map((exam) => (
              <article key={exam.id} className="panel p-6">
                <span className={`icon-tile ${subjectTone[exam.subject]}`}>
                  <GraduationCap />
                </span>
                <span className={`badge mt-5 ${subjectTone[exam.subject]}`}>{exam.subject}</span>
                <h2 className="mt-3 text-lg font-semibold">{exam.title}</h2>
                <div className="my-6 rounded-lg bg-background p-4 text-center">
                  <span className="text-4xl font-bold text-primary">{daysUntil(exam.date)}</span>
                  <p className="mt-1 text-xs text-muted-foreground">days to go</p>
                </div>
                <div className="space-y-3 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {dateLabel(exam.date)}, 2026
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 size={15} />
                    {exam.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} />
                    {exam.room}
                  </p>
                </div>
                <p className="mt-5 border-t pt-4 text-xs leading-6 text-muted-foreground">
                  {exam.topics}
                </p>
                <Button asChild variant="outline" className="mt-5 w-full">
                  <Link to="/planner">
                    Plan revision
                    <ArrowRight />
                  </Link>
                </Button>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-primary-soft p-6">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <h3 className="font-semibold">Ready for a quick knowledge check?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Three calculus questions. A fresh perspective on your progress.
                </p>
              </div>
              <Button onClick={() => setTab("Practice quiz")}>
                Try a practice quiz
                <ArrowRight />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <section className="panel mx-auto max-w-2xl p-6 sm:p-10">
          {finished ? (
            <div className="text-center">
              <span className="icon-tile tone-amber mx-auto mb-6">
                <Trophy />
              </span>
              <h2 className="text-2xl font-bold">A little wiser than before.</h2>
              <p className="mt-4 text-5xl font-bold text-primary">
                {quizScore(answers)}
                <span className="text-xl text-muted-foreground"> / {quizQuestions.length}</span>
              </p>
              <p className="mt-4 text-muted-foreground">
                {quizScore(answers) === 3
                  ? "Perfect score. Your revision is paying off!"
                  : "Every question is a chance to learn. Keep going!"}
              </p>
              <div className="mt-7 space-y-4 text-left">
                {quizQuestions.map((q, i) => (
                  <div
                    key={q.question}
                    className={`rounded-lg p-4 ${answers[i] === q.answer ? "bg-success-soft" : "bg-warning-soft"}`}
                  >
                    <p className="text-sm font-semibold">
                      {i + 1}. {q.question}
                    </p>
                    <p className="mt-2 text-xs">
                      Your answer: {answers[i] !== undefined ? q.options[answers[i] ?? 0] : ""}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{q.explanation}</p>
                  </div>
                ))}
              </div>
              <Button
                className="mt-7"
                onClick={() => {
                  setAnswers([]);
                  setChoice(undefined);
                  setFinished(false);
                  setStarted(true);
                }}
              >
                <RotateCcw />
                Try again
              </Button>
            </div>
          ) : started && question ? (
            <>
              <div className="mb-7 flex items-center justify-between">
                <span className="badge tone-indigo">Mathematics · Calculus</span>
                <span className="text-xs text-muted-foreground">
                  Question {answers.length + 1} of {quizQuestions.length}
                </span>
              </div>
              <div className="mb-8 flex gap-2">
                {quizQuestions.map((q, i) => (
                  <div
                    key={q.question}
                    className={`h-1.5 flex-1 rounded-full ${i <= answers.length ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
              <h2 className="text-2xl font-semibold leading-9">{question.question}</h2>
              <div className="my-8 space-y-3">
                {question.options.map((option, i) => (
                  <Button
                    key={option}
                    variant={choice === i ? "soft" : "outline"}
                    className="h-14 w-full justify-start px-5 text-base"
                    onClick={() => setChoice(i)}
                    aria-pressed={choice === i}
                  >
                    <span className="mr-3 flex size-7 items-center justify-center rounded-full border text-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {choice === i && <Check className="ml-auto" />}
                  </Button>
                ))}
              </div>
              <Button
                className="w-full"
                disabled={choice === undefined}
                onClick={() => {
                  if (choice === undefined) return;
                  setAnswers([...answers, choice]);
                  setChoice(undefined);
                  if (answers.length + 1 === quizQuestions.length) setFinished(true);
                }}
              >
                {answers.length + 1 === quizQuestions.length ? "See my results" : "Next question"}
                <ArrowRight />
              </Button>
            </>
          ) : (
            <div className="py-10 text-center">
              <span className="icon-tile tone-indigo mx-auto mb-6">
                <BookOpen />
              </span>
              <h2 className="text-2xl font-bold">A quick calculus check-in.</h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                Three questions to sharpen your understanding of derivatives, integrals, and limits.
              </p>
              <div className="my-6 flex justify-center gap-5 text-xs text-muted-foreground">
                <span>3 questions</span>
                <span>~2 minutes</span>
                <span>No pressure</span>
              </div>
              <Button onClick={() => setStarted(true)}>
                Start practice quiz
                <ArrowRight />
              </Button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
