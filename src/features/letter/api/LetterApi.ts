import { authAxios } from "@/shared";
import { LetterInTree } from "../model/types";

export const getLettersByTreeId = async (treeId: number) => {
  const response = await authAxios.get<LetterInTree[]>(
    `/api/letter/tree/${treeId}`
  );

  return response.data;
};
