import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  name: yup.string().required().min(2).max(100),
  password: yup.string().required().min(6).max(100),
  email: yup.string().required().email(),
});

export { signUpSchema };