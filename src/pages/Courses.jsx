import { useMemo, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import CourseGrid from '../components/course/CourseGrid.jsx';
import FilterSidebar, { courseFilterOptions } from '../components/course/FilterSidebar.jsx';
import { useCourses } from '../context/CourseContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Courses() {
  const { courses, courseProgress } = useCourses();
  const { user, enrollCourse } = useAuth();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const enrolledCourseIds = user?.enrolledCourses ?? [];

  const matchesFilter = (course) => {
    if (activeFilter === 'All') return true;
    if (['Beginner', 'Intermediate', 'Advanced'].includes(activeFilter)) return course.level === activeFilter;
    if (activeFilter === 'Design') return course.category === 'Design';
    if (activeFilter === 'AI/ML') return course.category === 'AI';
    if (activeFilter === 'Web Development') return ['Frontend', 'Backend'].includes(course.category);
    return true;
  };

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      return matchesSearch && matchesFilter(course);
    });
  }, [activeFilter, courses, search]);

  const progressByCourse = useMemo(() => {
    const map = {};
    courses.forEach((course) => {
      map[course.id] = courseProgress(course);
    });
    return map;
  }, [courseProgress, courses]);

  return (
    <DashboardLayout title="Course Listing" subtitle="Discover, filter, and enroll in the right course for your learning path.">
      <section className="panel p-5">
        <div className="space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-3.5 text-slate-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" />
              </svg>
            </span>
            <input
              className="h-12 w-full rounded-full border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {courseFilterOptions.map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition duration-300 ${
                  activeFilter === item
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="btn-secondary w-full md:hidden" onClick={() => setShowMobileFilters(true)}>
            Open Filters
          </button>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="hidden md:col-span-3 md:block">
          <FilterSidebar activeFilter={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="col-span-12 space-y-4 md:col-span-9">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No courses found for your current search and filter.
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <CourseGrid
                courses={filtered}
                progressByCourse={progressByCourse}
                enrolledCourseIds={enrolledCourseIds}
                onEnroll={enrollCourse}
                showVideoButton
                showMedia
              />
            </div>
          )}
        </div>
      </section>

      {showMobileFilters ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-slate-900/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Filters</h3>
              <button className="text-sm text-slate-500" onClick={() => setShowMobileFilters(false)}>
                Close
              </button>
            </div>
            <FilterSidebar
              activeFilter={activeFilter}
              onChange={(value) => {
                setActiveFilter(value);
                setShowMobileFilters(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </DashboardLayout>
  );
}
