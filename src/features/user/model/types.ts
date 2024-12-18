export interface User {
  token: string;
  email: string;
  nickname: string;
  profile: string;
  userId: string;
}

export interface LoginReqDto {
  username: string;
  password: string;
}

export interface SignupReqDto {
  username: string;
  password: string;
  nickname: string;
  profile: string;
}
