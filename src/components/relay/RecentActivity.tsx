import { CheckCircle2, AlertTriangle, Info, ArrowRight, Pause, Play } from "lucide-react";

interface ActivityEvent {
  id: string;
  type: "success" | "warning" | "info" | "action" | "pause" | "resume";
  message: string;
  time: string;
}

interface RecentActivityProps {
  events: ActivityEvent[];
}

const eventConfig = {
  success: {
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    color: "text-relay-healthy",
    bg: "bg-relay-healthy-bg",
  },
  warning: {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    color: "text-relay-warning",
    bg: "bg-relay-warning-bg",
  },
  info: {
    icon: <Info className="w-3.5 h-3.5" />,
    color: "text-relay-info",
    bg: "bg-relay-info-bg",
  },
  action: {
    icon: <ArrowRight className="w-3.5 h-3.5" />,
    color: "text-foreground",
    bg: "bg-muted",
  },
  pause: {
    icon: <Pause className="w-3.5 h-3.5" />,
    color: "text-relay-paused",
    bg: "bg-relay-paused-bg",
  },
  resume: {
    icon: <Play className="w-3.5 h-3.5" />,
    color: "text-relay-healthy",
    bg: "bg-relay-healthy-bg",
  },
};

export function RecentActivity({ events }: RecentActivityProps) {
  return (
    <div className="relay-card p-6">
      <h2 className="text-sm font-semibold text-foreground mb-5">Recent Activity</h2>
      <div className="space-y-3">
        {events.map((event) => {
          const config = eventConfig[event.type];
          return (
            <div key={event.id} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-lg ${config.bg} ${config.color} flex items-center justify-center shrink-0 mt-0.5`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground text-pretty">{event.message}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
