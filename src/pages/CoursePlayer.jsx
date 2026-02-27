import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Button from '../components/ui/Button.jsx';
import { useCourses } from '../context/CourseContext.jsx';

export default function CoursePlayer() {
  const { id } = useParams();
  const { getCourseById, markLessonComplete } = useCourses();
  const course = getCourseById(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notes, setNotes] = useState('');

  const currentLesson = useMemo(() => {
    if (!course) return null;
    return course.lessons[currentIndex] ?? course.lessons[0];
  }, [course, currentIndex]);

  if (!course) {
    return (
      <DashboardLayout title="Course not found" subtitle="Return to catalog to continue.">
        <Link to="/courses" className="btn-secondary">
          Back to Courses
        </Link>
      </DashboardLayout>
    );
  }

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, course.lessons.length - 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <DashboardLayout title="Course Player" subtitle={`${course.title} | ${course.instructor}`}>
      <section className="grid gap-4 lg:grid-cols-12">
        <aside className="panel p-4 lg:col-span-4">
          <h2 className="mb-3 text-lg font-semibold">Lessons</h2>
          <div className="space-y-2">
            {course.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${
                  index === currentIndex
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lesson.id}. {lesson.title}
              </button>
            ))}
          </div>
        </aside>

        <article className="panel p-4 lg:col-span-8">
          <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
            {course.resourceVideoUrl ? (
              <iframe
                className="aspect-video w-full"
                src={course.resourceVideoUrl
                  .replace('youtu.be/', 'www.youtube.com/embed/')
                  .replace('/live/', '/embed/')
                  .split('?')[0]}
                title={currentLesson?.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="aspect-video p-4 text-slate-200">
                <p className="text-sm text-slate-300">Video Placeholder</p>
                <p className="mt-2 text-xl font-semibold">{currentLesson?.title}</p>
              </div>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <h3 className="mb-2 text-base font-semibold text-slate-900">Notes</h3>
              <textarea
                className="input-base min-h-28"
                placeholder="Write your key learning notes here..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <h3 className="mb-2 text-base font-semibold text-slate-900">Resources</h3>
              <ul className="space-y-2">
                <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Lesson summary PDF</li>
                <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Practice assignment link</li>
                <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Reference code repository</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={goPrev}>
              Previous
            </Button>
            <Button onClick={goNext}>Next</Button>
            <Button variant="danger" onClick={() => markLessonComplete(course.id, currentLesson.id)}>
              Mark Lesson Complete
            </Button>
          </div>
        </article>
      </section>
    </DashboardLayout>
  );
}
