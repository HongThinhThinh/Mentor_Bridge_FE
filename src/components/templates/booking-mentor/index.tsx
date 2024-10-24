import { Collapse, Select, Space } from "antd";
import { Mentor } from "../../../pages/student/booking";
import { useEffect, useState } from "react";
import useAdminService from "../../../services/useAdminService";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { Button } from "../../atoms/button/Button";
import useScheduleService from "../../../services/useScheduleService";
import useBookingService from "../../../services/useBookingService";

interface BookingMentorProps {}

export interface TimeFrame {
  id: string;
  timeFrameFrom: string;
  timeFrameTo: string;
  timeFrameStatus: string;
}

const { Panel } = Collapse;

function BookingMentor({

}: BookingMentorProps) {
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedMentorId, setSelectedMentorId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [items, setItems] = useState([]);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { getSchedule } = useScheduleService();

  const { sendBooking } = useBookingService();

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
    setSelectedType(value)
  } 


  const handleBooking = (id: string) => {
    sendBooking(id, selectedType);
    getSchedule(selectedMentorId)
      .then(listSchedule => {
        setScheduleItems(listSchedule);
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      }).finally(() => {
        setIsFetching(false);
      });
  }



  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <Select
          defaultValue={items[0]}
          style={{ width: 120 }}
          onChange={handleChange}
          placeholder="Chọn giáo viên"
          options={items}
        />

        <Select
          defaultValue={items[0]}
          style={{ width: 120 }}
          onChange={handleTypeChange}
          placeholder="Chọn loại yêu cầu"
          options={[{
            label: "Cá Nhân",
            value: "INDIVIDUAL"
          }, {
            label: "Nhóm",
            value: "TEAM"
          }]}
        />
      </div>
      <Collapse items={scheduleItems} bordered={false}>
        {Object?.entries(scheduleItems)?.map(([date, timeFrames]) => (
          <Panel header={date} key={date}>
            <div className="flex flex-col gap-3">
              {(timeFrames ? timeFrames : [])?.map((timeFrame: TimeFrame) => (
                timeFrame?.timeFrameStatus === "AVAILABLE" && <ContentsSection
                status="none"
                content=""
                time={`${timeFrame?.timeFrameFrom} - ${timeFrame?.timeFrameTo}`} key={timeFrame?.id}
                prefix={<Button
                  size="xxs"
                  fontSize="xs"
                  fontWeight="medium"
                  status="none"
                  variant="outlined"
                >
                  {selectedMentor}
                </Button>}

                suffix={<Button
                  size="xxs"
                  fontSize="xs"
                  fontWeight="medium"
                  onClick={() => handleBooking(timeFrame.id)}
                >
                  Đặt lịch
                </Button>}
              />
                
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default BookingMentor;
