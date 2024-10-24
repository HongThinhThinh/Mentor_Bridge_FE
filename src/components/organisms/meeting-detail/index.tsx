import { useState } from "react";
import { CustomModal } from "../../molecules/modal/Modal";
import { Button } from "../../atoms/button/Button";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { Select } from "antd";
import "./index.scss";
import { formatHours } from "../../../utils/dateFormat";

interface MeetingDetailProps {
  date?: string;
  width?: number;
  isOpen?: boolean;
  setIsOpenDetail?: (isOpen: boolean) => void;
  onCancel?: () => void;
  onFinish?: (values: any) => void;
  onValueChange?: (values: any) => void;
  meetings?: any[]; // Array of meetings passed from MentorSchedule
}

function MeetingDetail({
  date,
  isOpen,
  onCancel,
  onFinish,
  onValueChange,
  setIsOpenDetail,
  width,
  meetings = [], // Default to empty array if no meetings
}: MeetingDetailProps) {
  const [isReschedule, setIsReschedule] = useState(false); // State to control reschedule visibility

  const header = (
    <div>
      <h1 className="text-2xl-medium">Thông tin cuộc họp</h1>
      <Button size="xs" status="date">
        <p className="text-xs-medium">{date}</p>
      </Button>
    </div>
  );

  console.log(meetings);

  const body = (
    <div className="modal-container">
      <div className="modal-container__list">
        <h1 className="text-xl-medium">Danh sách cuộc họp trong ngày</h1>
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <ContentsSection
              content={meeting?.student?.fullName}
              key={meeting.id}
              time={`${formatHours(
                meeting.timeFrame?.timeFrameFrom
              )} - ${formatHours(meeting.timeFrame?.timeFrameTo)}`}
              status="success"
              value="Tham gia họp"
              isReady={meeting.isReady}
            />
          ))
        ) : (
          <p>Không có cuộc họp nào trong ngày này.</p>
        )}
      </div>

      {/* Conditionally show the reschedule section */}
      {isReschedule && (
        <div className="modal-container__time-container">
          <h1 className="text-xl-medium">Dời cuộc họp lúc 15:30 đến</h1>
          <div className="flex gap-5 items-center justify-around modal-container__time-wrapper">
            <Select
              defaultValue="12-10-2024 15:30"
              style={{ width: 161 }}
              options={[
                { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
              ]}
            />
            <FaArrowRight />
            <Select
              defaultValue="12-10-2024 15:30"
              style={{ width: 161 }}
              options={[
                { value: "12-10-2024 15:31", label: "12-10-2024 15:30" },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );

  const footer = (
    <div className="footer-container">
      <Button
        onClick={() => setIsOpenDetail && setIsOpenDetail(false)}
        styleClass="footer-btn--cancel"
      >
        Hủy
      </Button>
      <Button
        onClick={() => setIsReschedule(true)}
        styleClass="footer-btn--reschedule"
      >
        Dời cuộc họp
      </Button>
      <Button
        styleClass="footer-btn--submit"
        children={
          <div className="flex justify-center items-center ">
            <p className="mr-2">Xác nhận</p> <AiOutlineSend size={18} />
          </div>
        }
        size="sm"
        type="submit"
      />
    </div>
  );

  return (
    <>
      <CustomModal
        onValueChange={onValueChange}
        header={header}
        width={width}
        body={body}
        footer={footer}
        isOpen={isOpen}
        onCancel={onCancel}
        onFinish={onFinish}
      />
    </>
  );
}

export default MeetingDetail;
