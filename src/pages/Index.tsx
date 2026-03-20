import { useState } from "react";
import { StatusStrip } from "@/components/relay/StatusStrip";
import { SessionHero } from "@/components/relay/SessionHero";
import { NeedsAttention, IssueCard } from "@/components/relay/NeedsAttention";
import { SessionTimeline } from "@/components/relay/SessionTimeline";
import { RecentActivity } from "@/components/relay/RecentActivity";
import { ApprovalModal } from "@/components/relay/ApprovalModal";
import { RecoveryModal } from "@/components/relay/RecoveryModal";
import { DiagnosticsDrawer } from "@/components/relay/DiagnosticsDrawer";
import { Radio } from "lucide-react";

const Index = () => {
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  const issues: IssueCard[] = [
    {
      id: "1",
      severity: "warning",
      title: "Needs your approval",
      explanation:
        "A new coding task is ready to start but requires your permission before Relay can begin work.",
      actionLabel: "Review & approve",
      onAction: () => setApprovalOpen(true),
    },
    {
      id: "2",
      severity: "critical",
      title: "Review failed",
      explanation:
        "The last completed task did not pass verification. The output may contain errors that need to be addressed.",
      actionLabel: "View details",
      onAction: () => setRecoveryOpen(true),
    },
    {
      id: "3",
      severity: "warning",
      title: "Workspace needs repair",
      explanation:
        "The session workspace has conflicting files. Relay can't continue until this is resolved.",
      actionLabel: "Repair workspace",
      onAction: () => setRecoveryOpen(true),
    },
    {
      id: "4",
      severity: "info",
      title: "Run appears stalled",
      explanation:
        "Relay hasn't reported progress in over 15 minutes. This may be normal for complex tasks, or it may indicate a problem.",
      actionLabel: "Investigate",
      onAction: () => setDiagnosticsOpen(true),
    },
  ];

  const timelineSteps = [
    { label: "Task approved", status: "completed" as const, time: "14:32" },
    { label: "Execution started", status: "completed" as const, time: "14:32" },
    { label: "Execution completed", status: "completed" as const, time: "14:38" },
    { label: "Verification passed", status: "completed" as const, time: "14:38" },
    { label: "Review started", status: "active" as const, time: "14:40" },
    { label: "Review completed", status: "pending" as const },
    { label: "Next step ready", status: "pending" as const },
  ];

  const progressSteps = [
    { label: "Approved", completed: true, active: false },
    { label: "Running", completed: true, active: false },
    { label: "Verifying", completed: true, active: false },
    { label: "Reviewing", completed: false, active: true },
    { label: "Complete", completed: false, active: false },
  ];

  const activityEvents = [
    { id: "1", type: "success" as const, message: "Verification passed for phase 2 — all tests green", time: "2 min ago" },
    { id: "2", type: "info" as const, message: "Review requested — waiting for reviewer", time: "2 min ago" },
    { id: "3", type: "success" as const, message: "Execution phase 2 completed successfully", time: "5 min ago" },
    { id: "4", type: "action" as const, message: "Operator approved session start", time: "12 min ago" },
    { id: "5", type: "success" as const, message: "Execution phase 1 completed", time: "10 min ago" },
    { id: "6", type: "info" as const, message: "Session initialized and workspace prepared", time: "12 min ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground tracking-tight">Relay</h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Operator Console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Last updated: just now
            </span>
            <div className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-medium">
              M
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Status Strip */}
        <section className="animate-relay-fade-up">
          <StatusStrip
            relayStatus="healthy"
            sessionState="Waiting for review"
            sessionBadgeVariant="info"
            recommendedAction="No action needed — Relay is waiting for the reviewer to finish."
          />
        </section>

        {/* Main content row */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-relay-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="lg:col-span-3">
            <SessionHero
              sessionName="Refactor auth middleware for token refresh"
              stateBadge="Waiting for review"
              badgeVariant="info"
              explanation="Relay finished coding and is now waiting for the automated reviewer to check the output. You don't need to do anything yet."
              progress={65}
              progressSteps={progressSteps}
              primaryAction={{ label: "View output", onClick: () => {} }}
              secondaryAction={{ label: "Pause session", onClick: () => {} }}
              onAdvancedDetails={() => setDiagnosticsOpen(true)}
            />
          </div>
          <div className="lg:col-span-2">
            <NeedsAttention issues={issues} />
          </div>
        </section>

        {/* Lower row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-relay-fade-up" style={{ animationDelay: "200ms" }}>
          <SessionTimeline steps={timelineSteps} />
          <RecentActivity events={activityEvents} />
        </section>
      </main>

      {/* Modals & Drawers */}
      <ApprovalModal
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        sessionName="Refactor auth middleware for token refresh"
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
    </div>
  );
};

export default Index;
