import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/ui/Card.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCourses } from '../context/CourseContext.jsx';
import CourseCard from '../components/course/CourseCard.jsx';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const { courses, courseProgress } = useCourses();
  const role = user?.role ?? 'student';

  const enrolled = courses.filter((course) => user?.enrolledCourses.includes(course.id));
  const createdCourses = courses.slice(0, 3);
  const studentCount = createdCourses.length * 42;
  const avgProgress = enrolled.length
    ? Math.round(enrolled.reduce((sum, course) => sum + courseProgress(course), 0) / enrolled.length)
    : 0;

  const studentStats = [
    { label: 'Enrolled Courses', value: enrolled.length },
    {
      label: 'Completed Lessons',
      value: enrolled.reduce((acc, course) => acc + course.lessons.filter((lesson) => lesson.completed).length, 0),
    },
    { label: 'Average Progress', value: `${avgProgress}%` },
    { label: 'Weekly Goal', value: '4 Lessons' },
  ];

  const instructorStats = [
    { label: 'Created Courses', value: createdCourses.length },
    { label: 'Total Students', value: studentCount },
    { label: 'Completion Avg', value: '74%' },
    { label: 'Pending Reviews', value: 5 },
  ];

  return (
    <DashboardLayout
      title={role === 'instructor' ? 'Instructor Dashboard' : 'User Dashboard'}
      subtitle={
        role === 'instructor'
          ? 'Manage your courses, monitor learner activity, and upload fresh content.'
          : 'Track progress, continue lessons, and manage your learning plan.'
      }
    >
      <section className="dashboard-enter grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(role === 'instructor' ? instructorStats : studentStats).map((item) => (
          <Card key={item.label} className="soft-gradient-panel hover-lift">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          </Card>
        ))}
      </section>

      {role === 'instructor' ? (
        <>
          <section className="glass-card soft-gradient-panel dashboard-enter p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="section-title">Created Courses</h2>
                <p className="section-subtitle">Manage all your published and draft courses from one place.</p>
              </div>
              <Button>Upload Content</Button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {createdCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={courseProgress(course)}
                  actionLabel="Edit Course"
                  actionTo={`/courses/${course.id}`}
                  showMedia
                  showVideoButton
                />
              ))}
            </div>
          </section>

          <section className="dashboard-enter grid gap-4 lg:grid-cols-2">
            <Card title="Student Count Overview" subtitle="Course-wise active learner distribution." className="soft-gradient-panel">
              <ul className="space-y-3">
                {createdCourses.map((course, index) => (
                  <li key={course.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="mb-1 flex items-center justify-between text-sm text-slate-700">
                      <span>{course.title}</span>
                      <span>{48 + index * 21} students</span>
                    </div>
                    <ProgressBar value={60 + index * 12} />
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Recent Activities" className="soft-gradient-panel">
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Uploaded new module for "UI Systems with Tailwind"</li>
                <li>Received 12 new assignment submissions</li>
                <li>Updated course metadata for React Foundation Sprint</li>
              </ul>
            </Card>
          </section>
        </>
      ) : (
        <>
          <section className="dashboard-enter">
            <h2 className="section-title mb-3">Enrolled Courses</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolled.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={courseProgress(course)}
                  actionLabel="Continue Learning"
                  actionTo={`/learn/${course.id}`}
                  showMedia
                  showVideoButton
                />
              ))}
            </div>
          </section>

          <section className="dashboard-enter grid gap-4 lg:grid-cols-2">
            <Card title="Overall Progress" subtitle="Your current learning momentum across enrolled courses." className="soft-gradient-panel">
              <ProgressBar value={avgProgress} />
              <p className="mt-3 text-sm text-slate-600">
                Keep up the streak. Completing 2 lessons today will move you near weekly goal.
              </p>
            </Card>

            <Card title="Notifications" className="soft-gradient-panel">
              <ul className="space-y-2 text-sm text-slate-600">
                <li>New lesson available in "AI Productivity Workflows"</li>
                <li>Reminder: Complete 1 pending lesson for React Foundation Sprint</li>
                <li>Instructor posted updated resources in your enrolled course</li>
              </ul>
            </Card>
          </section>

          <section className="glass-card soft-gradient-panel dashboard-enter p-5">
            <h2 className="section-title">Quick Learning Video</h2>
            <p className="mt-1 text-sm text-slate-600">Short walkthrough to improve your weekly learning momentum.</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
              <video
                className="aspect-video w-full bg-slate-900 object-cover"
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
                controls
                preload="metadata"
              />
            </div>
          </section>

          <section className="glass-card soft-gradient-panel dashboard-enter p-5">
            <h2 className="section-title">Video Resources</h2>
            <p className="mt-1 text-sm text-slate-600">Open the latest course videos directly from your dashboard cards.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {enrolled.map((course) => (
                <article key={`video-${course.id}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <img src={course.thumbnail} alt={course.title} className="h-32 w-full object-cover" />
                  <div className="space-y-2 p-3">
                    <h4 className="line-clamp-2 text-sm font-medium text-slate-900">{course.title}</h4>
                    <a
                      href={course.resourceVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary w-full"
                    >
                      Open Video
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="glass-card soft-gradient-panel dashboard-enter p-5">
            <h2 className="section-title">Recent Activities</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Completed lesson "React Mental Model"</li>
              <li>Asked AI assistant about next learning step</li>
              <li>Opened "UI Systems with Tailwind" course page</li>
            </ul>
          </section>
        </>
      )}

      <p className="glass-card soft-gradient-panel dashboard-enter px-4 py-3 text-xs text-slate-500">
        AI chatbot icon stays available at bottom-right across dashboard screens.
      </p>
    </DashboardLayout>
  );
}
