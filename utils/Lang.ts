import Langs from '../data/langs.json';

export const getLang = (category: string, target: string) => {
  //@ts-ignore
  return Langs[category][target];
};

export { Langs };
