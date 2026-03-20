import { Check, Circle, Loader2, Pause, XCircle } from "lucide-react";

interface TimelineStep {
  label: string;
  status: "completed" | "active" | "pending" | "failed" | "paused";
  time?: string;
}

interface SessionTimelineProps {
  steps: TimelineStep[];
}

const stepIcons = {
  completed: <Check className="w-3.5 h-3.5" />,
  active: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  pending: <Circle className="w-3 h-3" />,
  failed: <XCircle className="w-3.5 h-3.5" />,
  paused: <Pause className="w-3.5 h-3.5" />,
};

const stepStyles = {
  completed: {
    dot: "bg-relay-healthy text-primary-foreground",
    line: "bg-relay-healthy",
    text: "text-foreground",
  },
  active: {
    dot: "bg-relay-healthy/20 text-relay-healthy border-2 border-relay-healthy",
    line: "bg-muted",
    text: "text-foreground font-medium",
  },
  pending: {
    dot: "bg-muted text-muted-foreground/40",
    line: "bg-muted",
    text: "text-muted-foreground/60",
  },
  failed: {
    dot: "bg-relay-danger text-primary-foreground",
    line: "bg-relay-danger/30",
    text: "text-relay-danger font-medium",
  },
  paused: {
    dot: "bg-relay-paused text-primary-foreground",
    line: "bg-relay-paused/30",
    text: "text-relay-paused font-medium",
  },
};

export function SessionTimeline({ steps }: SessionTimelineProps) {
  return (
    <div className="relay-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-6">Session Timeline</h2>
      <div className="space-y-0">
        {steps.map((step, i) => {
          const style = stepStyles[step.status];
          const isLast = i === steps.length - 1;
          return (
            <div key={i} className="flex gap-3">
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full ${style.dot} flex items-center justify-center shrink-0`}>
                  {stepIcons[step.status]}
                </div>
                {!isLast && (
                  <div className={`w-px flex-1 min-h-[24px] ${style.line}`} />
                )}
              </div>
              {/* Content */}
              <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                <p className={`text-sm ${style.text}`}>{step.label}</p>
                {step.time && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{step.time}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
