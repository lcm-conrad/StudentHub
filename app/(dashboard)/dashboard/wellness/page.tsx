import { MoodCheckIn } from "@/components/wellness/MoodCheckIn";
export const metadata = { title: "Wellness — StudentHub" };
export default function WellnessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-dark sm:text-2xl">Wellness</h2>
        <p className="mt-1 text-sm text-gray-500">Daily mood scores 1–5, journal, and AI wellness break recommendations (FR-13 mock).</p>
      </div>
      <MoodCheckIn />
    </div>
  );
}
