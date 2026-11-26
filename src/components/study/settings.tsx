import { useState } from "react";
import { UserRound, Bell, Palette, Globe, Check, Sun, Moon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeading, SectionHeading } from "./common";
import { useDemo } from "./store";
export function Settings() {
  const { profile, preferences, saveProfile, savePreferences } = useDemo();
  const [saved, setSaved] = useState(false);
  return (
    <>
      <PageHeading title="Settings" description="A workspace that feels a little more like you." />
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="panel p-6">
          <SectionHeading title="Your profile" />
          <div className="mb-7 flex items-center gap-4">
            <span className="avatar size-16 text-xl">
              {profile.name
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{profile.level} student</p>
            </div>
          </div>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              saveProfile({
                ...profile,
                name: String(d.get("name")).trim(),
                level: String(d.get("level")),
                country: String(d.get("country")),
                goal: String(d.get("goal")),
              });
              setSaved(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-label">
                Full name
                <input className="field" name="name" defaultValue={profile.name} required />
              </label>
              <label className="field-label">
                Education level
                <select className="field" name="level" defaultValue={profile.level}>
                  <option>Secondary school</option>
                  <option>College</option>
                  <option>University</option>
                  <option>Postgraduate</option>
                </select>
              </label>
              <label className="field-label">
                Country
                <input className="field" name="country" defaultValue={profile.country} required />
              </label>
              <label className="field-label">
                Study goal
                <input className="field" name="goal" defaultValue={profile.goal} />
              </label>
            </div>
            <div className="flex items-center justify-end gap-4">
              {saved && (
                <span role="status" className="flex items-center gap-1 text-xs text-success">
                  <Check size={14} />
                  Profile saved
                </span>
              )}
              <Button type="submit">
                <Save />
                Save changes
              </Button>
            </div>
          </form>
        </section>
        <section className="panel p-6">
          <SectionHeading title="Appearance & language" />
          <div className="flex flex-wrap items-center justify-between gap-5 border-b pb-5">
            <div className="flex items-center gap-3">
              <Palette size={20} className="text-primary" />
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  A little brighter, or a little calmer.
                </p>
              </div>
            </div>
            <div className="flex gap-1 rounded-lg bg-muted p-1">
              <Button
                variant={!preferences.dark ? "outline" : "ghost"}
                size="sm"
                onClick={() => savePreferences({ dark: false })}
              >
                <Sun />
                Light
              </Button>
              <Button
                variant={preferences.dark ? "outline" : "ghost"}
                size="sm"
                onClick={() => savePreferences({ dark: true })}
              >
                <Moon />
                Dark
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-sky" />
              <div>
                <p className="text-sm font-medium">Preferred language</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Saved for your profile. The demo is in English.
                </p>
              </div>
            </div>
            <select
              className="field w-auto"
              aria-label="Preferred language"
              value={preferences.language}
              onChange={(e) => savePreferences({ language: e.target.value })}
            >
              {["English", "বাংলা", "Español", "Français", "Deutsch", "العربية"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </section>
        <section className="panel p-6">
          <SectionHeading title="Notifications" />
          {[
            {
              key: "reminders" as const,
              title: "Study reminders",
              detail: "A gentle nudge before your planned sessions.",
            },
            {
              key: "email" as const,
              title: "Weekly progress summary",
              detail: "Keep a weekly summary preference for your future account.",
            },
          ].map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-center justify-between gap-4 border-b py-4 last:border-0"
            >
              <span>
                <span className="text-sm font-medium">{item.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{item.detail}</span>
              </span>
              <input
                type="checkbox"
                role="switch"
                aria-label={item.title}
                className="h-5 w-5 accent-primary"
                checked={preferences[item.key]}
                onChange={(e) => savePreferences({ [item.key]: e.target.checked })}
              />
            </label>
          ))}
        </section>
        <p className="text-center text-xs text-muted-foreground">
          This is your demo workspace. No real account or emails are created.
        </p>
      </div>
    </>
  );
}
