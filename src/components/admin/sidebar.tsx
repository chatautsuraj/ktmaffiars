"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Globe,
  Building2,
  UserCircle,
  Landmark,
  Calendar,
  Mic,
  Video,
  BookOpen,
  Share2,
  LogOut,
  ExternalLink,
  Mail,
  Shield,
} from "lucide-react";
import { CMS_COLLECTIONS, COLLECTION_LABELS } from "@/lib/cms/collections";
import { hasPermission, ROLE_LABELS, type AdminRole } from "@/lib/cms/roles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  articles: FileText,
  categories: FolderOpen,
  authors: Users,
  countries: Globe,
  embassies: Building2,
  ambassadors: UserCircle,
  organizations: Landmark,
  events: Calendar,
  podcasts: Mic,
  videos: Video,
  "social-videos": Share2,
  "magazine-issues": BookOpen,
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<AdminRole | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/auth/me", { credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (cancelled || !data) return;
        setRole(data.role as AdminRole);
        setEmail(data.email as string);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const canSubscribers = !role || hasPermission(role, "manage_subscribers");
  const canTeam = !role || hasPermission(role, "manage_team");

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-navy text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="font-serif text-xl font-bold hover:text-gold transition-colors">
          KTM Affairs
        </Link>
        <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">Editorial Panel</p>
        {email ? (
          <p className="text-xs text-white/40 mt-3 truncate" title={email}>
            {email}
            {role ? ` · ${ROLE_LABELS[role]}` : ""}
          </p>
        ) : null}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors",
            pathname === "/admin" ? "bg-gold/20 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>

        <p className="px-3 pt-4 pb-2 text-[10px] uppercase tracking-widest text-white/40">Content</p>
        {CMS_COLLECTIONS.map((collection) => {
          const Icon = ICONS[collection] || FileText;
          const href = `/admin/${collection}`;
          const active = pathname.startsWith(href);
          return (
            <Link
              key={collection}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors",
                active ? "bg-gold/20 text-gold" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {COLLECTION_LABELS[collection]}
            </Link>
          );
        })}

        {(canSubscribers || canTeam) && (
          <p className="px-3 pt-4 pb-2 text-[10px] uppercase tracking-widest text-white/40">
            Workspace
          </p>
        )}
        {canSubscribers ? (
          <Link
            href="/admin/subscribers"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors",
              pathname.startsWith("/admin/subscribers")
                ? "bg-gold/20 text-gold"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Mail className="h-4 w-4" />
            Subscribers
          </Link>
        ) : null}
        {canTeam ? (
          <Link
            href="/admin/team"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors",
              pathname.startsWith("/admin/team")
                ? "bg-gold/20 text-gold"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Shield className="h-4 w-4" />
            Team access
          </Link>
        ) : null}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Button variant="ghost" asChild className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5">
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Site
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
