/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { SCHEDULE_API } from "../constants/endpoints";
import { convertScheduleData } from "../utils/convertScheduleData";

const useScheduleService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const checkSchedule = useCallback(
    async (values: any, timeDuration: number) => {
      try {
        const dataFormat = convertScheduleData(values, timeDuration);
        const response = await callApi(
          "post",
          SCHEDULE_API.SCHEDULE_VALIDATE,
          dataFormat
        );
        if (response?.data.message) {
          toast.error(response?.data.message);
        }
        if (response?.data.overallErrorMessage) {
          toast.error(response?.data.overallErrorMessage);
        }
        if (
          response?.message.includes("Success") &&
          response?.data.overallErrorMessage == null
        ) {
          toast.success(response.message);
        }
        return response?.data;
      } catch (e: any) {
        console.log(e);
      }
    },
    [callApi]
  );

  return { checkSchedule, loading, setIsLoading };
};

export default useScheduleService;
