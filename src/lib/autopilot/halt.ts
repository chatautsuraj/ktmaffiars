/**
 * Hard halt for Autopilot. While true, all ingestion (manual Run now + cron)
 * is refused. Flip this to false (or set AUTOPILOT_HALTED=false in the env)
 * when you want to turn automation back on.
 */
export const AUTOPILOT_HALTED = true;

export function isAutopilotHalted(): boolean {
  const override = process.env.AUTOPILOT_HALTED?.trim().toLowerCase();
  if (override === "false" || override === "0") return false;
  if (override === "true" || override === "1") return true;
  return AUTOPILOT_HALTED;
}

export const AUTOPILOT_HALTED_MESSAGE =
  "Autopilot is halted for this deployment. Manual publishing in the CMS is unchanged.";
