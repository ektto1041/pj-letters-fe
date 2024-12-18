import { authAxios } from "@/shared";

export const getTreeByUserId = async (userId: string) => {
  const response = await authAxios.get<unknown>(`/api/tree/${userId}`);

  return response.data;
};

export const createTree = async (treeName: string) => {
  const response = await authAxios.post<unknown>(`api/tree/add`, {
    treeName,
  });

  return response.data;
};
