import { createContext, useContext, useMemo, useState } from 'react';
import { dummyCourses } from '../data/dummyCourses.js';

const CourseContext = createContext(null);

function courseProgress(course) {
  const total = course.lessons.length;
  const done = course.lessons.filter((lesson) => lesson.completed).length;
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(dummyCourses);

  const markLessonComplete = (courseId, lessonId) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          lessons: course.lessons.map((lesson) =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          ),
        };
      })
    );
  };

  const getCourseById = (courseId) => courses.find((course) => course.id === courseId);

  const value = useMemo(
    () => ({ courses, markLessonComplete, getCourseById, courseProgress }),
    [courses]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within CourseProvider');
  }
  return context;
}
