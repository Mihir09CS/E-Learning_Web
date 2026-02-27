import Button from '../ui/Button.jsx';

export default function CourseSyllabus({ course, onCompleteLesson }) {
  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-slate-900">Syllabus</h2>
      <div className="mt-4 space-y-3">
        {course.lessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-3">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Lesson {lesson.id}: {lesson.title}
              </p>
              <p className="text-xs text-slate-500">Status: {lesson.completed ? 'Completed' : 'Pending'}</p>
            </div>
            <Button
              variant={lesson.completed ? 'secondary' : 'primary'}
              disabled={lesson.completed}
              onClick={() => onCompleteLesson(lesson.id)}
              className={lesson.completed ? 'cursor-default' : ''}
            >
              {lesson.completed ? 'Done' : 'Mark Complete'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
