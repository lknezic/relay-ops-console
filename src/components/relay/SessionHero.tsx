import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { OvernightBadge } from "./OvernightBadge";
import { StateConfig } from "@/lib/relay-states";

interface SessionHeroProps {
  sessionName: string;
  config: StateConfig;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onAdvancedDetails: () => void;
  onStartOvernight: () => void;
}

export function SessionHero({
  sessionName,
  config,
  onPrimaryAction,
  onSecondaryAction,
  onAdvancedDetails,
  onStartOvernight,
}: SessionHeroProps) {
  return (
    <div className="relay-card-elevated p-5 sm:p-6 lg:p-8 flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground mb-2">
            Current Session
          </p>
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground text-balance leading-tight">
            {sessionName}
          </h1>
        </div>
        <Badge variant={config.badgeVariant} className="text-xs px-3 py-1.5 shrink-0">
          {config.title}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground text-pretty mb-6 max-w-md">
        {config.explanation}
      </p>

      {/* Overnight readiness */}
      <div className="mb-6">
        <OvernightBadge config={config} onStartOvernight={onStartOvernight} />
      </div>

      {/* Progress timeline */}
      <div className="mb-8 flex-1">
        <div className="flex items-center gap-1">
          {config.progressSteps.map((step, i) => (
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
        <Button variant="relay" size="lg" onClick={onPrimaryAction}>
          {config.primaryCTA.label}
        </Button>
        <Button variant="relay-secondary" size="default" onClick={onSecondaryAction}>
          {config.secondaryCTA.label}
        </Button>
        <button
          onClick={onAdvancedDetails}
          className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          More details
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
