import { authAxios } from "@/shared";
import { Friend } from "../model/types";

export const getFriends = async () => {
  const response = await authAxios.get<Friend[]>(`api/friend-list`);

  return response.data;
};
