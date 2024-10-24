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

  const getBooking = useCallback(
    async (
      type: "INDIVIDUAL" | "TEAM" | undefined,
      status: "REQUESTED" | "ACCEPTED" | "REJECTED" | "CANCELLED"
    ) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "get",
          type
            ? `${BOOKING_API.BOOKING}?type=${type}&status=${status}`
            : `${BOOKING_API.BOOKING}?status=${status}`
        );
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  const getMentorBooking = useCallback(
    async (month: number) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "get",
          `${BOOKING_API.MENTOR_MEETING}?month=${month}`
        );
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  const updateBooking = useCallback(
    async (
      id: string,
      status: "REQUESTED" | "ACCEPTED" | "REJECTED" | "CANCELLED"
    ) => {
      try {
        setIsLoading(true);
        const response = await callApi("patch", BOOKING_API.BOOKING, {
          id: id,
          status: status,
        });
        toast.success("Cập nhật thành công!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  return { sendBooking, loading, getBooking, updateBooking, getMentorBooking };
};

export default useBookingService;
