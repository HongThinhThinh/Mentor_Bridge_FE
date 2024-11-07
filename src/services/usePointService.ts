/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { POINTS_API } from "../constants/endpoints"; // Define POINTS_API in your endpoints file if not defined

const usePointsService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const getPointsHistory = useCallback(
    async (bookingTypeEnum?: string, pointChangeType?: string) => {
      try {
        setIsLoading(true);
        
        const params: Record<string, string | undefined> = {
          bookingTypeEnum,
          pointChangeType,
        };

        // Filter out undefined params
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v != null)
        );

        const response = await callApi(
          "get",
          POINTS_API.POINTS_HISTORY,
          { params: filteredParams }
        );

        if (response?.data) {
          toast.success("Fetched points history successfully!");
        }

        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to fetch points history");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return {
    getPointsHistory,
    loading,
  };
};

export default usePointsService;
