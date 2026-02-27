import CourseCard from './CourseCard.jsx';

export default function CourseGrid({
  courses,
  progressByCourse = {},
  enrolledCourseIds = [],
  onEnroll,
  showProgress = true,
  showVideoButton = false,
  showMedia = false,
}) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="col-span-12 md:col-span-6 xl:col-span-4">
          <CourseCard
            course={course}
            progress={progressByCourse[course.id] ?? 0}
            actionLabel="Enroll Now"
            enrolled={enrolledCourseIds.includes(course.id)}
            onPrimaryClick={onEnroll ? () => onEnroll(course.id) : undefined}
            showProgress={showProgress}
            showDetailsButton={Boolean(onEnroll)}
            showVideoButton={showVideoButton}
            showMedia={showMedia}
          />
        </div>
      ))}
    </div>
  );
}
