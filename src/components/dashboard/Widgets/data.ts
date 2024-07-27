import {
  Users,
  ArrowUp10,
  ListChecks,
  CalendarCheck2,
  UserRoundCheck,
  Library,
} from "lucide-react";

export type UserRole = "student" | "teacher" | "admin";

export const widgetDataMap: Record<
  UserRole,
  { titles: string[]; dataKeys: string[]; icons: React.ComponentType[] }
> = {
  student: {
    titles: ["Total Points", "Total Assignments", "Total Submissions"],
    dataKeys: ["total_points", "total_assignment", "submitted_assignments"],
    icons: [ArrowUp10, CalendarCheck2, ListChecks],
  },
  teacher: {
    titles: ["Total Students", "Total Assignments", "New Submissions"],
    dataKeys: ["total_student", "total_assignments", "daily_submissions"],
    icons: [Users, CalendarCheck2, ListChecks],
  },
  admin: {
    titles: ["Total Teachers", "Total Students", "Total Courses"],
    dataKeys: ["total_teacher", "total_students", "total_course"],
    icons: [UserRoundCheck, Users, Library],
  },
};
