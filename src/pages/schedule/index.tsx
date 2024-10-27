import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import "./index.scss";
import { useEffect, useState } from "react";
import MeetingDetail from "../../components/organisms/meeting-detail";
import useBookingService from "../../services/useBookingService";

function SchedulePage() {
  const [isOpenMeetingDetail, setIsOpenDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>({}); // Store booking data as an object
  const [selectedMeetingData, setSelectedMeetingData] = useState<any[]>([]); // Store the meeting data for the selected day
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { getBookingByRole } = useBookingService();

  // Fetch booking data
  const fetchData = async () => {
    try {
      const response = await getBookingByRole(10);
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleOpenMeetingDetails = (value: Dayjs) => {
    const dateKey = value?.format("YYYY-MM-DD");
    setSelectedMeetingData(data[dateKey] || []); // Set the meeting data for the selected day
    setSelectedDate(dateKey); // Store the selected date
    setIsOpenDetail(true); // Open the meeting details modal
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
      <Calendar cellRender={cellRender} />
      <MeetingDetail
        onCancel={() => setIsOpenDetail(false)}
        setIsOpenDetail={setIsOpenDetail}
        isOpen={isOpenMeetingDetail}
        date={selectedDate}
        meetings={selectedMeetingData} // Pass the selected meeting data
      />
    </>
  );
}

export default SchedulePage;
