import { Button } from '../Button';
import { Modal } from '../Modal';
import { getLang } from '../../utils/Lang';
import { IoCloseSharp } from 'react-icons/io5';
import { FC, useState } from 'react';
import { PIE_COLORS, PieChart } from '../Charts/PieChart';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import {
  findUniversity,
  findSingleFaculty,
  findSingleCourse,
} from '../../utils/DataManager';

interface Props {
  university_id: string | null;
  faculty_id: string | null;
  course_id: string | null;
}

export const CardCourse: FC<Props> = ({
  university_id,
  faculty_id,
  course_id,
}) => {
  const university = findUniversity(university_id);
  const faculty = findSingleFaculty(university_id, faculty_id);
  const course = findSingleCourse(university_id, course_id);
  const [step, setStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setIsOpen(false);
  };

  const backStep = () => {
    if (step > 1) {
      setStep(step - 1);
      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setStep(1);
        }}
        className="block border rounded w-full cursor-pointer hover:shadow"
      >
        <div className="p-3 md:p-5">
          <div>
            <div className="font-bold">{faculty.faculty_name_th}</div>
            <div className="text-sm">สาขา{course.branch_name_th}</div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} className="mt-[5%] bg-white p-4 px-5 rounded">
        <div className="w-full">
          <div className="flex ">
            <div className="w-[70%]">
              <div className="font-bold text-lg">
                {university.university_name_th}
              </div>
              <div className="text-xs">
                {faculty.faculty_name_th} สาขา{course.branch_name_th}
              </div>
            </div>
            <div className="w-[30%] flex items-center justify-end">
              <div className="p-2 hover:bg-zinc-100 rounded">
                <IoCloseSharp
                  className="text-xl cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          </div>
          <div className="mb-5 mt-1 border-b" />
          <div className="container px-2.5">
            {step == 1 && (
              <>
                {Object.values(course.graduated).length > 0 && (
                  <div className="mb-3">
                    <div className="mb-2 font-bold underline">
                      คุณสมบัติการศึกษา
                    </div>
                    <ul>
                      {Object.entries(course.graduated).map(
                        ([lang, value], i: number) => {
                          return (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm"
                            >
                              {typeof value == 'boolean' && value == true ? (
                                <BsFillCheckCircleFill className="text-green-600" />
                              ) : (
                                <BsFillXCircleFill className="text-red-600" />
                              )}
                              {getLang('instruction', lang)}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}
                {Object.values(course.require_credit).length > 0 && (
                  <div className="mb-3">
                    <div className="mb-2 font-bold underline">
                      คุณสมบัติหน่วยกิตสะสม
                    </div>
                    <ul>
                      {Object.entries(course.require_credit).map(
                        ([lang, value]: any, i: number) => {
                          return (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm"
                            >
                              <BsFillCheckCircleFill className="text-green-600" />
                              <span>{getLang('credit', lang)}</span>
                              <span className="font-bold">{value}</span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}
                {Object.values(course.require_scores).length > 0 && (
                  <div className="mb-3">
                    <div className="mb-2 font-bold underline">
                      คุณสมบัติเกรดเฉลี่ยและการสอบ
                    </div>
                    <ul>
                      {Object.entries(course.require_scores).map(
                        ([lang, value]: any, i: number) => {
                          return (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm"
                            >
                              <BsFillCheckCircleFill className="text-green-600" />
                              <span>{getLang('score', lang)}</span>
                              <span className="font-bold">
                                {parseFloat(value).toFixed(2)}
                              </span>
                              <span>
                                {lang.indexOf('gpa') == -1 ? 'คะแนน' : ''}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
            {step == 2 && (
              <>
                <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-center">
                    <div className="block">
                      <PieChart
                        data={Object.entries(course.calulate_scores).map(
                          ([name, value]) => {
                            return { name, value };
                          }
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="block">
                      {Object.values(course.calulate_scores).length > 0 &&
                        Object.keys(course.calulate_scores).map(
                          (lang: string, i: number) => {
                            return (
                              <div
                                key={i}
                                className="mb-3 flex items-center text-sm gap-2"
                              >
                                <div
                                  className={`h-3 w-3 rounded-sm`}
                                  style={{ backgroundColor: PIE_COLORS[i] }}
                                />
                                <div>{getLang('exam', lang)}</div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-5 text-center">
                  <span className="bg-red-600 px-5 py-1 rounded text-white">
                    <span className="font-eng font-bold">Good Luck</span>,
                    ขอให้โชคดีกับเส้นทางที่เลือก :D
                  </span>
                </div>
              </>
            )}
            <div className="border-t">
              <div className="pt-4 flex items-center justify-end gap-3">
                <Button color="primary" className="text-sm" onClick={nextStep}>
                  {step != 2 ? 'ดำเนินการต่อ' : 'เสร็จสิ้น'}
                </Button>
                <Button color="default" className="text-sm" onClick={backStep}>
                  ย้อนกลับ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
