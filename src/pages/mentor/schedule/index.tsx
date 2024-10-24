import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import "./index.scss";
import Alert from "../../../components/atoms/alert";
import { useEffect, useState } from "react";
import UpdateScheduler from "../../../components/organisms/update-schedule";
import MeetingDetail from "../../../components/organisms/meeting-detail";
import useScheduleService from "../../../services/useScheduleService";
import { useCurrentUser } from "../../../utils/getcurrentUser";
function MentorSchedule() {
  const getListData = (value: Dayjs) => {
    let listData: { content: string }[] = [];
    switch (value.date()) {
      case 8:
        listData = [{ content: "Có 3 cuộc họp" }];
        break;
      default:
    }
    return listData || [];
  };

  const handleOpenMeetingDetails = async () => {
    setIsOpenDetail(true);
    return;
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData?.map((item) => (
          <div
            onClick={handleOpenMeetingDetails}
            className="flex justify-center items-center gap-2 px-[5px] py-[3px] rounded-[20px] border-[2px] border-[#000000] max-w-[130px]"
          >
            <AiOutlineVideoCamera color="#fe670d" size={20} />
            <p className="text-xs-bold">{item.content}</p>
          </div>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [isOpenMeetingDetail, setIsOpenDetail] = useState<boolean>();
  const [data, setdata] = useState("");
  const { getSchedule } = useScheduleService();
  const user = useCurrentUser();
  const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
  };
  const fetchData = async () => {
    try {
      const response = await getSchedule(user?.id);
      console.log(response);
      setdata(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(isEmpty(data));
  return (
    <>
      {/* <Button onClick={() => setIsopen(true)}>show Alert</Button> */}
      {/* {isEmpty(data) && (
        <>
          <UpdateScheduler />

        </>
      )} */}
      <MeetingDetail
        onCancel={() => setIsOpenDetail(false)}
        setIsOpenDetail={setIsOpenDetail}
        isOpen={isOpenMeetingDetail}
        date="14-10-2024"
      />
      <Calendar cellRender={cellRender} />
    </>
  );
}

export default MentorSchedule;
