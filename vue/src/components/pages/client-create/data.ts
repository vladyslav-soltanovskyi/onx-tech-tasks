import { ApiRoutes } from "@enums/api-routes";
import { AppRouteNames, AppRoutes } from "@enums/route";
import { ICLientCreate } from "@types-app/client";
import { ICrudOptions } from "@types-app/crud";
import { TypeField } from "@types-app/generate-fom";

const clientsConfig: ICrudOptions = {
  name: AppRouteNames.CLIENTS,
  url: ApiRoutes.CLIENTS,
};

const employeesConfig: ICrudOptions = {
  name: 'Employees',
  url: ApiRoutes.EMPLOYEES,
};

const fields: TypeField<ICLientCreate>[] = [
  {
    type: 'input',
    valueKey: 'name',
    label: 'Name',
    placeholder: 'Enter name',
  },
  {
    type: 'input',
    valueKey: 'surname',
    label: 'Surname',
    placeholder: 'Enter surname',
  },
  {
    type: 'input',
    valueKey: 'email',
    label: 'Email',
    placeholder: 'Enter email',
  },
  {
    type: 'input',
    valueKey: 'address',
    label: 'Address',
    placeholder: 'Enter address',
  },
  {
    type: 'select',
    label: 'Employee',
    valueKey: 'employee_id'
  },
];

export { fields, clientsConfig, employeesConfig };