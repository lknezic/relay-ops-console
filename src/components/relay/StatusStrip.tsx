import { Shield, Activity, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StateConfig } from "@/lib/relay-states";

interface StatusStripProps {
  config: StateConfig;
}

const relayStatusVisuals = {
  healthy: {
    label: "Healthy",
    dotClass: "bg-relay-healthy animate-relay-pulse",
    bgClass: "bg-relay-healthy-bg",
    textClass: "text-relay-healthy",
  },
  warning: {
    label: "Needs Attention",
    dotClass: "bg-relay-warning animate-relay-pulse",
    bgClass: "bg-relay-warning-bg",
    textClass: "text-relay-warning",
  },
  danger: {
    label: "Action Required",
    dotClass: "bg-relay-danger animate-relay-pulse",
    bgClass: "bg-relay-danger-bg",
    textClass: "text-relay-danger",
  },
};

export function StatusStrip({ config }: StatusStripProps) {
  const visuals = relayStatusVisuals[config.relayStatus];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 stagger-children">
      {/* Relay Status */}
      <div className="relay-card-elevated min-w-0 p-5">
        <div className="flex items-center gap-3 mb-3 min-w-0">
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${visuals.dotClass}`} />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground break-words">
            Relay Status
          </span>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl shrink-0 ${visuals.bgClass} ${visuals.textClass} flex items-center justify-center`}>
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className={`text-lg font-semibold break-words ${visuals.textClass}`}>{visuals.label}</p>
            <p className="text-xs text-muted-foreground break-words">{config.relayStatusSubtext}</p>
          </div>
        </div>
      </div>

      {/* Active Session */}
      <div className="relay-card-elevated min-w-0 p-5">
        <div className="flex items-center gap-3 mb-3 min-w-0">
          <Activity className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground break-words">
            Active Session
          </span>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          <Badge variant={config.badgeVariant} className="max-w-full text-xs px-3 py-1 break-words">
            {config.title}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2 break-words">{config.explanation.split('.')[0]}</p>
      </div>

      {/* Recommended Action */}
      <div className="relay-card-elevated min-w-0 p-5">
        <div className="flex items-center gap-3 mb-3 min-w-0">
          <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground break-words">
            Recommended Action
          </span>
        </div>
        <p className="text-sm font-medium text-foreground break-words">{config.recommendedAction}</p>
        <p className="text-xs text-muted-foreground mt-1 break-words">{config.recommendedActionSubtext}</p>
      </div>
    </div>
  );
}
