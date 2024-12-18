import { authAxios } from "@/shared";
import { LetterInTree, NewLetter } from "../model/types";

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
