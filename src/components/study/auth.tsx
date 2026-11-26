import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "./common";
import { useDemo } from "./store";
import { subjects } from "@/lib/study/demo";
import hero from "@/assets/student-study.png.asset.json";
export function AuthPage({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const title =
    mode === "login"
      ? "Welcome back."
      : mode === "signup"
        ? "Your next chapter starts here."
        : "A fresh start.";
  return (
    <div className="auth-layout">
      <aside className="auth-art">
        <Link to="/">
          <Brand />
        </Link>
        <div>
          <span className="badge tone-indigo mb-5">
            <Sparkles size={13} />A little progress, every day.
          </span>
          <h2 className="text-4xl font-bold leading-tight">
            Your Study.
            <br />
            Your Goals.
            <br />
            <span className="text-primary">Your Future.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
            A thoughtful space for your academic life — and everything you're becoming.
          </p>
          <img
            src={hero.url}
            className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
            alt="Students working together in a sunlit university study space"
          />
        </div>
        <p className="mt-8 text-xs text-muted-foreground">Made for students, everywhere.</p>
      </aside>
      <main className="auth-form">
        <div className="auth-inner">
          <Link to="/" className="mb-10 flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <div className="mb-8 lg:hidden">
            <Brand />
          </div>
          <h1 className="text-3xl font-bold leading-tight">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {mode === "login"
              ? "Your goals are right where you left them."
              : mode === "signup"
                ? "Make a little room for your biggest ambitions."
                : "Enter your email to preview password recovery."}
          </p>
          <span className="badge tone-amber mt-5">Demo only · No real account is created</span>
          {sent ? (
            <div className="mt-8 rounded-xl bg-success-soft p-6">
              <Check className="mb-4 text-success" />
              <h2 className="font-semibold">Password recovery preview</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                In the finished app, a reset link would arrive in your inbox. No email was sent in
                this demo.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/login">Back to login</Link>
              </Button>
            </div>
          ) : (
            <form
              className="mt-8 space-y-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                const d = new FormData(e.currentTarget);
                const password = String(d.get("password") ?? "");
                if (mode !== "forgot" && password.length < 8) {
                  setError("Use at least 8 characters for your password.");
                  return;
                }
                if (mode === "signup" && password !== String(d.get("confirm"))) {
                  setError("Your passwords don’t match. Please try again.");
                  return;
                }
                setBusy(true);
                await new Promise((resolve) => setTimeout(resolve, 350));
                setBusy(false);
                if (mode === "forgot") {
                  setSent(true);
                  return;
                }
                await navigate({ to: mode === "signup" ? "/onboarding" : "/dashboard" });
              }}
            >
              {mode === "signup" && (
                <label className="field-label">
                  Full name
                  <input
                    className="field"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </label>
              )}
              <label className="field-label">
                Email address
                <input
                  className="field"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              {mode !== "forgot" && (
                <>
                  <label className="field-label">
                    Password
                    <span className="relative">
                      <input
                        className="field pr-12"
                        name="password"
                        type={visible ? "text" : "password"}
                        autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        placeholder="At least 8 characters"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1"
                        title={visible ? "Hide password" : "Show password"}
                        aria-label={visible ? "Hide password" : "Show password"}
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <EyeOff /> : <Eye />}
                      </Button>
                    </span>
                  </label>
                  {mode === "signup" && (
                    <label className="field-label">
                      Confirm password
                      <input
                        className="field"
                        name="confirm"
                        type={visible ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Enter your password again"
                        required
                      />
                    </label>
                  )}
                  {mode === "login" && (
                    <div className="flex justify-end">
                      <Link to="/forgot-password" className="text-xs font-medium text-primary">
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </>
              )}
              {error && (
                <p role="alert" className="text-xs text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" className="h-11 w-full" disabled={busy}>
                {busy
                  ? "Just a moment..."
                  : mode === "login"
                    ? "Open my workspace"
                    : mode === "signup"
                      ? "Get started"
                      : "Preview recovery"}
                <ArrowRight />
              </Button>
              {mode === "login" ? (
                <p className="text-center text-xs text-muted-foreground">
                  New here?{" "}
                  <Link to="/signup" className="font-medium text-primary">
                    Create an account
                  </Link>
                </p>
              ) : mode === "signup" ? (
                <p className="text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-primary">
                    Log in
                  </Link>
                </p>
              ) : null}
              <div className="border-t pt-5 text-center">
                <Link to="/dashboard" className="text-xs text-muted-foreground">
                  Just looking? Explore the demo →
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
export function Onboarding() {
  const { profile, saveProfile } = useDemo();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("University");
  const [country, setCountry] = useState("United States");
  const [language, setLanguage] = useState("English");
  const [chosen, setChosen] = useState<string[]>(["Mathematics"]);
  const [goal, setGoal] = useState("Build a consistent study routine");
  return (
    <main className="min-h-screen px-5 py-10">
      <div className="mx-auto max-w-xl">
        <Link to="/">
          <Brand />
        </Link>
        <div className="my-10 flex items-center gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
        <span className="badge tone-indigo mb-4">Step {step} of 3</span>
        <h1 className="text-3xl font-bold">
          {step === 1
            ? "Let’s make this yours."
            : step === 2
              ? "What are you learning?"
              : "What’s your next big goal?"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {step === 1
            ? "A few details to shape your study space."
            : step === 2
              ? "Pick the subjects you’re working on."
              : "Every journey starts with a little intention."}
        </p>
        <form
          className="mt-8 space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            if (step < 3) {
              setStep(step + 1);
              return;
            }
            saveProfile({
              ...profile,
              name: name.trim(),
              level,
              country,
              language,
              subjects: chosen,
              goal,
            });
            await navigate({ to: "/dashboard" });
          }}
        >
          {step === 1 && (
            <>
              <label className="field-label">
                Your name
                <input
                  className="field"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                />
              </label>
              <label className="field-label">
                Education level
                <select className="field" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option>Secondary school</option>
                  <option>College</option>
                  <option>University</option>
                  <option>Postgraduate</option>
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field-label">
                  Country
                  <input
                    className="field"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </label>
                <label className="field-label">
                  Preferred language
                  <select
                    className="field"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {["English", "বাংলা", "Español", "Français", "العربية"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          )}
          {step === 2 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {subjects.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={chosen.includes(s) ? "soft" : "outline"}
                  className="h-16 justify-between"
                  onClick={() =>
                    setChosen(chosen.includes(s) ? chosen.filter((x) => x !== s) : [...chosen, s])
                  }
                >
                  <BookOpen />
                  {s}
                  {chosen.includes(s) && <Check />}
                </Button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              {[
                "Build a consistent study routine",
                "Stay ahead of assignments",
                "Prepare confidently for exams",
                "Make more time for myself",
              ].map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={goal === g ? "soft" : "outline"}
                  className="h-auto min-h-14 w-full justify-between whitespace-normal px-5 py-4 text-left"
                  onClick={() => setGoal(g)}
                >
                  {g}
                  {goal === g && <Check />}
                </Button>
              ))}
            </div>
          )}
          <div className="flex justify-between pt-6">
            {step > 1 ? (
              <Button type="button" variant="ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft />
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button type="submit" disabled={step === 2 && !chosen.length}>
              {step === 3 ? "Make it happen" : "Continue"}
              <ArrowRight />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
