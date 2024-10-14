import { Button } from "../button/Button";
import "./index.scss";
interface ContentsSectionProps {
  value?: string;
  content?: string;
  time?: string;
  status?: "pending" | "deny" | "success";
  isReady?: boolean;
  onClick?: () => void;
}
function ContentsSection({
  value,
  content,
  time,
  status,
  isReady = false,
  onClick,
}: ContentsSectionProps) {
  return (
    <li
      className={`flex items-center justify-between bg-white p-2 rounded-full hover:bg-gray-100 ${
        isReady && "bg-ready"
      }`}
    >
      <div
        className={`pl-4 flex-1 flex overflow-hidden ${content && "gap-10"}`}
      >
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
          styleClass={`btn-content-status-${status} btn-content-status  ${
            !status && "btn-content"
          } `}
        >
          {value}
        </Button>
      )}
    </li>
  );
}

export default ContentsSection;
