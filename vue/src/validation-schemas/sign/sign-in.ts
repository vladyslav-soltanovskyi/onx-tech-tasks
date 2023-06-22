import * as yup from 'yup';

const signInSchema = yup.object().shape({
  password: yup.string().required().min(6).max(100),
  email: yup.string().required().email(),
});

export { signInSchema };