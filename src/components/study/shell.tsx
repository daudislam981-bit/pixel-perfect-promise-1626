import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  FileText,
  GraduationCap,
  Timer,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Menu,
  Moon,
  Sun,
  LogOut,
  X,
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { Brand } from "./common";
import { useDemo } from "./store";
const navigation = [
  { to: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
  { to: "/planner", name: "Study Planner", icon: CalendarDays },
  { to: "/tasks", name: "Task Manager", icon: CheckSquare },
  { to: "/notes", name: "Notes Library", icon: FileText },
  { to: "/exams", name: "Exams & Quiz", icon: GraduationCap },
  { to: "/focus", name: "Focus Room", icon: Timer },
  { to: "/analytics", name: "Analytics", icon: BarChart3 },
] as const;
const publicPaths = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/onboarding",
  "/features",
  "/pricing",
  "/faq",
];
export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { profile, preferences, savePreferences, tasks, notes } = useDemo();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [read, setRead] = useState(false);
  if (publicPaths.includes(pathname)) return <>{children}</>;
  const page = navigation.find((n) => n.to === pathname)?.name ?? "Settings";
  const initials = profile.name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");
  return (
    <div className={`workspace ${collapsed ? "is-collapsed" : ""}`}>
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <Link
            to="/dashboard"
            onClick={() => setMobile(false)}
            aria-label="Student Life Assistant dashboard"
          >
            <Brand compact={collapsed && !mobile} />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Close menu"
            onClick={() => setMobile(false)}
          >
            <X />
          </Button>
        </div>
        <nav className="sidebar-nav">
          <p className={`nav-label ${collapsed && !mobile ? "hidden" : ""}`}>Workspace</p>
          {navigation.map(({ to, name, icon: Icon }) => (
            <Button
              key={to}
              asChild
              variant={pathname === to ? "active" : "nav"}
              className={`nav-button ${collapsed && !mobile ? "justify-center px-0" : ""}`}
              title={name}
            >
              <Link to={to} onClick={() => setMobile(false)}>
                <Icon />
                {(!collapsed || mobile) && <span>{name}</span>}
                {to === "/tasks" && !collapsed && (
                  <span className="ml-auto rounded bg-card px-1.5 text-[10px]">
                    {tasks.filter((t) => !t.completed).length}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          {!collapsed && (
            <div className="mb-7 rounded-xl border border-primary/10 bg-primary-soft p-4">
              <Sparkles size={18} className="mb-3 text-primary" />
              <p className="text-xs font-semibold">Your future starts today.</p>
              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                Make room for your best work.
              </p>
              <Link
                to="/focus"
                className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary"
              >
                Find your focus
                <ArrowUpRight size={13} />
              </Link>
            </div>
          )}
          <Button
            variant={pathname === "/settings" ? "active" : "nav"}
            asChild
            className="nav-button"
            title="Settings"
          >
            <Link to="/settings" onClick={() => setMobile(false)}>
              <Settings />
              {(!collapsed || mobile) && "Settings"}
            </Link>
          </Button>
          <Button variant="nav" asChild className="nav-button" title="Back to home">
            <Link to="/">
              <LogOut />
              {(!collapsed || mobile) && "Back to home"}
            </Link>
          </Button>
          <div className="mt-5 flex items-center justify-between border-t pt-5">
            {!collapsed && (
              <span className="text-[10px] text-muted-foreground">
                Your Study. Your Goals. Your Future.
              </span>
            )}
            <Button
              className="hidden md:inline-flex"
              size="icon"
              variant="ghost"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>
      </aside>
      <div className="workspace-main">
        <header className="topbar">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </Button>
            <span className="text-sm font-medium">{page}</span>
            <span className="badge tone-green hidden sm:inline-flex">
              <span className="size-1.5 rounded-full bg-success" />
              Personal workspace
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={() => setSearch(true)}
              className="hidden h-9 w-56 justify-start border-transparent bg-background text-xs text-muted-foreground lg:inline-flex"
            >
              <Search />
              Search anything...
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              title="Search"
              className="lg:hidden"
              onClick={() => setSearch(true)}
            >
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title={preferences.dark ? "Light theme" : "Dark theme"}
              aria-label={preferences.dark ? "Switch to light theme" : "Switch to dark theme"}
              onClick={() => savePreferences({ dark: !preferences.dark })}
            >
              {preferences.dark ? <Sun /> : <Moon />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => setNotifications(true)}
              className="relative"
            >
              <Bell />
              {!read && (
                <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-destructive" />
              )}
            </Button>
            <div className="hidden h-7 border-l sm:block" />
            <Link to="/settings" className="flex items-center gap-2" aria-label="Profile settings">
              <span className="avatar">{initials}</span>
              <span className="hidden text-xs font-medium xl:block">
                {profile.name}
                <span className="mt-1 block text-[10px] text-muted-foreground">Student</span>
              </span>
            </Link>
          </div>
        </header>
        <main className="workspace-content page-enter" key={pathname}>
          {children}
        </main>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navigation
          .filter((n) => ["/dashboard", "/planner", "/tasks", "/notes", "/focus"].includes(n.to))
          .map(({ to, name, icon: Icon }) => (
            <Link key={to} to={to} className={pathname === to ? "active" : ""}>
              <Icon />
              <span>{name.split(" ")[0]}</span>
            </Link>
          ))}
      </nav>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent>
          <DialogTitle>Search your workspace</DialogTitle>
          <DialogDescription>Tasks, notes, and pages</DialogDescription>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              autoFocus
              className="field pl-10"
              placeholder="Search by title or subject..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="max-h-72 space-y-2 overflow-y-auto">
            {navigation
              .filter((n) => n.name.toLowerCase().includes(query.toLowerCase()))
              .map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setSearch(false)}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
                >
                  <n.icon size={18} className="text-primary" />
                  {n.name}
                </Link>
              ))}
            {tasks
              .filter((t) => (t.title + t.subject).toLowerCase().includes(query.toLowerCase()))
              .map((t) => (
                <Link
                  key={t.id}
                  to="/tasks"
                  onClick={() => setSearch(false)}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
                >
                  <CheckSquare size={18} />
                  <span>
                    {t.title}
                    <small className="block text-muted-foreground">Task · {t.subject}</small>
                  </span>
                </Link>
              ))}
            {notes
              .filter((n) => (n.title + n.subject).toLowerCase().includes(query.toLowerCase()))
              .map((n) => (
                <Link
                  key={n.id}
                  to="/notes"
                  onClick={() => setSearch(false)}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
                >
                  <FileText size={18} />
                  <span>
                    {n.title}
                    <small className="block text-muted-foreground">Note · {n.subject}</small>
                  </span>
                </Link>
              ))}
            {query &&
              !navigation.some((n) => n.name.toLowerCase().includes(query.toLowerCase())) &&
              !tasks.some((t) =>
                (t.title + t.subject).toLowerCase().includes(query.toLowerCase()),
              ) &&
              !notes.some((n) =>
                (n.title + n.subject).toLowerCase().includes(query.toLowerCase()),
              ) && (
                <p className="py-8 text-center text-muted-foreground">No results for “{query}”</p>
              )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Your upcoming study reminders</DialogDescription>
          {read ? (
            <p className="py-6 text-center text-muted-foreground">You're all caught up.</p>
          ) : (
            <>
              <div className="rounded-lg bg-primary-soft p-4">
                <p className="font-medium">Calculus midterm is coming up</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  December 2 · Time for a little revision.
                </p>
              </div>
              <div className="rounded-lg bg-warning-soft p-4">
                <p className="font-medium">Your calculus assignment is due today</p>
                <Link
                  to="/tasks"
                  onClick={() => setNotifications(false)}
                  className="mt-2 block text-xs text-primary"
                >
                  View your tasks →
                </Link>
              </div>
              <Button variant="outline" onClick={() => setRead(true)}>
                <Check />
                Mark all as read
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
