import { authAxios, noAuthAxios } from "@/shared";
import type { LoginReqDto, SignupReqDto } from "../model/types";

export const login = async (loginReqDto: LoginReqDto) => {
  const response = await noAuthAxios.post<unknown>(`/auth/login`, loginReqDto);

  return response.data;
};

export const signup = async (signupReqDto: SignupReqDto) => {
  const reponse = await noAuthAxios.post<unknown>(
    `/api/user/join`,
    signupReqDto
  );

  return reponse.data;
};

export const sendAuthCode = async (sendTo: string) => {
  const reponse = await noAuthAxios.post<unknown>(
    `/api/user/send-email-code?sendTo=${sendTo}`
  );

  return reponse.data;
};

export const checkAuthCode = async (authCode: string) => {
  const reponse = await noAuthAxios.post<unknown>(
    `/api/user/check-email-code?inputNum=${authCode}`
  );

  return reponse.data;
};

export const logout = async () => {
  const response = await authAxios.post<unknown>(`/api/user/logout`);

  return response.data;
};
