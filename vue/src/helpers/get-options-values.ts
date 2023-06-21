import { IOption } from "@types-app/form";

const getOptionsValues = <T extends Record<string, any>, TId extends string = 'id'>(data: T[], idKey: TId, keys: (keyof T)[]): IOption[] => { 
  return data.map(item => {
    const text = keys.reduce((str, key) => `${str as string} ` + `${item[key]}`, '');
    
    const option: IOption = {
      value: `${item[idKey]}`,
      text: text as string
    }

    return option;
  });
}

export { getOptionsValues };