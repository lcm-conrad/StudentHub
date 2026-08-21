import { BarChart, LineDots } from "@/components/analytics/BarChart";
import { mockFocusDaily, mockFocusPerCourse, mockTaskVelocity, mockMoodTrend } from "@/lib/mocks/analytics";

export const metadata = { title: "Analytics — StudentHub" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-dark sm:text-2xl">Analytics</h2>
        <p className="mt-1 text-sm text-gray-500">Focus hours, task velocity, and mood trends over time (FR-12 mock).</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChart
          title="Focus session hours"
          description="Minutes per day — last 7 days"
          data={mockFocusDaily.map((d) => ({ label: d.date.slice(5), value: d.minutes }))}
          color="bg-brand-royal"
          valueLabel="m"
        />
        <BarChart
          title="Task velocity"
          description="Tasks completed per day"
          data={mockTaskVelocity.map((d) => ({ label: d.date, value: d.completed }))}
          color="bg-emerald-500"
          valueLabel=""
        />
      </div>

      <LineDots data={mockMoodTrend.map((d) => ({ label: d.date, value: d.score }))} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockFocusPerCourse.map((c) => (
          <div key={c.course} className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">{c.course}</p>
            <p className="text-lg font-semibold text-brand-dark">{c.minutes}m</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-1.5 bg-brand-royal" style={{ width: `${(c.minutes / 180) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
