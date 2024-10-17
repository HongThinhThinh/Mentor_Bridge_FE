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
        setIsLoading(true);
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
        toast.error(e?.response?.data);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  const sendSchedule = useCallback(
    async (values: any, timeDuration: number) => {
      try {
        setIsLoading(true);
        const dataFormat = convertScheduleData(values, timeDuration);
        const response = await callApi(
          "post",
          SCHEDULE_API.SCHEDULE,
          dataFormat
        );
        toast.success("Send Schedule Successfully !!!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to send schedule");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  const getSchedule = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const response = await callApi("get", SCHEDULE_API.SCHEDULE + `/${id}`);
        toast.success("Get Data Schedule Successfully !!!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  return { checkSchedule, loading, sendSchedule, getSchedule };
};

export default useScheduleService;
