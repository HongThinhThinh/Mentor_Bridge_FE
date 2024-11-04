/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { BOOKING_API, SCHEDULE_API } from "../constants/endpoints";
import { useCurrentUser } from "../utils/getcurrentUser";

const useBookingService = () => {
  const { callApi, loading, setIsLoading } = useApiService();
  const user = useCurrentUser();
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
      type: "INDIVIDUAL" | "TEAM" | undefined = undefined,
      status:
        | "REQUESTED"
        | "ACCEPTED"
        | "REJECTED"
        | "CANCELLED"
        | undefined = undefined
    ) => {
      let path = BOOKING_API.BOOKING;
      if (type) {
        path += `?type=${type}`;
        if (status) {
          path += `&status=${status}`;
        }
      } else if (status) {
        path += `?status=${status}`;
      }

      try {
        setIsLoading(true);
        const response = await callApi("get", path);
        return response?.data;
      } catch (e: any) {
        // toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  const getBookingByRole = useCallback(
    async (month: number) => {
      try {
        setIsLoading(true);
        const PATH =
          user?.role === "MENTOR"
            ? BOOKING_API.MENTOR_MEETING
            : BOOKING_API.STUDENT_MEETING;
        const response = await callApi("get", `${PATH}?month=${month}`);
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );
  const getBookingNearest = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await callApi("get", BOOKING_API.BOOKING_NEARST);
      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get data");
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  const makeBookingCompleted = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);

        const response = await callApi(
          "patch",
          `${BOOKING_API.BOOKING}/${id}/${BOOKING_API.FINISH} `
        );
        return response?.data;
      } catch (e: any) {
        // toast.error(e?.response?.data || "Failed to get data");
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
  const sendReschedule = useCallback(
    async (bookingId: string, newTimeFrameId: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `${BOOKING_API.BOOKING}/${bookingId}/${BOOKING_API.SEND_RESCHEDULE}?newTimeFrameId=${newTimeFrameId}`
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

  return {
    sendBooking,
    loading,
    getBooking,
    updateBooking,
    getBookingByRole,
    getBookingNearest,
    sendReschedule,
    makeBookingCompleted,
  };
};

export default useBookingService;
