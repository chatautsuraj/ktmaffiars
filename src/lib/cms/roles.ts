export const ADMIN_ROLES = ["admin", "manager", "editor"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminPermission =
  | "manage_team"
  | "manage_subscribers"
  | "manage_content"
  | "manage_settings";

export interface AdminSession {
  email: string;
  role: AdminRole;
  userId: string;
}

export interface PublicAdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

const ROLE_PERMISSIONS: Record<AdminRole, readonly AdminPermission[]> = {
  admin: ["manage_team", "manage_subscribers", "manage_content", "manage_settings"],
  manager: ["manage_subscribers", "manage_content"],
  editor: ["manage_content"],
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  admin: "Admin",
  manager: "Manager",
  editor: "Editor",
};

export const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  admin: "Full access, including inviting editors and managers",
  manager: "Content plus subscribers; cannot manage team access",
  editor: "Create and edit editorial content only",
};

export function isAdminRole(value: unknown): value is AdminRole {
  return typeof value === "string" && ADMIN_ROLES.includes(value as AdminRole);
}

export function hasPermission(role: AdminRole, permission: AdminPermission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canAccessAdminPath(role: AdminRole, pathname: string): boolean {
  if (pathname.startsWith("/admin/team") || pathname.startsWith("/api/admin/team")) {
    return hasPermission(role, "manage_team");
  }
  if (pathname.startsWith("/admin/subscribers")) {
    return hasPermission(role, "manage_subscribers");
  }
  if (pathname.startsWith("/admin/autopilot") || pathname.startsWith("/api/admin/autopilot")) {
    return hasPermission(role, "manage_settings");
  }
  return true;
}
