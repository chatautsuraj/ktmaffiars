import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { TeamAccessPanel } from "@/components/admin/team-access-panel";
import { getSession } from "@/lib/cms/auth";
import { hasPermission } from "@/lib/cms/roles";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const session = await getSession();
  if (!session || !hasPermission(session.role, "manage_team")) {
    redirect("/admin");
  }

  return (
    <>
      <AdminHeader
        title="Team access"
        description="Invite editors and managers, set roles, and revoke CMS access."
      />
      <TeamAccessPanel />
    </>
  );
}
