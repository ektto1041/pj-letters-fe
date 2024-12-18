import { authAxios } from "@/shared";
import { NewLetter } from "../model/types";

export const createLetter = async (newLetter: NewLetter) => {
  const response = await authAxios.post<unknown>(`api/letter/write`, newLetter);

  return response.data;
};
