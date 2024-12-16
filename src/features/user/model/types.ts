export interface User {
  userId: string;
  email: string;
  name: string;
  profile: string;
}

export interface LoginReqDto {
  email: string;
  password: string;
}

export interface SignupReqDto {
  email: string;
  password: string;
  name: string;
  profile: string;
}
