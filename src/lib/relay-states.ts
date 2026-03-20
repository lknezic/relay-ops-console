import { IssueCard } from "@/components/relay/NeedsAttention";

export type SessionPrimaryState =
  | "safe_running"
  | "waiting_for_review"
  | "needs_approval"
  | "blocked"
  | "needs_repair"
  | "stale"
  | "paused"
  | "completed"
  | "idle_ready"
  | "setup_required";

export interface StateConfig {
  title: string;
  explanation: string;
  badgeVariant: "healthy" | "warning" | "danger" | "info" | "paused";
  relayStatus: "healthy" | "warning" | "danger";
  relayStatusSubtext: string;
  recommendedAction: string;
  recommendedActionSubtext: string;
  primaryCTA: { label: string };
  secondaryCTA: { label: string };
  overnightSafe: boolean;
  overnightReason?: string;
  progressSteps: { label: string; completed: boolean; active: boolean }[];
  timelineSteps: { label: string; status: "completed" | "active" | "pending" | "failed"; time?: string }[];
  allowedIssueIds: string[];
}

export const STATE_CONFIGS: Record<SessionPrimaryState, StateConfig> = {
  safe_running: {
    title: "Running",
    explanation: "Relay is executing the approved coding task. Everything is progressing normally.",
    badgeVariant: "healthy",
    relayStatus: "healthy",
    relayStatusSubtext: "All systems operational",
    recommendedAction: "No action needed — Relay is working autonomously.",
    recommendedActionSubtext: "No operator action needed right now",
    primaryCTA: { label: "See current work" },
    secondaryCTA: { label: "Pause session" },
    overnightSafe: true,
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Running", completed: false, active: true },
      { label: "Verifying", completed: false, active: false },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution started", status: "active", time: "14:33" },
      { label: "Execution completed", status: "pending" },
      { label: "Verification", status: "pending" },
      { label: "Review", status: "pending" },
      { label: "Complete", status: "pending" },
    ],
    allowedIssueIds: [],
  },

  waiting_for_review: {
    title: "Waiting for review",
    explanation: "Relay finished coding and is now waiting for the automated reviewer to check the output. You don't need to do anything yet.",
    badgeVariant: "info",
    relayStatus: "healthy",
    relayStatusSubtext: "All systems operational",
    recommendedAction: "No action needed — Relay is waiting for the reviewer to finish.",
    recommendedActionSubtext: "No operator action needed right now",
    primaryCTA: { label: "Review latest result" },
    secondaryCTA: { label: "Pause session" },
    overnightSafe: true,
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Running", completed: true, active: false },
      { label: "Verifying", completed: true, active: false },
      { label: "Reviewing", completed: false, active: true },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution started", status: "completed", time: "14:32" },
      { label: "Execution completed", status: "completed", time: "14:38" },
      { label: "Verification passed", status: "completed", time: "14:38" },
      { label: "Review started", status: "active", time: "14:40" },
      { label: "Review completed", status: "pending" },
      { label: "Next step ready", status: "pending" },
    ],
    allowedIssueIds: [],
  },

  needs_approval: {
    title: "Needs your approval",
    explanation: "A new coding task is ready to start but requires your permission before Relay can begin work.",
    badgeVariant: "warning",
    relayStatus: "warning",
    relayStatusSubtext: "Waiting for operator",
    recommendedAction: "Review and approve the next task so Relay can continue.",
    recommendedActionSubtext: "Relay is paused until you act",
    primaryCTA: { label: "Review & approve" },
    secondaryCTA: { label: "Skip this task" },
    overnightSafe: false,
    overnightReason: "Relay cannot continue without your approval for the next task.",
    progressSteps: [
      { label: "Approved", completed: false, active: true },
      { label: "Running", completed: false, active: false },
      { label: "Verifying", completed: false, active: false },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task queued", status: "completed", time: "14:30" },
      { label: "Waiting for approval", status: "active", time: "14:30" },
      { label: "Execution", status: "pending" },
      { label: "Verification", status: "pending" },
      { label: "Review", status: "pending" },
      { label: "Complete", status: "pending" },
    ],
    allowedIssueIds: ["needs_approval"],
  },

  blocked: {
    title: "Blocked",
    explanation: "The last task did not pass verification. Relay cannot continue until you choose how to resolve it.",
    badgeVariant: "danger",
    relayStatus: "danger",
    relayStatusSubtext: "Session is blocked",
    recommendedAction: "Review the failure and choose a recovery option to unblock Relay.",
    recommendedActionSubtext: "Relay is stopped until you resolve this",
    primaryCTA: { label: "See what went wrong" },
    secondaryCTA: { label: "Pause session" },
    overnightSafe: false,
    overnightReason: "The session is blocked by a failed verification and needs your input.",
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Running", completed: true, active: false },
      { label: "Verifying", completed: false, active: true },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution started", status: "completed", time: "14:32" },
      { label: "Execution completed", status: "completed", time: "14:38" },
      { label: "Verification failed", status: "failed", time: "14:39" },
      { label: "Blocked — waiting for operator", status: "active" },
    ],
    allowedIssueIds: ["review_failed"],
  },

  needs_repair: {
    title: "Needs repair",
    explanation: "The session workspace has conflicting files. Relay can't continue until this is resolved.",
    badgeVariant: "warning",
    relayStatus: "warning",
    relayStatusSubtext: "Workspace issue detected",
    recommendedAction: "Repair the workspace so Relay can resume the session.",
    recommendedActionSubtext: "Relay is paused until workspace is fixed",
    primaryCTA: { label: "Repair workspace" },
    secondaryCTA: { label: "Open session details" },
    overnightSafe: false,
    overnightReason: "The workspace has conflicts that need manual resolution.",
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Running", completed: true, active: false },
      { label: "Repairing", completed: false, active: true },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution started", status: "completed", time: "14:32" },
      { label: "Workspace conflict detected", status: "failed", time: "14:36" },
      { label: "Waiting for repair", status: "active" },
    ],
    allowedIssueIds: ["workspace_repair"],
  },

  stale: {
    title: "Run appears stalled",
    explanation: "Relay hasn't reported progress in over 15 minutes. This may be normal for complex tasks, or it may indicate a problem.",
    badgeVariant: "warning",
    relayStatus: "warning",
    relayStatusSubtext: "No progress reported recently",
    recommendedAction: "Investigate whether the run is stuck or just taking longer than expected.",
    recommendedActionSubtext: "Check if Relay needs help",
    primaryCTA: { label: "Check what's happening" },
    secondaryCTA: { label: "Pause session" },
    overnightSafe: false,
    overnightReason: "Relay hasn't reported progress and may be stuck.",
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Running", completed: false, active: true },
      { label: "Verifying", completed: false, active: false },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution started", status: "completed", time: "14:32" },
      { label: "No progress for 15+ min", status: "failed", time: "14:48" },
      { label: "Investigation needed", status: "active" },
    ],
    allowedIssueIds: ["stale_run"],
  },

  paused: {
    title: "Paused",
    explanation: "This session has been paused by the operator. Relay will not perform any work until you resume it.",
    badgeVariant: "paused",
    relayStatus: "healthy",
    relayStatusSubtext: "Paused by operator",
    recommendedAction: "Resume the session when you're ready for Relay to continue.",
    recommendedActionSubtext: "Session is safely paused",
    primaryCTA: { label: "Resume session" },
    secondaryCTA: { label: "End session" },
    overnightSafe: true,
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Paused", completed: false, active: true },
      { label: "Verifying", completed: false, active: false },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution started", status: "completed", time: "14:32" },
      { label: "Paused by operator", status: "active", time: "14:40" },
    ],
    allowedIssueIds: [],
  },

  completed: {
    title: "Completed",
    explanation: "All approved work has been completed and verified. The session is finished.",
    badgeVariant: "healthy",
    relayStatus: "healthy",
    relayStatusSubtext: "All systems operational",
    recommendedAction: "Review the completed work or start a new session.",
    recommendedActionSubtext: "Nothing more to do for this session",
    primaryCTA: { label: "Review completed work" },
    secondaryCTA: { label: "Start new session" },
    overnightSafe: true,
    progressSteps: [
      { label: "Approved", completed: true, active: false },
      { label: "Running", completed: true, active: false },
      { label: "Verifying", completed: true, active: false },
      { label: "Reviewing", completed: true, active: false },
      { label: "Complete", completed: true, active: false },
    ],
    timelineSteps: [
      { label: "Task approved", status: "completed", time: "14:32" },
      { label: "Execution completed", status: "completed", time: "14:38" },
      { label: "Verification passed", status: "completed", time: "14:38" },
      { label: "Review completed", status: "completed", time: "14:42" },
      { label: "Session complete", status: "completed", time: "14:42" },
    ],
    allowedIssueIds: [],
  },

  idle_ready: {
    title: "Ready",
    explanation: "Relay is ready and waiting. No session is currently active — start one when you're ready.",
    badgeVariant: "info",
    relayStatus: "healthy",
    relayStatusSubtext: "All systems operational",
    recommendedAction: "Start a new session when you have work for Relay.",
    recommendedActionSubtext: "Relay is idle and ready",
    primaryCTA: { label: "Start session" },
    secondaryCTA: { label: "View history" },
    overnightSafe: true,
    progressSteps: [
      { label: "Ready", completed: false, active: true },
      { label: "Running", completed: false, active: false },
      { label: "Verifying", completed: false, active: false },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "No active session", status: "active" },
    ],
    allowedIssueIds: [],
  },

  setup_required: {
    title: "Setup required",
    explanation: "Relay needs to be configured before it can start running sessions. Complete the setup checklist to get started.",
    badgeVariant: "warning",
    relayStatus: "warning",
    relayStatusSubtext: "Setup incomplete",
    recommendedAction: "Complete the setup checklist so Relay can start working.",
    recommendedActionSubtext: "Relay can't run until setup is complete",
    primaryCTA: { label: "Complete setup" },
    secondaryCTA: { label: "View requirements" },
    overnightSafe: false,
    overnightReason: "Relay is not fully configured and cannot run unattended.",
    progressSteps: [
      { label: "Setup", completed: false, active: true },
      { label: "Running", completed: false, active: false },
      { label: "Verifying", completed: false, active: false },
      { label: "Reviewing", completed: false, active: false },
      { label: "Complete", completed: false, active: false },
    ],
    timelineSteps: [
      { label: "Setup required", status: "active" },
    ],
    allowedIssueIds: ["setup_required"],
  },
};

// Issues that can appear, keyed for filtering
export const ALL_ISSUES: Record<string, Omit<IssueCard, "id" | "onAction">> = {
  needs_approval: {
    severity: "warning",
    title: "Needs your approval",
    explanation: "A new coding task is ready to start but requires your permission before Relay can begin work.",
    actionLabel: "Review & approve",
  },
  review_failed: {
    severity: "critical",
    title: "Review failed",
    explanation: "The last completed task did not pass verification. The output may contain errors that need to be addressed.",
    actionLabel: "View details",
  },
  workspace_repair: {
    severity: "warning",
    title: "Workspace needs repair",
    explanation: "The session workspace has conflicting files. Relay can't continue until this is resolved.",
    actionLabel: "Repair workspace",
  },
  stale_run: {
    severity: "info",
    title: "Run appears stalled",
    explanation: "Relay hasn't reported progress in over 15 minutes. This may be normal for complex tasks, or it may indicate a problem.",
    actionLabel: "Investigate",
  },
  setup_required: {
    severity: "warning",
    title: "Setup incomplete",
    explanation: "Some configuration steps are still needed before Relay can run autonomously.",
    actionLabel: "Complete setup",
  },
};

export interface PreflightCheck {
  id: string;
  label: string;
  passed: boolean;
  detail?: string;
}

export function getPreflightChecks(state: SessionPrimaryState): PreflightCheck[] {
  const isBlocking = ["blocked", "needs_repair", "stale", "needs_approval", "setup_required"].includes(state);
  return [
    { id: "session_configured", label: "Session configured", passed: true },
    { id: "phase_count", label: "Approved phase count set", passed: true },
    { id: "next_step_approved", label: "Next step approved", passed: state !== "needs_approval", detail: state === "needs_approval" ? "Approve the next task first" : undefined },
    { id: "executor_enabled", label: "Executor enabled", passed: true },
    { id: "reviewer_healthy", label: "Reviewer healthy", passed: state !== "blocked", detail: state === "blocked" ? "Reviewer reported a failure" : undefined },
    { id: "workspace_healthy", label: "Workspace healthy", passed: state !== "needs_repair", detail: state === "needs_repair" ? "Workspace has conflicts" : undefined },
    { id: "no_blocking_issue", label: "No blocking issues", passed: !isBlocking, detail: isBlocking ? "Resolve the current issue first" : undefined },
    { id: "no_stale_issue", label: "No stale issues", passed: state !== "stale", detail: state === "stale" ? "Investigate the stalled run" : undefined },
  ];
}
