import React, { useState } from "react";
import { CustomModal } from "../../molecules/modal/Modal";
import { Button } from "../../atoms/button/Button";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { Select } from "antd";
import "./index.scss";
import { formatHours } from "../../../utils/dateFormat";
import { useCurrentUser } from "../../../utils/getcurrentUser";

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
  const user = useCurrentUser();

  const header = (
    <div>
      <h1 className="text-2xl-medium mb-3">Thông tin cuộc họp</h1>
      <Button size="xs" status="date">
        <p className="text-xs-medium">{date}</p>
      </Button>
    </div>
  );

  const handleJoinMeeting = (meetingURL: string) => {
    window.open(meetingURL);
  };

  const handleShowMeetingName = (data: any) => {
    if (user?.role === "STUDENT") {
      return data?.mentor?.fullName || data?.mentor?.email;
    }
    if (user?.role === "MENTOR") {
      return data?.student?.fullName || data?.team?.code;
    }
    return null;
  };

  const sortedMeetings = meetings.slice().sort((a, b) => {
    const timeA = new Date(a.timeFrame?.timeFrameFrom).getTime();
    const timeB = new Date(b.timeFrame?.timeFrameFrom).getTime();
    return timeA - timeB;
  });

  const body = (
    <div className="modal-container">
      <div className="modal-container__list">
        <h1 className="text-xl-medium">Danh sách cuộc họp trong ngày</h1>
        {sortedMeetings.length > 0 ? (
          sortedMeetings.map((meeting) => (
            <ContentsSection
              content={handleShowMeetingName(meeting)}
              key={meeting.id}
              time={`${formatHours(
                meeting.timeFrame?.timeFrameFrom
              )} - ${formatHours(meeting.timeFrame?.timeFrameTo)}`}
              status="success"
              value="Tham gia họp"
              onClick={() => handleJoinMeeting(meeting?.meetLink)}
              isReady={meeting.isReady}
            />
          ))
        ) : (
          <p>Không có cuộc họp nào trong ngày này.</p>
        )}
      </div>

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

  const footer = isReschedule ? (
    <div className="footer-container">
      <Button
        onClick={() => {
          if (setIsOpenDetail) setIsOpenDetail(false);
          setIsReschedule(false);
        }}
        styleClass="footer-btn--cancel"
      >
        Hủy
      </Button>
      <Button styleClass="footer-btn--submit" size="sm" type="submit">
        <div className="flex justify-center items-center">
          <p className="mr-2">Xác nhận</p> <AiOutlineSend size={18} />
        </div>
      </Button>
    </div>
  ) : (
    <div className="flex justify-end items-end">
      <Button
        onClick={() => setIsReschedule(true)}
        styleClass="footer-btn--reschedule"
      >
        Dời cuộc họp
      </Button>
    </div>
  );

  return (
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
  );
}

export default MeetingDetail;
