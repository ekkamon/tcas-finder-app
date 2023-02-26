import type { Course } from '../../types/university';
import { Badge } from '../Badge';
import { FC, useEffect, useState } from 'react';
import { Select, Input } from '../Input';
import { getLang, Langs } from '../../utils/Lang';
import { BsFillXOctagonFill, BsCheckSquareFill } from 'react-icons/bs';
import { PercentChart } from '../Charts/PercentChart';

interface Props {
  data: Course;
  step: number;
}

export const Calculate: FC<Props> = ({ data, step }) => {
  const [inputFeild, setInputFeild] = useState({
    instruction: 'core',
    score: {},
  });

  const [passPercent, setPassPercent] = useState<number>();

  const handleFilter = (key: string) => {
    if (
      ![...Object.keys(data.calulate_scores), 'TGAT3', 'TGAT'].includes(key)
    ) {
      return true;
    }
  };

  const getResult = () => {
    const { score, instruction } = inputFeild;
    const checkList = { ...data.require_scores, ...data.calulate_scores };

    //@ts-ignore
    if (!data.graduated[instruction]) {
      return false;
    }

    const passed = Object.entries(checkList).map(
      //@ts-ignore
      ([lang, value]: any) => score[lang] >= value
    );

    return !passed.includes(false);
  };

  const getPercent = () => {
    const { score } = inputFeild;
    let sum = 0;

    Object.entries(data.calulate_scores).map(([lang, value]: any) => {
      //@ts-ignore
      sum += score[lang] * (value / 100);
    });

    return sum;
  };

  useEffect(() => {
    if (step == 4) {
      setPassPercent(getPercent());
    }
  }, [step]);

  return (
    <div className="w-full">
      {step == 3 && (
        <>
          <div className="mb-5">
            <div className="mb-1">การศึกษาที่จบมา</div>
            <Select
              value={inputFeild.instruction}
              menu={Object.entries(Langs.instruction).map(
                ([value, label]: any) => {
                  return {
                    label,
                    value,
                  };
                }
              )}
              onChange={(e) => {
                setInputFeild((p: any) => ({
                  ...p,
                  instruction: e.target.value,
                }));
              }}
            />
          </div>
          {Object.keys(data.require_scores)
            .filter(handleFilter)
            .map((lang: any, i: number) => {
              return (
                <div key={i} className="mb-3">
                  <div className="mb-1">{getLang('score', lang)}</div>
                  <Input
                    type="number"
                    //@ts-ignore
                    value={inputFeild.score[lang]}
                    placeholder="เกรดเฉลี่ยของคุณ"
                    onChange={(e) => {
                      if (
                        lang.indexOf('gpa') > -1 &&
                        parseFloat(e.target.value) > 4
                      )
                        return;

                      setInputFeild((p: any) => ({
                        ...p,
                        score: {
                          ...p.score,
                          [lang]: parseFloat(e.target.value),
                        },
                      }));
                    }}
                    min={0}
                    max={100}
                  />
                </div>
              );
            })}
          {Object.keys(data.calulate_scores).map((lang: any, i: number) => {
            return (
              <div key={i} className="mb-3">
                <div className="mb-1">{getLang('exam', lang)}</div>
                <Input
                  type="number"
                  //@ts-ignore
                  value={inputFeild.score[lang]}
                  placeholder="คะแนนการสอบของคุณ"
                  onChange={(e) => {
                    if (parseFloat(e.target.value) > 100) return;

                    setInputFeild((p: any) => ({
                      ...p,
                      score: {
                        ...p.score,
                        [lang]: parseFloat(e.target.value),
                      },
                    }));
                  }}
                  min={0}
                  max={100}
                />
              </div>
            );
          })}
        </>
      )}
      {step == 4 && (
        <div className="mb-3 text-center">
          {!getResult() ? (
            <Badge
              color="danger"
              icon={<BsFillXOctagonFill />}
              html={'คุณไม่ผ่านคุณสมบัติพื้นฐาน'}
              className="truncate text-sm w-full"
            />
          ) : (
            <>
              <Badge
                color="success"
                icon={<BsCheckSquareFill />}
                html={'คุณผ่านเกณฑ์คุณสมบัติพื้นฐาน'}
                className="truncate text-sm w-full"
              />
              <div className="mt-10 flex justify-center items-center">
                <PercentChart
                  data={[
                    {
                      name: 'passed',
                      value: passPercent,
                    },
                    {
                      name: 'error',
                      //@ts-ignore
                      value: 100 - passPercent,
                    },
                  ]}
                  className="border-0"
                />
              </div>
              <div className="mb-10">
                <span className="bg-zinc-900 text-white p-1.5 px-5 rounded">
                  คุณมีโอกาสผ่านเข้ารอบ {passPercent}%
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
