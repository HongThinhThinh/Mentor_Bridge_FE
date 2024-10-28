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
  const [isOpenMeetingDetail, setIsOpenDetail] = useState(false);
  const [data, setData] = useState<Record<string, any>>({});
  const [selectedMeetingData, setSelectedMeetingData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState<number>(
    Number(moment().format("MM")) // Chỉ lưu trữ tháng hiện tại dưới dạng số
  );

  const { getBookingByRole } = useBookingService();

  const getListData = (value: Dayjs) => {
    const listData: { content: string }[] = [];
    const dateKey = value.format("YYYY-MM-DD");

    // Kiểm tra xem data có tồn tại và có chứa khóa dateKey
    if (data && data[dateKey] && Array.isArray(data[dateKey])) {
      data[dateKey].forEach((booking: any) => {
        listData.push({ content: `${booking?.student?.fullName} có cuộc họp` });
      });
    }

    return listData;
  };

  const fetchData = async (month: number) => {
    try {
      const response = await getBookingByRole(month);
      setData(response);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const handleOpenMeetingDetails = (value: Dayjs) => {
    const dateKey = value.format("YYYY-MM-DD"); // Đổi lại định dạng gốc
    console.log(data[dateKey]);
    setSelectedMeetingData(data[dateKey] || []);
    setSelectedDate(dateKey);
    setIsOpenDetail(true);
  };

  useEffect(() => {
    fetchData(currentMonth); // Lấy dữ liệu khi `currentMonth` thay đổi
  }, [currentMonth]);

  const onMonthChange = (date: Dayjs) => {
    const newMonth = date.month() + 1; // `month()` trả về giá trị từ 0-11 nên cần cộng thêm 1
    setCurrentMonth(newMonth);
    fetchData(newMonth);
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return listData && listData.length > 0 ? (
      <div
        onClick={() => handleOpenMeetingDetails(value)}
        className="flex justify-center items-center gap-2 rounded-[20px] border-[2px] border-[#000000] max-w-[130px] h-[40px] p-2"
      >
        <AiOutlineVideoCamera color="#fe670d" size={20} />
        <p className="text-xs-bold">Có {listData.length} cuộc họp</p>
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
