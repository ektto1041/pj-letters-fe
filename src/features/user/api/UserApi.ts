import { authAxios } from "@/shared";

export const uploadImage = async (formData: FormData) => {
  const reponse = await authAxios.put<unknown>(
    `/api/user/updateProfile`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return reponse.data;
};
