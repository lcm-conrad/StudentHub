"use client";
import * as React from "react";
import { Heart, Send, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockMoodEntries, WELLNESS_TIPS, type MoodEntry } from "@/lib/mocks/wellness";
import { useToast } from "@/hooks/useToast";

const MOODS = [
  { score: 1, emoji: "😣", label: "Awful" },
  { score: 2, emoji: "😕", label: "Low" },
  { score: 3, emoji: "😐", label: "Okay" },
  { score: 4, emoji: "🙂", label: "Good" },
  { score: 5, emoji: "😄", label: "Great" },
];

export function MoodCheckIn() {
  const { toast } = useToast();
  const [score, setScore] = React.useState<number | null>(null);
  const [journal, setJournal] = React.useState("");
  const [entries, setEntries] = React.useState<MoodEntry[]>(mockMoodEntries);
  const [tipIdx] = React.useState(() => Math.floor(Math.random() * WELLNESS_TIPS.length));
  const showNudge = entries.length > 0 && entries[0].score <= 2;

  const submit = () => {
    if (!score) { toast({ title: "Pick a mood 1–5", variant: "error" }); return; }
    const e: MoodEntry = { id: `m${Date.now()}`, date: new Date().toISOString().slice(0, 10), score, journal };
    setEntries((prev) => [e, ...prev]);
    toast({ title: "Mood logged (mock)", description: `Score ${score} saved`, variant: "success" });
    setScore(null); setJournal("");
  };

  return (
    <div className="space-y-6">
      {showNudge && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-start gap-3 py-4">
            <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>
              <p className="text-sm font-medium text-amber-900">Wellness nudge — high workload detected</p>
              <p className="text-sm text-amber-800">{WELLNESS_TIPS[tipIdx]}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-red-500" /> Daily mood & journal</CardTitle>
          <CardDescription>Score 1–5 + journal entry. AI recommends breaks when workload is high (mock heuristic).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {MOODS.map((m) => (
              <button key={m.score} onClick={() => setScore(m.score)} className={`flex flex-1 flex-col items-center gap-1 rounded-lg border py-3 transition ${score === m.score ? "border-brand-royal bg-brand-royal text-white" : "border-gray-200 bg-white hover:border-brand-royal/40"}`}>
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs font-medium">{m.score} · {m.label}</span>
              </button>
            ))}
          </div>
          <textarea value={journal} onChange={(e) => setJournal(e.target.value)} rows={4} placeholder="How are you feeling? What’s on your mind? (journal)" className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm focus:border-brand-royal focus:outline-none focus:ring-2 focus:ring-brand-royal" />
          <Button onClick={submit}><Send className="h-4 w-4" /> Save check-in</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent check-ins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {entries.map((e) => (
            <div key={e.id} className="rounded-md border border-gray-100 bg-brand-gray/40 px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${e.score >= 4 ? "bg-emerald-100 text-emerald-700" : e.score <= 2 ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{e.score}</span>
                {e.date} <span className="ml-auto text-xs text-gray-400">{MOODS.find((m) => m.score === e.score)?.emoji}</span>
              </p>
              <p className="mt-1 text-sm text-gray-600">{e.journal || "—"}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
