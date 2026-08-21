import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, Mail, Plug, ShieldCheck, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getInitials } from "@/utils/validation";
import { getGoogleAccountView } from "@/services/academics.service";
import { GoogleConnectionCard } from "@/components/settings/GoogleConnectionCard";
import { mockXp } from "@/lib/mocks/gamification";

export const metadata: Metadata = { title: "Settings — StudentHub" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const fullName = user?.user_metadata?.full_name ?? "Student";

  if (!user) {
    return <p className="text-sm text-gray-500">You need to be signed in to view this page.</p>;
  }

  const account = await getGoogleAccountView(user.id);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-dark">Account settings</h2>
        <p className="mt-1 text-sm text-gray-500">Manage your profile, Google account, and security.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-brand-royal" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-royal text-xl font-semibold text-white">
              {getInitials(fullName)}
            </div>
            <div>
              <p className="font-medium text-brand-dark">{fullName}</p>
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <Mail className="h-3.5 w-3.5" /> {user?.email}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-brand-gray/40 p-3">
            <p className="text-xs font-medium text-gray-500">Gamification (FR-02 mock)</p>
            <p className="mt-1 text-sm font-semibold text-brand-dark">Level {mockXp.level} — {mockXp.total} XP · 🔥 {mockXp.streakDays}-day streak</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-brand-royal" style={{ width: `${Math.round((mockXp.total / mockXp.nextLevelXp) * 100)}%` }} />
            </div>
            <p className="mt-1 text-xs text-gray-400">{mockXp.nextLevelXp - mockXp.total} XP to Level {mockXp.level + 1} · See Achievements</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-brand-royal" /> Google
          </CardTitle>
          <CardDescription>
            Connect read-only access to your Google Calendar and Classroom to power the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleConnectionCard account={account} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-royal" /> Security
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-brand-dark">Password</p>
            <p className="text-sm text-gray-500">Last changed: unavailable</p>
          </div>
          <Link href="/change-password" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <KeyRound className="h-4 w-4" /> Change password
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}