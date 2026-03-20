import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Moon, ArrowRight, ArrowLeft, Shield } from "lucide-react";
import { PreflightCheck, SessionPrimaryState, getPreflightChecks, STATE_CONFIGS } from "@/lib/relay-states";

interface OvernightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionState: SessionPrimaryState;
  sessionName: string;
}

const STEPS = ["Confirm session", "Confirm phases", "Approve next step", "Preflight checks", "Result"];

export function OvernightModal({ open, onOpenChange, sessionState, sessionName }: OvernightModalProps) {
  const [step, setStep] = useState(0);
  const config = STATE_CONFIGS[sessionState];
  const checks = getPreflightChecks(sessionState);
  const allPassed = checks.every((c) => c.passed);

  const handleClose = () => {
    setStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
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
        <div className="flex gap-1 my-4">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < step ? "bg-relay-healthy" : i === step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="min-h-[180px]">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-foreground font-medium">Confirm this is the session you want to run overnight:</p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm font-semibold text-foreground mb-1">{sessionName}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={config.badgeVariant} className="text-xs">{config.title}</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Relay will continue working autonomously through all approved phases.</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-foreground font-medium">Confirm the approved phase count:</p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-2xl font-semibold text-foreground mb-1">5 phases</p>
                <p className="text-xs text-muted-foreground">Relay will complete up to 5 phases before stopping and waiting for new approval.</p>
              </div>
              <p className="text-xs text-muted-foreground">You can adjust this in session settings if needed.</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-foreground font-medium">Is the next step approved?</p>
              <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-start gap-3">
                {sessionState !== "needs_approval" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-relay-healthy shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Next step is approved</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Relay can proceed without waiting.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-relay-danger shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Next step needs approval</p>
                      <p className="text-xs text-muted-foreground mt-0.5">You'll need to approve before Relay can run overnight.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-foreground font-medium">Running preflight checks…</p>
              <div className="space-y-2">
                {checks.map((check) => (
                  <PreflightRow key={check.id} check={check} />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {allPassed ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-2xl bg-relay-healthy-bg text-relay-healthy flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7" />
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1">Safe to leave running</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    All preflight checks passed. Relay will work autonomously through approved phases overnight.
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-2xl bg-relay-warning-bg text-relay-warning flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-7 h-7" />
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-1">Not safe to leave running</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">
                    Some issues need to be resolved before Relay can run unattended overnight.
                  </p>
                  <div className="text-left space-y-2">
                    {checks.filter((c) => !c.passed).map((check) => (
                      <div key={check.id} className="flex items-start gap-2 p-3 rounded-lg bg-relay-warning-bg/50 border border-relay-warning/10">
                        <XCircle className="w-4 h-4 text-relay-warning shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{check.label}</p>
                          {check.detail && <p className="text-xs text-muted-foreground">{check.detail}</p>}
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
        <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
          {step > 0 ? (
            <Button variant="relay-ghost" size="sm" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button variant="relay" size="sm" onClick={() => setStep(step + 1)}>
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button variant={allPassed ? "relay" : "relay-secondary"} size="sm" onClick={handleClose}>
              {allPassed ? "Confirm & close" : "Close"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreflightRow({ check }: { check: PreflightCheck }) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/30">
      {check.passed ? (
        <CheckCircle2 className="w-4 h-4 text-relay-healthy shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-relay-danger shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{check.label}</p>
        {check.detail && <p className="text-xs text-muted-foreground">{check.detail}</p>}
      </div>
      <Badge variant={check.passed ? "healthy" : "danger"} className="text-[10px] px-2 py-0.5">
        {check.passed ? "Pass" : "Fail"}
      </Badge>
    </div>
  );
}
