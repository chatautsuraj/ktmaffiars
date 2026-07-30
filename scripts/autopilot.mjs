#!/usr/bin/env node
console.error(
  "Autopilot is halted for this deployment. Manual CMS publishing is unchanged.\n" +
    "To re-enable later: set AUTOPILOT_HALTED=false and flip the halt flag in src/lib/autopilot/halt.ts"
);
process.exit(1);
