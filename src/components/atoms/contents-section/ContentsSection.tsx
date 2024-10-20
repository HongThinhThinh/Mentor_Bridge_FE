import { Avatar } from "antd";
import { Button } from "../button/Button";
import "./index.scss";

interface ContentsSectionProps {
  value?: string;
  content?: string;
  time?: string;
  status?: "pending" | "deny" | "success" | "feedback";
  isReady?: boolean;
  onClick?: () => void;
  isGroup?: boolean;
  avt: string | null | undefined; // Allow avt to be null or undefined
}

const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

function ContentsSection({
  value,
  content,
  time,
  status,
  isReady = false,
  isGroup = false,
  avt,
  onClick,
}: ContentsSectionProps) {
  return (
    <li
      className={`flex items-center justify-between border border-[#D5D5D7] bg-white p-2 rounded-full hover:bg-gray-100 ${
        isReady && "bg-ready"
      }`}
    >
      <div
        className={`pl-4 flex-1 flex overflow-hidden ${content && "gap-10"}`}
      >
        {isGroup && <Avatar src={avt || DEFAULT_AVATAR} />}{" "}
        {/* Fallback to default avatar */}
        <div className={`${content ? "w-[75%]" : "w-0"}  truncate`}>
          <span className="text-sm-book text">{content}</span>
        </div>
        <span className="text-sm-medium flex-1 text-time">{time}</span>
      </div>
      {isReady ? (
        <div className="flex gap-3">
          <Button size="xs" fontSize="xs" styleClass="btn-schedule--reschedule">
            Dời lịch
          </Button>
          <Button size="xs" fontSize="xs" styleClass="btn-schedule--meeting">
            Đến phòng họp
          </Button>
        </div>
      ) : (
        <Button
          size="xs"
          fontSize="xs"
          onClick={status ? () => {} : onClick}
          status={status}
        >
          {value}
        </Button>
      )}
    </li>
  );
}

export default ContentsSection;
