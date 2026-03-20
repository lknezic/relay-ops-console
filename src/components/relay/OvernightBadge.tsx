import { Moon, ShieldCheck, ShieldAlert } from "lucide-react";
import { StateConfig } from "@/lib/relay-states";

interface OvernightBadgeProps {
  config: StateConfig;
  onStartOvernight: () => void;
}

export function OvernightBadge({ config, onStartOvernight }: OvernightBadgeProps) {
  const safe = config.overnightSafe;

  return (
    <button
      onClick={onStartOvernight}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-sm active:scale-[0.98] ${
        safe
          ? "bg-relay-healthy-bg/50 border-relay-healthy/15 hover:border-relay-healthy/30"
          : "bg-relay-warning-bg/50 border-relay-warning/15 hover:border-relay-warning/30"
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        safe ? "bg-relay-healthy-bg text-relay-healthy" : "bg-relay-warning-bg text-relay-warning"
      }`}>
        {safe ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2">
          <Moon className="w-3 h-3 text-muted-foreground" />
          <p className={`text-xs font-semibold ${safe ? "text-relay-healthy" : "text-relay-warning"}`}>
            {safe ? "Safe to leave running" : "Not safe to leave running"}
          </p>
        </div>
        {!safe && config.overnightReason && (
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{config.overnightReason}</p>
        )}
      </div>
    </button>
  );
}
