import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import "./index.scss";
import { useEffect, useState } from "react";
import MeetingDetail from "../../components/organisms/meeting-detail";
import useBookingService from "../../services/useBookingService";
import moment from "moment";

function SchedulePage() {
  const [isOpenMeetingDetail, setIsOpenDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [selectedMeetingData, setSelectedMeetingData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format("YYYY-MM")
  ); // Lưu trữ tháng hiện tại

  const { getBookingByRole } = useBookingService();

  const getListData = (value: Dayjs) => {
    let listData: { content: string }[] = [];
    const dateKey = value.format("YYYY-MM-DD");
    if (data && data[dateKey]) {
      data[dateKey].forEach((booking: any) => {
        listData.push({ content: `${booking.student.fullName} có cuộc họp` });
      });
    }

    return listData;
  };

  const fetchData = async (dateValue: string) => {
    try {
      const response = await getBookingByRole(dateValue);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMeetingDetails = (value: Dayjs) => {
    const dateKey = value?.format("YYYY-MM-DD");
    if (dateKey) {
      setSelectedMeetingData(data[dateKey] || []);
      setSelectedDate(dateKey);
      setIsOpenDetail(true);
    }
  };

  useEffect(() => {
    fetchData(currentMonth); // Lấy dữ liệu mặc định theo tháng hiện tại
  }, [currentMonth]);

  const onMonthChange = (date: Dayjs) => {
    const newMonth = date.format("MM");
    setCurrentMonth(newMonth); // Cập nhật tháng khi thay đổi tháng
    fetchData(newMonth); // Gọi lại fetchData với tháng mới
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return listData.length > 0 ? (
      <div
        onClick={() => handleOpenMeetingDetails(value)}
        className="flex justify-center items-center gap-2 rounded-[20px] border-[2px] border-[#000000] max-w-[130px] h-[40px] p-2"
      >
        <AiOutlineVideoCamera color="#fe670d" size={20} />
        <p className="text-xs-bold">Có {listData?.length} cuộc họp</p>
      </div>
    ) : null;
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Calendar onPanelChange={onMonthChange} cellRender={cellRender} />
      <MeetingDetail
        onCancel={() => setIsOpenDetail(false)}
        setIsOpenDetail={setIsOpenDetail}
        isOpen={isOpenMeetingDetail}
        date={selectedDate}
        meetings={selectedMeetingData}
      />
    </>
  );
}

export default SchedulePage;
