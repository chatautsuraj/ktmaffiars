import { AdminSidebar } from "@/components/admin/sidebar";
import { CMS_READ_ONLY_MESSAGE, isBlobConfigured, isServerlessHost } from "@/lib/cms/runtime";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const readOnly = isServerlessHost() && !isBlobConfigured();

  return (
    <div className="flex flex-1 min-h-0">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        {readOnly ? (
          <div className="border-b border-gold/40 bg-gold/10 px-8 py-3 text-sm text-foreground">
            <strong className="font-medium">Read-only on Vercel.</strong> {CMS_READ_ONLY_MESSAGE}
          </div>
        ) : null}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
