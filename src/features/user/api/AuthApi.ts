import { authAxios, noAuthAxios } from "@/shared";
import type { LoginReqDto, SignupReqDto, User } from "../model/types";

export const login = async (loginReqDto: LoginReqDto) => {
  const response = await noAuthAxios.post<User>(`api/auth/login`, loginReqDto);

  return response.data;
};

export const signup = async (signupReqDto: SignupReqDto) => {
  const reponse = await noAuthAxios.post<unknown>(
    `/api/auth/join`,
    signupReqDto
  );

  return reponse.data;
};

export const sendAuthCode = async (sendTo: string) => {
  const reponse = await noAuthAxios.post<unknown>(
    `/api/auth/send-email-code?sendTo=${sendTo}`
  );

  return reponse.data;
};

export const checkAuthCode = async (authCode: string) => {
  const reponse = await noAuthAxios.post<unknown>(
    `/api/auth/check-email-code?inputNum=${authCode}`
  );

  return reponse.data;
};

export const logout = async () => {
  const response = await authAxios.post<unknown>(`/api/user/logout`);

  return response.data;
};
