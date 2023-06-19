import { TypeField } from "@types-app/generate-fom"

const getDefaultValues = (fields: TypeField[], defaultValue: any = '') => {
  return fields.reduce((obj, field) => {
    obj[field.valueKey] = defaultValue;
    return obj;
  }, {});
}

export { getDefaultValues };