"use client";
import * as React from "react";
import { Music2, CloudRain, Leaf, Wind, Play, Pause, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TRACKS = [
  { id: "lofi", label: "Lo-fi", icon: Music2, color: "bg-brand-royal", desc: "Chill beats" },
  { id: "rain", label: "Rain", icon: CloudRain, color: "bg-sky-600", desc: "Soft rainfall" },
  { id: "nature", label: "Nature", icon: Leaf, color: "bg-emerald-600", desc: "Forest birds" },
  { id: "ambient", label: "Ambient", icon: Wind, color: "bg-amber-600", desc: "Warm drone" },
] as const;

export function ChillHub() {
  const [active, setActive] = React.useState<string | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(60);
  const [mix, setMix] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Music2 className="h-5 w-5 text-brand-royal" /> Chill Hub</CardTitle>
        <CardDescription>Lo-fi, rain, nature & ambient — mix or solo. Audio is mocked; UI is interactive.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRACKS.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setActive(t.id); setPlaying(true); }}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition ${isActive ? "border-brand-royal bg-brand-royal/5 ring-1 ring-brand-royal" : "border-gray-200 bg-white hover:border-brand-royal/40"}`}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${t.color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-brand-dark">{t.label}</span>
                <span className="text-xs text-gray-500">{t.desc}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-gray-100 bg-brand-gray/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={playing ? "default" : "outline"}
              onClick={() => setPlaying((p) => !p)}
              disabled={!active}
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? "Pause" : "Play"} {active ? `— ${active}` : ""}
            </Button>
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input type="checkbox" checked={mix} onChange={(e) => setMix(e.target.checked)} className="rounded" />
              Mix mode
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <Volume2 className="h-4 w-4" />
            <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-32 accent-[#0033A0]" />
            <span className="w-8 text-xs tabular-nums">{volume}%</span>
          </label>
        </div>
        <p className="text-xs text-gray-400">Mock: no real audio file. Replace <code className="rounded bg-gray-100 px-1">public/sounds/*.mp3</code> and wire <code className="rounded bg-gray-100 px-1">&lt;audio&gt;</code> to enable playback.</p>
      </CardContent>
    </Card>
  );
}
