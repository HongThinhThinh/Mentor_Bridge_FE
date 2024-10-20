/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { SCHEDULE_API, TEAM_API } from "../constants/endpoints";

const useStudentService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const createTeam = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("post", TEAM_API.TEAM);
      toast.success("Tạo team thành công");
      return response?.data;
    } catch (e: any) {
      toast.error(e?.response?.data || "Có lỗi khi tạo team");
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

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

  return { loading, createTeam, getSchedule };
};

export default useStudentService;
