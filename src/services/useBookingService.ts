/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { BOOKING_API, SCHEDULE_API } from "../constants/endpoints";

const useBookingService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const sendBooking = useCallback(
    async (timeFrameId: string, type: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "post",
          `${BOOKING_API.BOOKING}?timeFrameId=${timeFrameId}&type=${type}`
        );
        toast.success("Booking Successful!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to Book");
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
        const response = await callApi("get", `${SCHEDULE_API.SCHEDULE}/${id}`);
        toast.success("Data Schedule Retrieved Successfully!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to Retrieve Data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  return { sendBooking, loading, getSchedule };
};

export default useBookingService;
