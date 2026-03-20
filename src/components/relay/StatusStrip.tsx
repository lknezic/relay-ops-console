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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 stagger-children">
      {/* Relay Status */}
      <div className="relay-card-elevated p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-2.5 h-2.5 rounded-full ${visuals.dotClass}`} />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Relay Status
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${visuals.bgClass} ${visuals.textClass} flex items-center justify-center`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-lg font-semibold ${visuals.textClass}`}>{visuals.label}</p>
            <p className="text-xs text-muted-foreground">{config.relayStatusSubtext}</p>
          </div>
        </div>
      </div>

      {/* Active Session */}
      <div className="relay-card-elevated p-5">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Active Session
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={config.badgeVariant} className="text-xs px-3 py-1">
            {config.title}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{config.explanation.split('.')[0]}</p>
      </div>

      {/* Recommended Action */}
      <div className="relay-card-elevated p-5">
        <div className="flex items-center gap-3 mb-3">
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Recommended Action
          </span>
        </div>
        <p className="text-sm font-medium text-foreground">{config.recommendedAction}</p>
        <p className="text-xs text-muted-foreground mt-1">{config.recommendedActionSubtext}</p>
      </div>
    </div>
  );
}
