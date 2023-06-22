import { ApiRoutes } from "@enums/api-routes";
import { SignUpDto, TypeField } from "@types-app/index";

const fields: TypeField<SignUpDto>[] = [
  {
    type: 'input',
    valueKey: 'name',
    label: 'Name',
    placeholder: 'Enter name'
  },
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
    autocomplete: 'password'
  }
];

export { fields };