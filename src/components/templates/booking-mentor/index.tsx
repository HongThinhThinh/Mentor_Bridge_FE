import { Collapse, Empty, Form, Select, Space, Spin } from "antd";
import { Mentor } from "../../../pages/student/booking";
import { useEffect, useState } from "react";
import useAdminService from "../../../services/useAdminService";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { Button } from "../../atoms/button/Button";
import useScheduleService from "../../../services/useScheduleService";
import useBookingService from "../../../services/useBookingService";
import { formatHours } from "../../../utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTES, USER_ROUTES } from "../../../constants/routes";

interface BookingMentorProps {}

export interface TimeFrame {
  id: string;
  timeFrameFrom: string;
  timeFrameTo: string;
  timeFrameStatus: string;
}

const { Panel } = Collapse;

function BookingMentor({}: BookingMentorProps) {
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedMentorId, setSelectedMentorId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [items, setItems] = useState([]);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const { getSchedule } = useScheduleService();
  const { sendBooking, loading } = useBookingService();
  const { getAdminData } = useAdminService();

  const fetchData = async () => {
    setIsFetching(true);
    getAdminData(undefined, "MENTOR")
      .then((listMentor) => {
        setItems(
          listMentor.content.map((mentor: Mentor) => ({
            value: mentor.id,
            label: mentor.fullName,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [scheduleItems]);

  const handleChange = (value: string) => {
    setSelectedMentorId(value);
    setSelectedMentor(items?.find((item) => item?.value === value)?.label);
    setIsFetching(true);
    getSchedule(value)
      .then((listSchedule) => {
        setScheduleItems(listSchedule);
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleBooking = async (id: string) => {
    setIsFetching(true); // Bật loading để cho người dùng thấy

    console.log(selectedType);
    try {
      await sendBooking(id, selectedType);
      // Sau khi đặt lịch thành công, gọi lại fetchData để lấy lại danh sách giáo viên
      await fetchData();
      navigate(`/${STUDENT_ROUTES.STUDENT}/${USER_ROUTES.BOOKING_HISTORY}`);
      if (selectedMentorId) {
        const listSchedule = await getSchedule(selectedMentorId);
        setScheduleItems(listSchedule);
      }
    } catch (error) {
      console.error("Error during booking:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <Select
          defaultValue={items[0]}
          style={{ width: 180 }}
          onChange={handleChange}
          placeholder="Chọn giáo viên"
          options={items}
        />
        <Form initialValues={{ requestType: "TEAM" }}>
          <Form.Item
            name="requestType"
            rules={[{ required: true, message: "Vui lòng chọn loại yêu cầu!" }]}
          >
            <Select
              style={{ width: 120 }}
              onChange={handleTypeChange}
              placeholder="Chọn loại yêu cầu"
              options={[
                {
                  label: "Cá Nhân",
                  value: "INDIVIDUAL",
                },
                {
                  label: "Nhóm",
                  value: "TEAM",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
      {isFetching ? (
        <Spin />
      ) : (
        <Collapse items={scheduleItems} bordered={false}>
          {Object.entries(scheduleItems).map(([date, timeFrames]) => (
            <Panel header={date} key={date}>
              <div className="flex flex-col gap-3">
                {timeFrames?.filter(
                  (timeFrame: TimeFrame) =>
                    timeFrame?.timeFrameStatus === "AVAILABLE"
                ).length > 0 ? (
                  timeFrames
                    .filter(
                      (timeFrame: TimeFrame) =>
                        timeFrame?.timeFrameStatus === "AVAILABLE"
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
                          prefix={
                            <Button
                              size="xxs"
                              fontSize="xs"
                              fontWeight="medium"
                              status="none"
                              variant="outlined"
                            >
                              {selectedMentor}
                            </Button>
                          }
                          suffix={
                            <Button
                              loading={loading}
                              key={timeFrame?.id}
                              size="xxs"
                              fontSize="xs"
                              fontWeight="medium"
                              onClick={() => {
                                handleBooking(timeFrame.id);
                              }}
                            >
                              Đặt lịch
                            </Button>
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
      )}
    </div>
  );
}

export default BookingMentor;
