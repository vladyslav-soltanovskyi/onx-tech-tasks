import * as yup from 'yup';

const editClientSchema = yup.object().shape({
  name: yup.string().required().min(2).max(100),
  surname: yup.string().required().min(2).max(100),
  email: yup.string().required().email().max(150),
  address: yup.string().required().min(5).max(150),
  employee_id: yup.string().required(),
});

export { editClientSchema };