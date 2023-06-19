import { VueIcons } from "@types-app/icon";

interface IBaseFormElementProps {
  label?: string;
  placeholder?: string;
  containerClassName?: string;
  value?: string;
  error?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
  isRequired?: boolean; 
}

interface IInputProps extends IBaseFormElementProps {
  iconClassName?: string;
  type?: string;
  withIcon?: boolean;
  iconName?: VueIcons; 
}

interface ITextareaProps extends IBaseFormElementProps {
  rows?: number;
}

interface IOption {
  value: string;
  text: string;
}

interface ISelectProps extends IBaseFormElementProps {
  rows?: number;
  options?: IOption[];
}

export type { IInputProps, IOption, ITextareaProps, ISelectProps };