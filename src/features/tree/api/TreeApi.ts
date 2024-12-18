import { authAxios } from "@/shared";
import { Tree } from "../model/types";

export const getTreeByUserId = async (userId: string) => {
  const response = await authAxios.get<Tree>(`/api/tree/${userId}`);

  return response.data;
};

export const createTree = async (treeName: string) => {
  const response = await authAxios.post<unknown>(`api/tree/add`, {
    treeName,
  });

  return response.data;
};

export const updateTreeName = async (userId: string, treeName: string) => {
  const response = await authAxios.put<unknown>(`api/tree/${userId}`, {
    treeName,
  });

  return response.data;
};
