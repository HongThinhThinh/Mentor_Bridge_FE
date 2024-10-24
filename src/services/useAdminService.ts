/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import api from "../config/api";
import { ADMIN_API } from "../constants/endpoints";
import { Role, SystemRole } from "../constants/role";

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

  // Adding the new API call for fetching admin data
  const getAdminData = useCallback(
    async (search?: string, role?: SystemRole, page = 0, size = 10) => {
      try {
        setIsLoading(true);
        const response = await callApi("get", `${ADMIN_API.ADMIN}`, {
          params: { search, role, page, size },
        });
        toast.success("Admin data retrieved successfully!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to retrieve admin data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return {
    uploadFile,
    getAdminData,
    loading,
    setIsLoading,
  };
};

export default useAdminService;
