/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import api from "../config/api";
import { ADMIN_API } from "../constants/endpoints";

const useAdminService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post(ADMIN_API.UPLOADCSV, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("File uploaded successfully!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "File upload failed");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return {
    uploadFile,
    loading,
    setIsLoading,
  };
};

export default useAdminService;
