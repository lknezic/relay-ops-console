import { Shield, Activity, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StatusStripProps {
  relayStatus: "healthy" | "warning" | "danger";
  sessionState: string;
  recommendedAction: string;
  sessionBadgeVariant: "healthy" | "warning" | "danger" | "info" | "paused";
}

const statusConfig = {
  healthy: {
    label: "Healthy",
    icon: <Shield className="w-5 h-5" />,
    dotClass: "bg-relay-healthy animate-relay-pulse",
    bgClass: "bg-relay-healthy-bg",
    textClass: "text-relay-healthy",
  },
  warning: {
    label: "Needs Attention",
    icon: <Shield className="w-5 h-5" />,
    dotClass: "bg-relay-warning animate-relay-pulse",
    bgClass: "bg-relay-warning-bg",
    textClass: "text-relay-warning",
  },
  danger: {
    label: "Action Required",
    icon: <Shield className="w-5 h-5" />,
    dotClass: "bg-relay-danger animate-relay-pulse",
    bgClass: "bg-relay-danger-bg",
    textClass: "text-relay-danger",
  },
};

export function StatusStrip({
  relayStatus,
  sessionState,
  recommendedAction,
  sessionBadgeVariant,
}: StatusStripProps) {
  const config = statusConfig[relayStatus];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
      {/* Relay Status */}
      <div className="relay-card-elevated p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-2.5 h-2.5 rounded-full ${config.dotClass}`} />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Relay Status
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${config.bgClass} ${config.textClass} flex items-center justify-center`}>
            {config.icon}
          </div>
          <div>
            <p className={`text-lg font-semibold ${config.textClass}`}>{config.label}</p>
            <p className="text-xs text-muted-foreground">All systems operational</p>
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
          <Badge variant={sessionBadgeVariant} className="text-xs px-3 py-1">
            {sessionState}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Session is progressing normally</p>
      </div>

      {/* Recommended Action */}
      <div className="relay-card-elevated p-5">
        <div className="flex items-center gap-3 mb-3">
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Recommended Action
          </span>
        </div>
        <p className="text-sm font-medium text-foreground">{recommendedAction}</p>
        <p className="text-xs text-muted-foreground mt-1">No operator action needed right now</p>
      </div>
    </div>
  );
}
