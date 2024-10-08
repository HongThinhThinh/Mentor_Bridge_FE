/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import api from "../config/api";

const useAdminService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  // Function to upload a file
  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("admin/upload-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("File uploaded successfully!");
        return response?.data; // Return the response if you need it
      } catch (e: any) {
        toast.error(e?.response?.data || "File upload failed");
        throw e;
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
