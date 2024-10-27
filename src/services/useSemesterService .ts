/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { SEMESTER_API } from "../constants/endpoints";

const useSemesterService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const getUpcomingSemester = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await callApi(
        "get",
        `${SEMESTER_API.SEMESTER}/status?status=UPCOMING`
      );

      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get upcoming semester");
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    loading,
    setIsLoading,
    getUpcomingSemester,
  };
};

export default useSemesterService;
