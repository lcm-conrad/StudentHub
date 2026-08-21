import { mockCourses } from "@/lib/mocks/courses";
import { CourseProgressCard } from "@/components/courses/CourseProgressCard";

export const metadata = { title: "Courses — StudentHub" };

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-brand-dark sm:text-2xl">Courses</h2>
        <p className="mt-1 text-sm text-gray-500">Academic overview — instructor, deadlines, milestones, and weighted progress (mock).</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((c) => (
          <CourseProgressCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
