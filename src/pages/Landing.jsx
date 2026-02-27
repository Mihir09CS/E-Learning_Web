import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useThemeMode } from '../context/ThemeModeContext.jsx';
import heroImage from '../assets/hero-learning.svg';

const partners = ['HubSpot', 'loom', 'GitLab', 'LiveChat', 'monday.com'];
const categories = ['All', 'Design', 'Development', 'Business', 'Data Science', 'Marketing'];

const categoryMatch = {
  Design: ['Design'],
  Development: ['Frontend', 'Backend'],
  Business: ['Backend'],
  'Data Science': ['AI'],
  Marketing: ['Marketing'],
};

export default function Landing() {
  const { courses } = useCourses();
  const { user, enrollCourse } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const featured = useMemo(() => {
    if (activeCategory === 'All') return courses;
    const accepted = categoryMatch[activeCategory] ?? [];
    return courses.filter((course) => accepted.includes(course.category));
  }, [activeCategory, courses]);

  const handleExplore = () => {
    const query = searchTerm.trim();
    navigate(query ? `/courses?search=${encodeURIComponent(query)}` : '/courses');
  };

  const handleEnroll = (courseId) => {
    enrollCourse(courseId);
    navigate('/dashboard');
  };

  return (
    <main className="landing-bg min-h-screen">
      <div className="app-shell py-6">
        <header className="panel p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/" className="text-2xl font-bold text-slate-900">
              LearnFlow
            </Link>

            <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
              <Link to="/" className="hover:text-slate-900">
                Home
              </Link>
              <Link to="/help" className="hover:text-slate-900">
                About
              </Link>
              <Link to="/courses" className="hover:text-slate-900">
                Course
              </Link>
              <Link to="/dashboard" className="hover:text-slate-900">
                Dashboard
              </Link>
              <Link to="/help" className="hover:text-slate-900">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button type="button" onClick={toggleTheme} className="btn-secondary">
                {mode === 'dark' ? 'Light' : 'Dark'}
              </button>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-10 text-white shadow-sm sm:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-50">
                Contest Ready Learning Platform
              </p>
              <h1>Build, learn, and track your growth in one focused workspace.</h1>
              <p className="mt-4 text-sm text-indigo-100 sm:text-base">
                Structured navigation, modular UI architecture, and smooth student-first flow with admin and support pages included.
              </p>

              <div className="mt-6 flex items-center gap-2 rounded-lg bg-white p-1.5 shadow-sm">
                <input
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-700 outline-none"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button onClick={handleExplore} className="btn-primary">
                  Explore
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/25 bg-white/10 p-2 backdrop-blur-sm">
              <img src={heroImage} alt="Learning illustration" className="h-auto w-full rounded-xl object-cover" />
            </div>
          </div>
        </section>

        <section className="mt-12 panel p-5">
          <p className="text-sm font-medium text-slate-500">Our Course Partners</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xl font-semibold text-slate-700 sm:text-2xl">
            {partners.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </section>

        <section className="mt-12 panel p-5">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2>Featured Courses</h2>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((course) => {
              const isEnrolled = Boolean(user?.enrolledCourses?.includes(course.id));
              return (
                <article key={course.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={course.thumbnail} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
                    {course.landingVideoEmbed ? (
                      <iframe
                        className="relative z-10 h-full w-full"
                        src={`${course.landingVideoEmbed}?autoplay=0&mute=1&rel=0&modestbranding=1`}
                        title={`${course.title} preview`}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : null}
                  </div>
                  <div className="space-y-3 p-4">
                    <h4 className="line-clamp-2">{course.title}</h4>
                    <p className="text-sm text-slate-600">{course.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{course.level}</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link to={`/courses/${course.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        View Details
                      </Link>
                      <button
                        onClick={() => handleEnroll(course.id)}
                        disabled={isEnrolled}
                        className={`rounded-lg px-3 py-2 text-sm font-medium ${
                          isEnrolled ? 'cursor-not-allowed bg-slate-300 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isEnrolled ? 'Enrolled' : 'Enroll'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 panel p-5">
          <h2>Benefits Of Platform</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-3">
            {[
              'Modular components for rapid scaling',
              'Responsive structure for desktop + mobile',
              'Dummy states for complete navigation demo',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 panel p-5">
          <div className="grid gap-6 text-sm text-slate-600 md:grid-cols-4">
            <div>
              <h4 className="mb-2">LearnFlow</h4>
              <p>Structured learning platform with AI guidance and role-based workflow.</p>
            </div>
            <div>
              <h4 className="mb-2">About</h4>
              <p>Built for speed, clean architecture, and smooth learning flow.</p>
            </div>
            <div>
              <h4 className="mb-2">Contact</h4>
              <p>support@learnflow.com</p>
              <p>+1 555 294 1100</p>
            </div>
            <div>
              <h4 className="mb-2">Social Links</h4>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                  LinkedIn
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                  Twitter
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
