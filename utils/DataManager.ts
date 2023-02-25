import UniversityData from '../data/university.json';
import { Faculty, Course } from '../types/university';

export const findUniversity: any = (university_id: string | null) => {
  return UniversityData.find((v) => v.university_id == university_id);
};

export const findSingleFaculty = (
  university_id: string | null,
  faculty_id: string | null
) => {
  return findUniversity(university_id)?.faculty.find(
    (v: Faculty) => v.faculty_id == faculty_id
  );
};

export const findManyCourse = (
  university_id: string | null,
  faculty_id: string | null
) => {
  const course = findUniversity(university_id)?.course;

  if (faculty_id) {
    return course.filter((v: Course) => {
      return v.faculty_id == faculty_id;
    });
  } else {
    return course;
  }
};

export const findSingleCourse = (
  university_id: string | null,
  course_id: string | null
) => {
  return findUniversity(university_id, course_id).course.find((v: Course) => {
    return v.course_id == course_id;
  });
};

export { UniversityData };
