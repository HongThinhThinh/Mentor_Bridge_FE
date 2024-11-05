import React, { useEffect, useState } from "react";
import { CustomModal } from "../../molecules/modal/Modal";
import { Button } from "../../atoms/button/Button";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { AiOutlineSend } from "react-icons/ai";
import { Collapse, Empty, Popconfirm, Select, Tag } from "antd";
import "./index.scss";
import {
  formatDateAndHour,
  formatDateForRequest,
  formatDateToDDMMYY,
  formatHours,
} from "../../../utils/dateFormat";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import useScheduleService from "../../../services/useScheduleService";
import { TimeFrame } from "../../templates/booking-mentor";
import { PiSwapLight } from "react-icons/pi";
import useBookingService from "../../../services/useBookingService";
import { Role } from "../../../constants/role";
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
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const { getSchedule } = useScheduleService();
  const { sendReschedule } = useBookingService();
  const [schedule, setSchedule] = useState([]);
  const { Panel } = Collapse;
  const fetchSchedule = async () => {
    try {
      const response = await getSchedule(user?.id);
      console.log(response);
      setSchedule(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

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

  // Generate options dynamically based on available meeting times
  const rescheduleOptions = sortedMeetings.map((meeting) => ({
    value: meeting.timeFrame?.timeFrameFrom,
    label: `${meeting.timeFrame?.date} ${formatHours(
      meeting.timeFrame?.timeFrameFrom
    )}`,
  }));

  const body = (
    <div className="modal-container">
      <div className="modal-container__list">
        <h1 className="text-xl-medium">Danh sách cuộc họp trong ngày</h1>
        {sortedMeetings.length > 0 ? (
          sortedMeetings.map((meeting) => (
            <>
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
              {user?.role !== Role.STUDENT && (
                <div className="flex justify-end items-end w-full">
                  <PiSwapLight
                    style={{
                      fontSize: "20px",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log(meeting);
                      setSelectedMeeting(meeting);
                      setIsReschedule(true);
                    }}
                  />
                </div>
              )}
            </>
          ))
        ) : (
          <p>Không có cuộc họp nào trong ngày này.</p>
        )}
      </div>

      {isReschedule && (
        <div className="modal-container__time-container">
          <h1 className="text-xl-medium">
            Dời cuộc họp của{" "}
            {selectedMeeting?.team != null ? (
              <Tag
                style={{
                  fontSize: "15px",
                }}
                color="green"
              >
                Nhóm {selectedMeeting?.team.code}
              </Tag>
            ) : (
              <Tag
                style={{
                  fontSize: "15px",
                }}
                color="green"
              >
                {selectedMeeting?.student?.fullName}
              </Tag>
            )}{" "}
            từ:
            <p className="my-2">
              {formatDateForRequest(
                selectedMeeting.timeFrame?.timeFrameFrom,
                selectedMeeting.timeFrame?.timeFrameTo
              )}
            </p>
            đến
          </h1>
          <div className="flex gap-5 items-center justify-around modal-container__time-wrapper">
            <Collapse className="w-full" items={schedule} bordered={false}>
              {Object.entries(schedule).map(([date, timeFrames]) => (
                <Panel header={date} key={date}>
                  <div className="flex flex-col gap-3">
                    {timeFrames?.filter(
                      (timeFrame: TimeFrame) =>
                        timeFrame?.timeFrameStatus === "AVAILABLE" ||
                        timeFrame?.timeFrameStatus === "REQUESTED"
                    ).length > 0 ? (
                      timeFrames
                        .filter(
                          (timeFrame: TimeFrame) =>
                            timeFrame?.timeFrameStatus === "AVAILABLE" ||
                            timeFrame?.timeFrameStatus === "REQUESTED"
                        )
                        .map((timeFrame: TimeFrame) => (
                          <>
                            <ContentsSection
                              status="none"
                              content=""
                              time={`${formatHours(
                                timeFrame?.timeFrameFrom
                              )} - ${formatHours(timeFrame?.timeFrameTo)}`}
                              key={timeFrame?.id}
                              suffix={
                                <Popconfirm
                                  onConfirm={() => {
                                    sendReschedule(
                                      selectedMeeting?.id,
                                      timeFrame.id
                                    );
                                    onCancel();
                                  }}
                                  title="Bạn có chắc muốn dời sang ngày này chứ?"
                                >
                                  <Button
                                    // loading={loading}
                                    key={timeFrame?.id}
                                    size="xxs"
                                    fontSize="xs"
                                    fontWeight="medium"
                                  >
                                    Dời sang ngày này
                                  </Button>
                                </Popconfirm>
                              }
                            />
                          </>
                        ))
                    ) : (
                      <Empty description="Không có khung giờ nào khả dụng" />
                    )}
                  </div>
                </Panel>
              ))}
            </Collapse>
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
      {/* <Button
        onClick={() => setIsReschedule(true)}
        styleClass="footer-btn--reschedule"
      >
        Dời cuộc họp
      </Button> */}
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
