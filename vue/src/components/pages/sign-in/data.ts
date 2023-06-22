import { SignInDto, TypeField } from "@types-app/index";

const fields: TypeField<SignInDto>[] = [
  {
    type: 'input',
    valueKey: 'email',
    label: 'Email',
    placeholder: 'Enter email',
  },
  {
    type: 'password',
    valueKey: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    autocomplete: "password"
  }
];

export { fields };