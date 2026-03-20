import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DiagnosticsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiagnosticsDrawer({ open, onOpenChange }: DiagnosticsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-full overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Session Details</SheetTitle>
          <SheetDescription>
            Technical information for troubleshooting. Most operators won't need this.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="diagnostics" className="w-full">
          <TabsList className="w-full bg-muted mb-4">
            <TabsTrigger value="diagnostics" className="flex-1 text-xs">Diagnostics</TabsTrigger>
            <TabsTrigger value="recovery" className="flex-1 text-xs">Recovery Tools</TabsTrigger>
            <TabsTrigger value="audit" className="flex-1 text-xs">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnostics" className="space-y-4">
            <DiagnosticRow label="Session ID" value="sess_4f8a2b1c" />
            <DiagnosticRow label="Runner Status" value="Active — pid 48291" />
            <DiagnosticRow label="Last Heartbeat" value="2 seconds ago" />
            <DiagnosticRow label="Worktree" value="/var/relay/work/sess_4f8a2b1c" />
            <DiagnosticRow label="Execution Phase" value="3 of 5 approved" />
            <DiagnosticRow label="Lock Status" value="Held — single runner" />
            <DiagnosticRow label="Memory Usage" value="412 MB" />
            <DiagnosticRow label="Uptime" value="1h 23m" />
          </TabsContent>

          <TabsContent value="recovery" className="space-y-3">
            <RecoveryTool
              label="Force release lock"
              description="Releases the session lock so a new runner can claim it. Use if the current runner is confirmed dead."
              risk="Moderate — may cause duplicate work if runner is still alive"
            />
            <RecoveryTool
              label="Reset workspace"
              description="Deletes the worktree and recreates it from the last clean state. All uncommitted work will be lost."
              risk="Destructive — uncommitted changes will be permanently deleted"
            />
            <RecoveryTool
              label="Force re-review"
              description="Requeues the current output for review, discarding the previous review result."
              risk="Safe — no data is lost"
            />
            <RecoveryTool
              label="Restart session"
              description="Stops the current session and starts a fresh one with the same task configuration."
              risk="Moderate — current progress will be abandoned"
            />
          </TabsContent>

          <TabsContent value="audit" className="space-y-3">
            <AuditEntry time="14:32:01" event="Session started by operator (maria@acme.co)" />
            <AuditEntry time="14:32:04" event="Runner claimed session — pid 48291" />
            <AuditEntry time="14:33:18" event="Execution phase 1 completed" />
            <AuditEntry time="14:35:42" event="Execution phase 2 completed" />
            <AuditEntry time="14:38:01" event="Verification passed (phase 2)" />
            <AuditEntry time="14:38:05" event="Review requested" />
            <AuditEntry time="14:40:12" event="Review approved — reviewer: auto-reviewer" />
            <AuditEntry time="14:40:15" event="Execution phase 3 started" />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

function DiagnosticRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-mono text-foreground">{value}</span>
    </div>
  );
}

function RecoveryTool({
  label,
  description,
  risk,
}: {
  label: string;
  description: string;
  risk: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
      <p className="text-sm font-medium text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground mb-2 text-pretty">{description}</p>
      <p className="text-[10px] text-relay-warning font-medium">{risk}</p>
    </div>
  );
}

function AuditEntry({ time, event }: { time: string; event: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-border/40 last:border-0">
      <span className="text-[10px] font-mono text-muted-foreground shrink-0 mt-0.5">{time}</span>
      <p className="text-xs text-foreground text-pretty">{event}</p>
    </div>
  );
}
