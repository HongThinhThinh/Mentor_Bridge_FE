import { useCallback, useEffect, useState } from "react";
import img from "../../../assets/avatar.svg";
import useGetParams from "../../../hooks/useGetParams";
import useBookingService from "../../../services/useBookingService";
import { Button } from "../../atoms/button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ConfirmReschedule() {
  const { loading, getBookingDetails, confirmReschedule } = useBookingService();
  const getParams = useGetParams();
  const bookingId = getParams("bookingId");
  const newTimeFrameId = getParams("newTimeFrameId");
  const token = getParams("token");
  const navigate = useNavigate();

  const [bookingDetail, setBookingDetail] = useState(null);

  const formatDate = (isoDate: any) => {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBookingDetails(bookingId);
        console.log(res);
        setBookingDetail(res);
      } catch (error) {}
    };
    fetchBooking();
  }, []);

  const handleAccept = useCallback(async () => {
    try {
      await confirmReschedule(bookingId, true, newTimeFrameId);
      // Xử lý tiếp theo sau khi chấp nhận, ví dụ như thông báo hoặc điều hướng
      toast.success("Chấp nhận thành công");
      navigate("/student/home");
    } catch (error) {
      console.error("Failed to confirm reschedule:", error);
    }
  }, [confirmReschedule, bookingId, newTimeFrameId]);

  return (
    <div className="flex justify-between items-center h-[100vh] p-5">
      <div className="flex items-center w-full pl-5">
        <div className="max-w-2xl mb-8">
          <h1 className="text-2xl-medium  leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-3xl xl:leading-tight dark:text-white">
            Xin chào,
          </h1>
          <p className="py-5 text-xl-medium font-normal leading-normal text-black lg:text-2xl-black xl:text-2xl-black dark:text-gray-300 ">
            Giảng viên{" "}
            <span className="font-bold">
              {bookingDetail?.mentor?.fullName + " "}
            </span>
            đã dời lịch cuộc họp từ{" "}
            <strong>
              {formatDate(bookingDetail?.timeFrame?.timeFrameFrom)}
            </strong>{" "}
            sang ngày <strong>[ngày mới]</strong> lúc <strong>[giờ mới]</strong>
            .
            <br /> Bạn có chấp nhận sự thay đổi này không?
          </p>

          <div className="flex flex-col items-end">
            <div className="flex gap-5">
              <Button
                status="feedback"
                children="Từ chối"
                styleClass="w-[180px] bg-transparent border border-[#D5D5D7] text-black"
                fontSize="xl"
              />

              <Button
                type="submit"
                onClick={handleAccept}
                children="Chấp nhận"
                styleClass="w-[200px] text-shade-300 bg-transparent border border-[#D5D5D7] 
         bg-gradient-to-r from-[#FF6001] from-43.73%  to-[#F9A26E] to-99.08%"
                fontSize="xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="">
          <img
            className="h-80 w-64"
            src={img}
            alt="Avatar image"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmReschedule;
