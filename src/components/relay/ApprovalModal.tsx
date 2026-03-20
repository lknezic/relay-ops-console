import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, FileText } from "lucide-react";

interface ApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionName: string;
  taskSummary: string;
  estimatedScope: string;
}

export function ApprovalModal({
  open,
  onOpenChange,
  sessionName,
  taskSummary,
  estimatedScope,
}: ApprovalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md relay-card-elevated border-0">
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-relay-warning-bg text-relay-warning flex items-center justify-center mb-2">
            <Shield className="w-5 h-5" />
          </div>
          <DialogTitle className="text-lg">Approve this session?</DialogTitle>
          <DialogDescription className="text-pretty">
            Relay is waiting for your go-ahead before starting work on this task.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Session</p>
            <p className="text-sm font-medium text-foreground">{sessionName}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Task Summary</p>
            <p className="text-sm text-foreground text-pretty">{taskSummary}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center gap-2 mb-1.5">
              <FileText className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Estimated Scope</p>
            </div>
            <p className="text-sm text-foreground">{estimatedScope}</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="relay-secondary" onClick={() => onOpenChange(false)}>
            Not now
          </Button>
          <Button variant="relay" onClick={() => onOpenChange(false)}>
            Approve &amp; start
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
