import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar.jsx';

function levelBadge(level) {
  if (level === 'Beginner') return 'bg-emerald-100 text-emerald-700';
  if (level === 'Intermediate') return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

export default function CourseCard({
  course,
  progress = 0,
  actionLabel = 'View Course',
  actionTo,
  onPrimaryClick,
  enrolled = false,
  showProgress = true,
  showDetailsButton = false,
  showMedia = false,
  showVideoButton = false,
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white p-0 shadow-sm transition duration-300 hover:scale-[1.02] hover:shadow-md">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600">
        {showMedia ? (
          <>
            {course.previewVideo ? (
              <video
                className="h-full w-full object-cover"
                src={course.previewVideo}
                poster={course.thumbnail}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : null}
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className={`absolute inset-0 h-full w-full object-cover ${course.previewVideo ? 'opacity-35' : 'opacity-100'}`}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-[11px] font-medium text-white">
              Preview
            </span>
          </>
        ) : null}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">{course.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{course.instructor}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-slate-600">
            <span className="text-amber-500">★</span>
            <span>{course.rating}</span>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${levelBadge(course.level)}`}>{course.level}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{course.category}</span>
          <span>{course.duration}</span>
        </div>

        {showProgress ? <ProgressBar value={progress} /> : null}

        <div className="space-y-2">
          {showDetailsButton ? (
            <Link to={actionTo ?? `/courses/${course.id}`} className="btn-secondary w-full">
              View Details
            </Link>
          ) : null}
          {showVideoButton && course.resourceVideoUrl ? (
            <a
              href={course.resourceVideoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary w-full"
            >
              Watch Video
            </a>
          ) : null}
          {onPrimaryClick ? (
            <button
              onClick={onPrimaryClick}
              disabled={enrolled}
              className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                enrolled
                  ? 'cursor-not-allowed bg-slate-400 text-white'
                  : 'bg-indigo-600 text-white hover:scale-105 hover:bg-indigo-700'
              }`}
            >
              {enrolled ? 'Enrolled' : actionLabel}
            </button>
          ) : (
            <Link to={actionTo ?? `/courses/${course.id}`} className="btn-primary w-full">
              {actionLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
