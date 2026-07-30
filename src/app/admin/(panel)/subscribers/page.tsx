import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/header";
import { getSession } from "@/lib/cms/auth";
import { hasPermission } from "@/lib/cms/roles";
import { listSubscribers } from "@/lib/subscribers";

export const dynamic = "force-dynamic";

export default async function SubscribersAdminPage() {
  const session = await getSession();
  if (!session || !hasPermission(session.role, "manage_subscribers")) {
    redirect("/admin");
  }

  const subscribers = await listSubscribers();

  return (
    <>
      <AdminHeader
        title="Subscribers"
        description="Newsletter signups and membership requests collected from the public site."
      />
      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">List / Plan</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3 capitalize">{s.kind}</td>
                  <td className="px-4 py-3">{s.listOrPlan}</td>
                  <td className="px-4 py-3">{s.name || s.organization || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
