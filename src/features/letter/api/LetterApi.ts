import { authAxios } from "@/shared";
import { LetterItem, LetterInTree, NewLetter } from "../model/types";

export const getLettersByTreeId = async (treeId: number) => {
  const response = await authAxios.get<LetterInTree[]>(
    `/api/letter/tree/${treeId}`
  );

  return response.data;
};

export const createLetter = async (newLetter: NewLetter) => {
  const response = await authAxios.post<unknown>(`api/letter/write`, newLetter);

  return response.data;
};

export const getLetterById = async (letterId: number) => {
  const reponse = await authAxios.get<LetterItem>(`api/letter/${letterId}`);

  return reponse.data;
};
