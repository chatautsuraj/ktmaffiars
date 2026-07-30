"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/admin/form-fields";
import {
  ADMIN_ROLES,
  ROLE_DESCRIPTIONS,
  ROLE_LABELS,
  type AdminRole,
  type PublicAdminUser,
} from "@/lib/cms/roles";

export function TeamAccessPanel() {
  const [users, setUsers] = useState<PublicAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("editor");
  const [password, setPassword] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/team", { credentials: "same-origin" });
      const data = await res.json().catch(() => ([]));
      if (!res.ok) {
        setError(data.error || "Could not load team.");
        setUsers([]);
        return;
      }
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setError("Could not load team.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const invite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not invite team member.");
        return;
      }
      setName("");
      setEmail("");
      setPassword("");
      setRole("editor");
      setMessage(`Access granted to ${data.email} as ${ROLE_LABELS[data.role as AdminRole]}.`);
      await load();
    } catch {
      setError("Could not invite team member.");
    } finally {
      setSaving(false);
    }
  };

  const setActive = async (user: PublicAdminUser, active: boolean) => {
    setError("");
    const res = await fetch(`/api/admin/team/${user.id}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Update failed.");
      return;
    }
    await load();
  };

  const changeRole = async (user: PublicAdminUser, nextRole: AdminRole) => {
    setError("");
    const res = await fetch(`/api/admin/team/${user.id}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: nextRole }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Update failed.");
      return;
    }
    await load();
  };

  const remove = async (user: PublicAdminUser) => {
    if (!window.confirm(`Remove access for ${user.email}?`)) return;
    setError("");
    const res = await fetch(`/api/admin/team/${user.id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "Could not remove access.");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-10">
      <section className="border border-border bg-card p-6 space-y-5 max-w-xl">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-sm bg-navy/10 p-2">
            <Shield className="h-4 w-4 text-navy" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold">Invite team member</h2>
            <p className="text-sm text-muted mt-1">
              They sign in at /admin/login with the email and temporary password you set.
            </p>
          </div>
        </div>

        <form onSubmit={invite} className="space-y-4">
          <FormField label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </FormField>
          <FormField label="Role">
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
            >
              {ADMIN_ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]} — {ROLE_DESCRIPTIONS[r]}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Temporary password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={10}
              autoComplete="new-password"
              placeholder="At least 10 characters"
            />
          </FormField>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}

          <Button type="submit" variant="gold" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {saving ? "Granting access…" : "Grant access"}
          </Button>
        </form>
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold mb-4">Team access</h2>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No invited editors or managers yet. The env bootstrap admin still works.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t border-border">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <select
                        className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                        value={user.role}
                        onChange={(e) => changeRole(user, e.target.value as AdminRole)}
                      >
                        {ADMIN_ROLES.map((r) => (
                          <option key={r} value={r}>
                            {ROLE_LABELS[r]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="underline-offset-2 hover:underline"
                        onClick={() => setActive(user, !user.active)}
                      >
                        {user.active ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => remove(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted mt-3">
          Bootstrap admin from environment variables is not listed here and always has full admin
          access.
        </p>
      </section>
    </div>
  );
}
