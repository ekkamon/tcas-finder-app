import UniversityData from '../data/university.json';

export const findUniversity = (university_id: string | null) => {
  return UniversityData.find((v) => v.university_id == university_id);
};

export const findManyFaculty = (
  university_id: string | null,
  faculty_id: string | null
) => {
  return findUniversity(university_id)?.facultys.filter(
    (v) => v.faculty_id == faculty_id
  );
};

export { UniversityData };
