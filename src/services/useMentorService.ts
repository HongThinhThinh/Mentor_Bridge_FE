/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { TEAM_API } from "../constants/endpoints";

const useMentorService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const getTeams = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await callApi("get", `${TEAM_API.TEAM}/mentorId`);

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
    getTeams,
  };
};

export default useMentorService;
