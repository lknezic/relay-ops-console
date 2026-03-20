import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Moon, ArrowRight, ArrowLeft, Shield, Minus, Plus } from "lucide-react";
import { PreflightCheck, SessionPrimaryState, getPreflightChecks, STATE_CONFIGS } from "@/lib/relay-states";

interface OvernightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionState: SessionPrimaryState;
  sessionName: string;
}

const STEPS = ["Confirm session", "Approve next step", "Preflight checks", "Result"];

export function OvernightModal({ open, onOpenChange, sessionState, sessionName }: OvernightModalProps) {
  const [step, setStep] = useState(0);
  const [phaseCount, setPhaseCount] = useState(5);
  const config = STATE_CONFIGS[sessionState];
  const checks = getPreflightChecks(sessionState);
  const allPassed = checks.every((c) => c.passed);
  const failedChecks = checks.filter((c) => !c.passed);

  const handleClose = () => {
    setStep(0);
    setPhaseCount(5);
    onOpenChange(false);
  };

  const nextStepApproved = sessionState !== "needs_approval";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Moon className="w-4 h-4 text-muted-foreground" />
            <DialogTitle className="text-base">Start overnight run</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </DialogDescription>
        </DialogHeader>

        {/* Step progress */}
        <div className="flex gap-1 my-3">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`h-1.5 w-full rounded-full transition-colors duration-300 ${
                  i < step
                    ? "bg-relay-healthy"
                    : i === step
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
              <span className={`text-[9px] font-medium leading-tight text-center transition-colors ${
                i <= step ? "text-foreground" : "text-muted-foreground/50"
              }`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="min-h-[220px] flex flex-col">
          {/* Step 0: Confirm session + phase limit */}
          {step === 0 && (
            <div className="space-y-4 flex-1">
              <p className="text-sm text-foreground font-medium">
                Which session should run overnight?
              </p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm font-semibold text-foreground mb-2">{sessionName}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={config.badgeVariant} className="text-xs">
                    {config.title}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  This session will continue running autonomously while you're away.
                </p>
              </div>

              {/* Phase limit — integrated into step 0 */}
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm text-foreground font-medium mb-3">
                  How many phases should Relay complete?
                </p>
                <div className="flex items-center justify-center gap-6 mb-3">
                  <button
                    onClick={() => setPhaseCount(Math.max(1, phaseCount - 1))}
                    className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95"
                    disabled={phaseCount <= 1}
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <div className="text-center">
                    <p className="text-3xl font-semibold text-foreground tabular-nums">{phaseCount}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {phaseCount === 1 ? "phase" : "phases"}
                    </p>
                  </div>
                  <button
                    onClick={() => setPhaseCount(Math.min(20, phaseCount + 1))}
                    className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors active:scale-95"
                    disabled={phaseCount >= 20}
                  >
                    <Plus className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground text-center text-pretty">
                  A lower number is safer if you're unsure. You can always approve more later.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Confirm next step approved */}
          {step === 1 && (
            <div className="space-y-4 flex-1">
              <p className="text-sm text-foreground font-medium">
                Is the next step approved and ready to go?
              </p>
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                nextStepApproved
                  ? "bg-relay-healthy-bg/30 border-relay-healthy/15"
                  : "bg-relay-warning-bg/30 border-relay-warning/15"
              }`}>
                {nextStepApproved ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-relay-healthy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Next step is approved</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Relay can begin immediately and proceed through all {phaseCount} approved phases without waiting.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-relay-warning shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Next step needs your approval</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Relay will stop and wait until you approve the next task. You should approve it before leaving, or the overnight run won't start.
                      </p>
                    </div>
                  </>
                )}
              </div>
              {!nextStepApproved && (
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <p className="text-xs font-medium text-foreground mb-1">What you should do:</p>
                  <p className="text-xs text-muted-foreground">
                    Go back to the main console and approve the pending task, then return here to continue the overnight setup.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Preflight checks */}
          {step === 2 && (
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground font-medium">Preflight checks</p>
                <Badge
                  variant={allPassed ? "healthy" : "danger"}
                  className="text-[10px] px-2 py-0.5"
                >
                  {checks.filter(c => c.passed).length} of {checks.length} passed
                </Badge>
              </div>
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto">
                {checks.map((check) => (
                  <PreflightRow key={check.id} check={check} />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && (
            <div className="flex-1 flex flex-col">
              {allPassed ? (
                <div className="text-center py-6 flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-relay-healthy-bg text-relay-healthy flex items-center justify-center mx-auto mb-5">
                    <Shield className="w-8 h-8" />
                  </div>
                  <Badge variant="healthy" className="text-xs px-3 py-1 mb-3">
                    Safe to leave running
                  </Badge>
                  <p className="text-lg font-semibold text-foreground mb-2">You're all set</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto text-pretty">
                    All {checks.length} preflight checks passed. Relay will work through {phaseCount} {phaseCount === 1 ? "phase" : "phases"} autonomously and stop when finished.
                  </p>
                  <div className="mt-5 p-3 rounded-xl bg-muted/30 border border-border max-w-xs">
                    <p className="text-xs text-muted-foreground text-center text-pretty">
                      If anything goes wrong, Relay will pause and wait for you to return. No work will be lost.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-4 flex-1">
                  <div className="text-center mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-relay-warning-bg text-relay-warning flex items-center justify-center mx-auto mb-4">
                      <XCircle className="w-8 h-8" />
                    </div>
                    <Badge variant="danger" className="text-xs px-3 py-1 mb-3">
                      Not safe to leave running
                    </Badge>
                    <p className="text-lg font-semibold text-foreground mb-1">
                      {failedChecks.length === 1 ? "1 issue" : `${failedChecks.length} issues`} to fix first
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto text-pretty">
                      Resolve {failedChecks.length === 1 ? "this issue" : "these issues"} before leaving Relay unattended.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {failedChecks.map((check) => (
                      <div
                        key={check.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-relay-warning-bg/30 border border-relay-warning/10"
                      >
                        <XCircle className="w-4 h-4 text-relay-warning shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{check.label}</p>
                          {check.detail && (
                            <p className="text-xs text-muted-foreground mt-0.5">{check.detail}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
          {step > 0 ? (
            <Button variant="relay-ghost" size="sm" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
          ) : (
            <Button variant="relay-ghost" size="sm" onClick={handleClose}>
              Cancel
            </Button>
          )}

          {step < 3 ? (
            <Button variant="relay" size="sm" onClick={() => setStep(step + 1)}>
              {step === 2 ? "See results" : "Continue"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              variant={allPassed ? "relay" : "relay-secondary"}
              size="sm"
              onClick={handleClose}
            >
              {allPassed ? "Confirm & start overnight" : "Close & fix issues"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreflightRow({ check }: { check: PreflightCheck }) {
  return (
    <div className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-colors ${
      check.passed ? "bg-muted/30" : "bg-relay-warning-bg/20"
    }`}>
      {check.passed ? (
        <CheckCircle2 className="w-4 h-4 text-relay-healthy shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-relay-danger shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${check.passed ? "text-foreground" : "text-foreground font-medium"}`}>
          {check.label}
        </p>
        {check.detail && (
          <p className="text-xs text-muted-foreground mt-0.5">{check.detail}</p>
        )}
      </div>
      <Badge
        variant={check.passed ? "healthy" : "danger"}
        className="text-[10px] px-2 py-0.5 shrink-0"
      >
        {check.passed ? "Pass" : "Fail"}
      </Badge>
    </div>
  );
}
