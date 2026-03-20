import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wrench, AlertTriangle } from "lucide-react";

interface RecoveryOption {
  label: string;
  description: string;
  risk: "safe" | "moderate" | "risky";
}

interface RecoveryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueTitle: string;
  issueExplanation: string;
  options: RecoveryOption[];
}

const riskLabels = {
  safe: { label: "Safe", className: "text-relay-healthy bg-relay-healthy-bg" },
  moderate: { label: "Moderate", className: "text-relay-warning bg-relay-warning-bg" },
  risky: { label: "Use with caution", className: "text-relay-danger bg-relay-danger-bg" },
};

export function RecoveryModal({
  open,
  onOpenChange,
  issueTitle,
  issueExplanation,
  options,
}: RecoveryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg relay-card-elevated border-0">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-relay-danger-bg text-relay-danger flex items-center justify-center mb-2">
            <Wrench className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg">{issueTitle}</DialogTitle>
          <DialogDescription className="text-pretty">
            {issueExplanation}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {options.map((option, i) => {
            const risk = riskLabels[option.risk];
            return (
              <button
                key={i}
                className="w-full p-4 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors text-left group active:scale-[0.98]"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-foreground">
                    {option.label}
                  </p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${risk.className}`}>
                    {risk.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-pretty">{option.description}</p>
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="relay-ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
