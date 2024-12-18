import { authAxios } from "@/shared";
import { LetterItem, NewLetter } from "../model/types";

export const createLetter = async (newLetter: NewLetter) => {
  const response = await authAxios.post<unknown>(`api/letter/write`, newLetter);

  return response.data;
};

export const getLetterById = async (letterId: number) => {
  const reponse = await authAxios.get<LetterItem>(`api/letter/${letterId}`);

  return reponse.data;
};
