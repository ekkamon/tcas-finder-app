import type { NextPage } from 'next';
import type { Course, Faculty } from '../types/university';
import { Select } from '../components/Input';
import { useEffect, useState } from 'react';
import {
  findUniversity,
  findManyCourse,
  UniversityData,
} from '../utils/DataManager';
import { CardCourse } from '../components/Home/Course';

interface SelectorData {
  university_id: string | null;
  faculty_id: string | null;
}

interface Props {
  thisYear: number;
}

const Home: NextPage<Props> = ({ thisYear }) => {
  const [faculty, setFaculty] = useState<Array<Faculty>>([]);
  const [selected, setSelected] = useState<SelectorData>({
    university_id: UniversityData[0]?.university_id || null,
    faculty_id: null,
  });

  useEffect(() => {
    if (selected.university_id) {
      setFaculty(findUniversity(selected?.university_id)?.faculty || []);
      setSelected((p: any) => ({ ...p, faculty_id: null }));
    }
  }, [selected.university_id]);

  return (
    <>
      <div className="w-full py-20 px-3 text-center">
        <span className="text-2xl font-bold">
          ยินดีต้อนรับ <span className="underline">DEK{thisYear}</span>,
          คุณสามารถดูคณะที่สนใจได้ทีนี่ !
        </span>
      </div>
      <div className="flex justify-center">
        <div className="container">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10">
            <div>
              <div className="mb-1">รายชื่อมหาวิทยาลัย</div>
              <Select
                value={selected?.university_id || ''}
                menu={UniversityData.map((v) => {
                  return {
                    label: v.university_name_th,
                    value: v.university_id,
                  };
                })}
                onChange={(e) =>
                  setSelected((p: SelectorData) => ({
                    ...p,
                    university_id: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <div className="mb-1">รายชื่อคณะ</div>
              <Select
                value={selected?.faculty_id || ''}
                placeholder="ทั้งหมด"
                menu={faculty?.map((v) => {
                  return { label: v.faculty_name_th, value: v.faculty_id };
                })}
                onChange={(e) =>
                  setSelected((p: SelectorData) => ({
                    ...p,
                    faculty_id: e.target.value,
                  }))
                }
                disabled={!selected.university_id}
              />
            </div>
          </div>
          {selected?.university_id && (
            <>
              <div className="mt-5 flex justify-end">
                <span className="text-sm">
                  ทั้งหมด: <span className="font-bold">{faculty.length}</span>{' '}
                  รายการ
                </span>
              </div>
              <div className="mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {findManyCourse(
                    selected.university_id,
                    selected.faculty_id
                  )?.map((v: Course, i: number) => {
                    return (
                      <CardCourse
                        key={i}
                        university_id={selected?.university_id}
                        faculty_id={v.faculty_id}
                        course_id={v.course_id}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      thisYear: new Date()
        .toLocaleString('default', { year: '2-digit' })
        .replace(/^\D+/g, ''),
    },
  };
};

export default Home;
