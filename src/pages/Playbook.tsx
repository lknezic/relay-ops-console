import { Link } from "react-router-dom";
import { Radio, ArrowLeft, Shield, Moon, AlertTriangle, Play, Pause, CheckCircle2, HelpCircle, ChevronRight, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    id: "what-relay-does",
    icon: <Radio className="w-4 h-4" />,
    title: "What Relay does",
    content: [
      "Relay is an autonomous coding assistant that works on your codebase while you're away. It runs approved coding tasks, verifies its own work, and waits for review before moving on.",
      "Think of it like a careful contractor: it only does work you've approved, checks its own results, and stops if anything goes wrong.",
      "You are the operator. Your job is to approve work, check in on progress, and resolve any issues that come up. You don't need to understand the code — Relay handles that.",
    ],
  },
  {
    id: "how-to-start-overnight",
    icon: <Moon className="w-4 h-4" />,
    title: "How to start an overnight run",
    content: [
      "An overnight run lets Relay work autonomously while you sleep or step away. Before starting one, you should make sure everything is ready.",
    ],
    steps: [
      { step: "1", text: "Open the dashboard and check that the session status is healthy (green)." },
      { step: "2", text: "Click the overnight readiness badge on the session panel, or use the \"Start overnight run\" button." },
      { step: "3", text: "Confirm which session should run and set a phase limit — this is how many tasks Relay will complete before stopping." },
      { step: "4", text: "Make sure the next step is approved. If it says \"Needs your approval,\" approve it first." },
      { step: "5", text: "Review the preflight checks. All must pass before it's safe to leave Relay running." },
      { step: "6", text: "If everything passes, confirm and close your laptop. If something fails, fix the issue and try again." },
    ],
  },
  {
    id: "what-statuses-mean",
    icon: <Shield className="w-4 h-4" />,
    title: "What the statuses mean",
    statuses: [
      { badge: "healthy", label: "Running", desc: "Relay is actively working on an approved task. No action needed." },
      { badge: "info", label: "Waiting for review", desc: "Relay finished its work and is waiting for the automated reviewer. You don't need to do anything." },
      { badge: "warning", label: "Needs your approval", desc: "A new task is ready but Relay needs your permission to start. Review and approve it." },
      { badge: "danger", label: "Blocked", desc: "Something went wrong — usually a failed verification. Relay has stopped and needs you to decide what to do." },
      { badge: "warning", label: "Needs repair", desc: "The workspace has a conflict. Relay can't continue until you repair it." },
      { badge: "warning", label: "Stalled", desc: "Relay hasn't reported progress in a while. It might be stuck, or it might just be working on something complex." },
      { badge: "paused", label: "Paused", desc: "You paused this session. Relay won't do anything until you resume it." },
      { badge: "healthy", label: "Completed", desc: "All approved work is done and verified. Nothing left to do." },
    ],
  },
  {
    id: "when-relay-stops",
    icon: <AlertTriangle className="w-4 h-4" />,
    title: "What to do when Relay stops",
    content: [
      "When Relay stops unexpectedly, the dashboard will tell you exactly what happened and what to do. Here are the most common situations:",
    ],
    scenarios: [
      {
        title: "\"Needs your approval\"",
        what: "A new task is queued but Relay won't start without your permission.",
        do: "Open the approval modal, review the task summary, and click Approve to continue.",
        risk: "No risk — this is normal and expected.",
      },
      {
        title: "\"Review failed\"",
        what: "Relay's work didn't pass the automated quality check.",
        do: "Open the recovery modal. You can retry with fixes (safest), reset and start over, or force-accept if you've checked manually.",
        risk: "Retrying is safe. Force-accepting skips quality checks — only do this if you're sure.",
      },
      {
        title: "\"Workspace needs repair\"",
        what: "Files in the workspace are conflicting with each other.",
        do: "Click Repair workspace. Relay will attempt to resolve the conflict automatically.",
        risk: "Low risk. If repair fails, you may need to reset the session.",
      },
      {
        title: "\"Run appears stalled\"",
        what: "Relay hasn't reported progress in 15+ minutes.",
        do: "Click Investigate to open diagnostics. Check if the executor is still running. If it's truly stuck, pause and restart.",
        risk: "Usually not dangerous — complex tasks can take time. But if it's truly stuck, pausing is safe.",
      },
    ],
  },
  {
    id: "before-you-leave",
    icon: <Moon className="w-4 h-4" />,
    title: "Before you leave your computer",
    content: [],
    checklist: [
      { text: "Session status is green (Running or Waiting for review)", important: true },
      { text: "Overnight readiness badge says \"Safe to leave running\"", important: true },
      { text: "Phase limit is set to a reasonable number (3–5 for your first time)", important: false },
      { text: "Next step is approved — no pending approvals", important: true },
      { text: "No items in the \"Needs Attention\" panel", important: false },
      { text: "You've run the overnight preflight checks and they all passed", important: true },
    ],
    afterContent: [
      "If any of these aren't met, the overnight modal will tell you exactly what's wrong and how to fix it.",
      "When in doubt, set a lower phase limit. Relay will stop after that many tasks and wait for you. You can always approve more when you return.",
    ],
  },
  {
    id: "advanced",
    icon: <Settings className="w-4 h-4" />,
    title: "Advanced details",
    content: [
      "These details are for operators who want to understand more about how Relay works under the hood. You don't need to know any of this to use Relay effectively.",
    ],
    details: [
      { term: "Executor", def: "The component that runs approved coding tasks. It follows instructions, writes code, and reports results." },
      { term: "Reviewer", def: "An automated quality checker that verifies the executor's output against expected criteria." },
      { term: "Session", def: "A group of related coding tasks that Relay works through sequentially. Each session has its own workspace." },
      { term: "Phase", def: "One self-contained coding task within a session. Relay completes one phase at a time." },
      { term: "Workspace", def: "The set of files and code that Relay works with. Each session has its own isolated workspace." },
      { term: "Preflight checks", def: "A set of automated checks that verify everything is ready before an overnight run." },
    ],
  },
];

export default function Playbook() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to console</span>
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Operator Playbook</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-12 animate-relay-fade-up">
          <h1 className="text-2xl font-semibold text-foreground mb-3 tracking-tight">
            Operator Playbook
          </h1>
          <p className="text-base text-muted-foreground text-pretty max-w-lg leading-relaxed">
            Everything you need to know to run Relay confidently. No technical knowledge required.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mb-10 p-5 rounded-xl bg-card border border-border animate-relay-fade-up" style={{ animationDelay: "80ms" }}>
          <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-3">
            In this guide
          </p>
          <div className="space-y-1">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm text-foreground hover:bg-muted/60 transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {section.icon}
                </span>
                {section.title}
                <ChevronRight className="w-3 h-3 text-muted-foreground/40 ml-auto" />
              </a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sIdx) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 animate-relay-fade-up"
              style={{ animationDelay: `${160 + sIdx * 60}ms` }}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  {section.icon}
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>

              {/* Paragraphs */}
              {section.content && section.content.length > 0 && (
                <div className="space-y-3 mb-5">
                  {section.content.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {/* Steps */}
              {section.steps && (
                <div className="space-y-3 mt-4">
                  {section.steps.map((s, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                        {s.step}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed pt-0.5">{s.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Statuses */}
              {section.statuses && (
                <div className="space-y-2 mt-4">
                  {section.statuses.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                      <Badge
                        variant={s.badge as any}
                        className="text-[10px] px-2.5 py-0.5 shrink-0 mt-0.5"
                      >
                        {s.label}
                      </Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Scenarios */}
              {section.scenarios && (
                <div className="space-y-4 mt-4">
                  {section.scenarios.map((sc, i) => (
                    <div key={i} className="p-4 rounded-xl bg-card border border-border">
                      <p className="text-sm font-semibold text-foreground mb-2">{sc.title}</p>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-xs font-medium text-muted-foreground shrink-0 w-16 pt-0.5">What:</span>
                          <p className="text-sm text-muted-foreground">{sc.what}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs font-medium text-muted-foreground shrink-0 w-16 pt-0.5">Do this:</span>
                          <p className="text-sm text-foreground">{sc.do}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs font-medium text-muted-foreground shrink-0 w-16 pt-0.5">Risk:</span>
                          <p className="text-xs text-muted-foreground italic">{sc.risk}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Checklist */}
              {section.checklist && (
                <div className="space-y-2 mt-4 mb-5">
                  {section.checklist.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-xl border ${
                        item.important
                          ? "bg-relay-healthy-bg/20 border-relay-healthy/10"
                          : "bg-muted/20 border-border/50"
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        item.important ? "text-relay-healthy" : "text-muted-foreground/40"
                      }`} />
                      <p className="text-sm text-foreground">{item.text}</p>
                      {item.important && (
                        <Badge variant="healthy" className="text-[9px] px-1.5 py-0 shrink-0 ml-auto">
                          Required
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* After content */}
              {section.afterContent && (
                <div className="space-y-2">
                  {section.afterContent.map((p, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {/* Advanced details */}
              {section.details && (
                <div className="space-y-2 mt-4">
                  {section.details.map((d, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/20 border border-border/50">
                      <p className="text-sm font-medium text-foreground mb-0.5">{d.term}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{d.def}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Need more help? Contact your system administrator.
          </p>
        </div>
      </main>
    </div>
  );
}
