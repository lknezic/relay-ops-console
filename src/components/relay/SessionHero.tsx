import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SessionHeroProps {
  sessionName: string;
  stateBadge: string;
  badgeVariant: "healthy" | "warning" | "danger" | "info" | "paused";
  explanation: string;
  progress: number;
  progressSteps: { label: string; completed: boolean; active: boolean }[];
  primaryAction: { label: string; onClick: () => void };
  secondaryAction: { label: string; onClick: () => void };
  onAdvancedDetails: () => void;
}

export function SessionHero({
  sessionName,
  stateBadge,
  badgeVariant,
  explanation,
  progressSteps,
  primaryAction,
  secondaryAction,
  onAdvancedDetails,
}: SessionHeroProps) {
  return (
    <div className="relay-card-elevated p-6 lg:p-8 flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2">
            Current Session
          </p>
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground text-balance leading-tight">
            {sessionName}
          </h1>
        </div>
        <Badge variant={badgeVariant} className="text-xs px-3 py-1.5 shrink-0">
          {stateBadge}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground text-pretty mb-8 max-w-md">
        {explanation}
      </p>

      {/* Progress timeline */}
      <div className="mb-8 flex-1">
        <div className="flex items-center gap-1">
          {progressSteps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  step.completed
                    ? "bg-relay-healthy"
                    : step.active
                    ? "bg-relay-healthy/40 animate-relay-shimmer bg-gradient-to-r from-relay-healthy/30 via-relay-healthy to-relay-healthy/30"
                    : "bg-muted"
                }`}
              />
              <span
                className={`text-[10px] font-medium leading-tight text-center ${
                  step.completed || step.active
                    ? "text-foreground"
                    : "text-muted-foreground/60"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="relay" size="lg" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
        <Button variant="relay-secondary" size="default" onClick={secondaryAction.onClick}>
          {secondaryAction.label}
        </Button>
        <button
          onClick={onAdvancedDetails}
          className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          Advanced details
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
