import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Button from '../components/ui/Button.jsx';
import CourseSyllabus from '../components/course/CourseSyllabus.jsx';
import { useCourses } from '../context/CourseContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function CourseDetail() {
  const { id } = useParams();
  const { getCourseById, markLessonComplete, courseProgress } = useCourses();
  const { user, enrollCourse } = useAuth();
  const course = getCourseById(id);

  if (!course) {
    return (
      <DashboardLayout title="Course not found" subtitle="The requested course does not exist.">
        <Link to="/courses" className="btn-secondary">
          Back to Courses
        </Link>
      </DashboardLayout>
    );
  }

  const enrolled = user?.enrolledCourses.includes(course.id);

  return (
    <DashboardLayout title="Course Detail" subtitle="Review course overview before enrollment and start your learning journey.">
      <section className="panel p-5">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{course.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Duration</p>
                <p className="mt-1 text-lg font-medium text-slate-900">{course.duration}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Level</p>
                <p className="mt-1 text-lg font-medium text-slate-900">{course.level}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Rating</p>
                <p className="mt-1 text-lg font-medium text-slate-900">{course.rating} / 5</p>
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Instructor Details</p>
              <h3 className="mt-1 text-lg font-medium text-slate-900">{course.instructor}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Expert mentor focused on practical project-based learning and interview-ready guidance.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">Course Progress</p>
              <p className="mt-1 text-lg font-medium text-indigo-600">{courseProgress(course)}%</p>
            </div>

            <div className="flex gap-2">
              {course.resourceVideoUrl ? (
                <a href={course.resourceVideoUrl} target="_blank" rel="noreferrer" className="btn-secondary w-full text-center">
                  Watch Intro Video
                </a>
              ) : null}
              {enrolled ? (
                <Link to={`/learn/${course.id}`} className="btn-primary w-full text-center">
                  Start Course
                </Link>
              ) : (
                <Button onClick={() => enrollCourse(course.id)} className="w-full">
                  Enroll Course
                </Button>
              )}
            </div>
          </aside>
        </div>
      </section>

      <CourseSyllabus course={course} onCompleteLesson={(lessonId) => markLessonComplete(course.id, lessonId)} />
    </DashboardLayout>
  );
}
