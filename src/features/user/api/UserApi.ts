import { authAxios } from "@/shared";

export const uploadImage = async (formData: FormData) => {
  const reponse = await authAxios.post<unknown>(`/api/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return reponse.data;
};
