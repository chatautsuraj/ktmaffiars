import { AdminHeader } from "@/components/admin/header";
import { AUTOPILOT_HALTED_MESSAGE } from "@/lib/autopilot/halt";

export const dynamic = "force-dynamic";

export default function AutopilotPage() {
  return (
    <>
      <AdminHeader
        title="Autopilot"
        description="Automated news ingestion is paused for this deployment."
      />
      <div className="max-w-2xl p-6 border border-border bg-secondary/30 space-y-3">
        <p className="text-sm font-medium">Autopilot is halted</p>
        <p className="text-sm text-muted leading-relaxed">{AUTOPILOT_HALTED_MESSAGE}</p>
        <p className="text-sm text-muted leading-relaxed">
          Use the Articles, Categories, and other CMS sections to publish manually. To re-enable
          automation later, set <code className="text-xs bg-light-gray px-1">AUTOPILOT_HALTED=false</code>{" "}
          and flip the halt flag in <code className="text-xs bg-light-gray px-1">src/lib/autopilot/halt.ts</code>.
        </p>
      </div>
    </>
  );
}
