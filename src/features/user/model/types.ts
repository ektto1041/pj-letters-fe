export interface User {
  userId: string;
  email: string;
  name: string;
  profile: string;
}

export interface LoginReqDto {
  username: string;
  password: string;
}

export interface SignupReqDto {
  username: string;
  password: string;
  name: string;
  profile: string;
}
