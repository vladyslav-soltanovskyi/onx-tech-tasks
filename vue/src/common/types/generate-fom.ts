import { ObjectSchema } from "yup";
import type { IInputProps, ISelectProps, ITextareaProps } from "./form";

interface IFieldBase<TKey> {
  valueKey: TKey;
}

interface IFieldInput<T> extends IFieldBase<T>, Omit<IInputProps, "type" | "error"> {
  type: 'input';
  inputType?: string;
}

interface IFieldPassword<T> extends IFieldBase<T>, Omit<IInputProps, "type" | "error"> {
  type: 'password';
}

interface IFieldTextarea<T> extends IFieldBase<T>, Omit<ITextareaProps, "error"> {
  type: 'textarea';
}

interface IFieldSelect<T> extends IFieldBase<T>, Omit<ISelectProps, "error"> {
  type: 'select';
}

type TFieldValues = Record<string, any>;

type TypeField<T extends TFieldValues = TFieldValues> =
  | IFieldInput<keyof T>
  | IFieldPassword<keyof T>
  | IFieldTextarea<keyof T>
  | IFieldSelect<keyof T>;

type TypeValidationMode = 'change' | 'submit';

interface IGenerateForm {
  validationSchema?: ObjectSchema<TFieldValues> | Record<string, any>;
  fields: TypeField<TFieldValues>[];
  defaultValues?: TFieldValues;
}

export type {
  TypeValidationMode,
  TypeField,
  IGenerateForm,
  TFieldValues,
};
