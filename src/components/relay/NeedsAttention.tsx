import { AlertTriangle, XCircle, Wrench, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface IssueCard {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  explanation: string;
  actionLabel: string;
  onAction: () => void;
}

interface NeedsAttentionProps {
  issues: IssueCard[];
}

const severityConfig = {
  critical: {
    icon: <XCircle className="w-4 h-4" />,
    dotClass: "bg-relay-danger",
    borderClass: "border-l-relay-danger",
    iconBg: "bg-relay-danger-bg text-relay-danger",
    label: "Critical",
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4" />,
    dotClass: "bg-relay-warning",
    borderClass: "border-l-relay-warning",
    iconBg: "bg-relay-warning-bg text-relay-warning",
    label: "Warning",
  },
  info: {
    icon: <Clock className="w-4 h-4" />,
    dotClass: "bg-relay-info",
    borderClass: "border-l-relay-info",
    iconBg: "bg-relay-info-bg text-relay-info",
    label: "Info",
  },
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-relay-healthy-bg text-relay-healthy flex items-center justify-center mb-4">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">All clear</p>
      <p className="text-xs text-muted-foreground max-w-[200px]">
        Nothing needs your attention right now. Relay is operating normally.
      </p>
    </div>
  );
}

export function NeedsAttention({ issues }: NeedsAttentionProps) {
  return (
    <div className="relay-card-elevated p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Needs Attention</h2>
        </div>
        {issues.length > 0 && (
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {issues.length}
          </span>
        )}
      </div>

      {issues.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto stagger-children">
          {issues.map((issue) => {
            const config = severityConfig[issue.severity];
            return (
              <div
                key={issue.id}
                className={`p-4 rounded-xl bg-muted/40 border-l-[3px] ${config.borderClass}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg ${config.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{issue.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-pretty mb-3">
                      {issue.explanation}
                    </p>
                    <Button
                      variant={issue.severity === "critical" ? "relay-danger" : "relay-secondary"}
                      size="sm"
                      onClick={issue.onAction}
                      className="text-xs"
                    >
                      {issue.actionLabel}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
