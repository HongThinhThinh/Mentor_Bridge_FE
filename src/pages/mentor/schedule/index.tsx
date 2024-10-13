import type { CalendarProps } from "antd";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { AiOutlineVideoCamera } from "react-icons/ai";
import "./index.scss";
function MentorSchedule() {
  const headerRender = () => {
    return <span className="text-xs-bold">Hi</span>;
  };
  const getListData = (value: Dayjs) => {
    // let listData: { type: string; content: string }[] = [];
    let listData: { content: string }[] = [];
    switch (value.date()) {
      case 8:
        listData = [{ content: "Có 3 cuộc họp" }];
        break;
      default:
    }
    return listData || [];
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
        {listData.map((item) => (
          <div className="flex justify-center items-center gap-2 px-[5px] py-[3px] rounded-[20px] border-[2px] border-[#000000] max-w-[130px]">
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

  return <Calendar cellRender={cellRender} />;
}

export default MentorSchedule;
