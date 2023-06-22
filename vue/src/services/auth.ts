import { ApiRoutes } from "@enums/api-routes"
import { AuthResponseDto, IUser, SignInDto, SignUpDto } from "@types-app/index";
import { AuthTokens } from "@enums/auth";
import axios from "./request"

const fetchCurrentUser = async (): Promise<IUser> => {
  const { data } = await axios.get<IUser>(ApiRoutes.CURRENT_USER);
  return data;
}

const signUp = async (signUpData: SignUpDto): Promise<AuthResponseDto> => {
  const { data } = await axios.post<AuthResponseDto>(ApiRoutes.SIGN_UP, signUpData);
  return data;
}

const signIn = async (signInData: SignInDto): Promise<AuthResponseDto> => {
  const { data } = await axios.post<AuthResponseDto>(ApiRoutes.SIGN_IN, signInData);
  return data;
}

const signOut = async (): Promise<void> => await axios.post(ApiRoutes.SIGN_OUT);

const setToken = (token: string | null = null) => localStorage.setItem(AuthTokens.TOKEN, token);
const getToken = () => localStorage.getItem(AuthTokens.TOKEN);
const removeToken = () => localStorage.removeItem(AuthTokens.TOKEN);

const authService = {
  fetchCurrentUser,
  signUp,
  signIn,
  signOut,
  removeToken,
  setToken,
  getToken
}

export default authService;