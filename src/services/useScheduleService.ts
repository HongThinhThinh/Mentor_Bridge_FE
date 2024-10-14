/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { SCHEDULE_API } from "../constants/endpoints";

const useScheduleService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const postSchedule = useCallback(
    async (values: any) => {
      try {
        const response = await callApi("post", SCHEDULE_API.SCHEDULE, values);
        toast.success("Send Schedule Successfully !!!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to send schedule");
      }
    },
    [callApi]
  );

  return { postSchedule, loading, setIsLoading };
};

export default useScheduleService;
