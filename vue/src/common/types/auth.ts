import { IUser } from "./user";

interface SignUpDto {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}

interface SignInDto {
  email: string;
  password: string;
}

interface AuthResponseDto {
  token: string;
  user: IUser;
}

export type { SignUpDto, SignInDto, AuthResponseDto };