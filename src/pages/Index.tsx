import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { StatusStrip } from "@/components/relay/StatusStrip";
import { SessionHero } from "@/components/relay/SessionHero";
import { NeedsAttention, IssueCard } from "@/components/relay/NeedsAttention";
import { SessionTimeline } from "@/components/relay/SessionTimeline";
import { RecentActivity } from "@/components/relay/RecentActivity";
import { ApprovalModal } from "@/components/relay/ApprovalModal";
import { RecoveryModal } from "@/components/relay/RecoveryModal";
import { DiagnosticsDrawer } from "@/components/relay/DiagnosticsDrawer";
import { OvernightModal } from "@/components/relay/OvernightModal";
import { Radio, BookOpen, Bug } from "lucide-react";
import {
  SessionPrimaryState,
  STATE_CONFIGS,
  ALL_ISSUES,
} from "@/lib/relay-states";

const SESSION_NAME = "Refactor auth middleware for token refresh";

const DEMO_STATES: { label: string; value: SessionPrimaryState }[] = [
  { label: "Running", value: "safe_running" },
  { label: "Waiting for review", value: "waiting_for_review" },
  { label: "Needs approval", value: "needs_approval" },
  { label: "Blocked", value: "blocked" },
  { label: "Needs repair", value: "needs_repair" },
  { label: "Stale", value: "stale" },
  { label: "Paused", value: "paused" },
  { label: "Completed", value: "completed" },
];

const activityEvents = [
  { id: "1", type: "success" as const, message: "Verification passed for phase 2 — all tests green", time: "2 min ago" },
  { id: "2", type: "info" as const, message: "Review requested — waiting for reviewer", time: "2 min ago" },
  { id: "3", type: "success" as const, message: "Execution phase 2 completed successfully", time: "5 min ago" },
  { id: "4", type: "action" as const, message: "Operator approved session start", time: "12 min ago" },
  { id: "5", type: "success" as const, message: "Execution phase 1 completed", time: "10 min ago" },
  { id: "6", type: "info" as const, message: "Session initialized and workspace prepared", time: "12 min ago" },
];

const Index = () => {
  const [sessionState, setSessionState] = useState<SessionPrimaryState>("waiting_for_review");
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [overnightOpen, setOvernightOpen] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);

  const config = STATE_CONFIGS[sessionState];

  // Derive issues from current state — no contradictions
  const issues: IssueCard[] = useMemo(() => {
    const issueActionMap: Record<string, () => void> = {
      needs_approval: () => setApprovalOpen(true),
      review_failed: () => setRecoveryOpen(true),
      workspace_repair: () => setRecoveryOpen(true),
      stale_run: () => setDiagnosticsOpen(true),
      setup_required: () => setDiagnosticsOpen(true),
    };

    return config.allowedIssueIds
      .filter((id) => ALL_ISSUES[id])
      .map((id) => ({
        ...ALL_ISSUES[id],
        id,
        onAction: issueActionMap[id] || (() => {}),
      }));
  }, [sessionState, config.allowedIssueIds]);

  // Primary CTA handler — context-aware
  const handlePrimaryAction = () => {
    switch (sessionState) {
      case "needs_approval":
        setApprovalOpen(true);
        break;
      case "blocked":
      case "needs_repair":
        setRecoveryOpen(true);
        break;
      case "stale":
        setDiagnosticsOpen(true);
        break;
      default:
        setDiagnosticsOpen(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground tracking-tight">Relay</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Operator Console</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/playbook"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 sm:px-3 py-1.5 rounded-lg hover:bg-muted/60"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">How this works</span>
            </Link>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Last updated: just now
            </span>
            <div className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-medium">
              M
            </div>
          </div>
        </div>
      </header>

      {/* Dev-only state switcher — hidden in production */}
      {import.meta.env.DEV && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mt-3">
            <button
              onClick={() => setShowDevTools(!showDevTools)}
              className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <Bug className="w-3 h-3" />
              {showDevTools ? "Hide" : "Show"} state preview (dev only)
            </button>
            {showDevTools && (
              <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-dashed border-border">
                <p className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                  ⚠ Dev preview — switch between states to test all views
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {DEMO_STATES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSessionState(s.value)}
                      className={`text-[10px] px-2.5 py-1 rounded-md transition-colors ${
                        sessionState === s.value
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted border border-border"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Status Strip — driven by single state */}
        <section className="animate-relay-fade-up">
          <StatusStrip config={config} />
        </section>

        {/* Main content row */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-relay-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="lg:col-span-3">
            <SessionHero
              sessionName={SESSION_NAME}
              config={config}
              onPrimaryAction={handlePrimaryAction}
              onSecondaryAction={() => {}}
              onAdvancedDetails={() => setDiagnosticsOpen(true)}
              onStartOvernight={() => setOvernightOpen(true)}
            />
          </div>
          <div className="lg:col-span-2">
            <NeedsAttention issues={issues} />
          </div>
        </section>

        {/* Lower row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-relay-fade-up" style={{ animationDelay: "200ms" }}>
          <SessionTimeline steps={config.timelineSteps} />
          <RecentActivity events={activityEvents} />
        </section>
      </main>

      {/* Modals & Drawers */}
      <ApprovalModal
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        sessionName={SESSION_NAME}
        taskSummary="Update the authentication middleware to handle token refresh automatically. This involves modifying the JWT validation logic and adding retry behavior for expired tokens."
        estimatedScope="3 files modified, ~120 lines changed"
      />

      <RecoveryModal
        open={recoveryOpen}
        onOpenChange={setRecoveryOpen}
        issueTitle="Review failed — verification errors"
        issueExplanation="The automated review found issues with the output. Here are your options to resolve this."
        options={[
          {
            label: "Retry with fixes",
            description: "Ask Relay to attempt the task again, incorporating the reviewer's feedback automatically.",
            risk: "safe",
          },
          {
            label: "Reset and start over",
            description: "Clear the current workspace and restart the task from scratch with the original instructions.",
            risk: "moderate",
          },
          {
            label: "Force accept output",
            description: "Accept the current output despite the failed review. Only use this if you've manually verified the result.",
            risk: "risky",
          },
        ]}
      />

      <DiagnosticsDrawer
        open={diagnosticsOpen}
        onOpenChange={setDiagnosticsOpen}
      />

      <OvernightModal
        open={overnightOpen}
        onOpenChange={setOvernightOpen}
        sessionState={sessionState}
        sessionName={SESSION_NAME}
      />
    </div>
  );
};

export default Index;
