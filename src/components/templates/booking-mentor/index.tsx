import { Collapse, Select, Space } from "antd";
import { Mentor } from "../../../pages/student/booking";
import { useEffect, useState } from "react";
import useAdminService from "../../../services/useAdminService";
import useBookingService from "../../../services/useBookingService";
import ContentsSection from "../../atoms/contents-section/ContentsSection";

interface BookingMentorProps {
}

export interface TimeFrame {
  id: string;
  timeFrameFrom: string;
  timeFrameTo: string;
  timeFrameStatus: string;
}

const { Panel } = Collapse;

function BookingMentor({

}: BookingMentorProps) {
  const [selectedMentor, setSelectedMentor] = useState();
  const [items, setItems] = useState([]);
  const [scheduleItems, setScheduleItems] = useState([])
  const [isFetching, setIsFetching] = useState(false);

  const { getSchedule } = useBookingService();

  const { getAdminData } = useAdminService();

  const fetchData = async () => {
    setIsFetching(true);
    getAdminData(undefined, "MENTOR")
      .then(listMentor => {
        setItems(listMentor.content.map((mentor: Mentor) => ({
          value: mentor.id,
          label: mentor.fullName
        })));
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      }).finally(() => {
        setIsFetching(false);
      });

  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (value: string) => {
    setSelectedMentor(items?.find((item) => item.value === value)?.label);
    setIsFetching(true);
    getSchedule(value)
      .then(listSchedule => {
        setScheduleItems(listSchedule);
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      }).finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        defaultValue={items[0]}
        style={{ width: 120 }}
        onChange={handleChange}
        placeholder="Chọn giáo viên"
        options={items}
      />

      <Collapse items={scheduleItems} bordered={false} >
        {Object.entries(scheduleItems).map(([date, timeFrames]) => (
          <Panel header={date} key={date}>
            <div className="flex flex-col gap-3">
              {(timeFrames ? timeFrames : []).map((timeFrame: TimeFrame) => (
                <ContentsSection status="none" content={selectedMentor} time={`${timeFrame.timeFrameFrom} - ${timeFrame.timeFrameTo}`} key={timeFrame.id} />
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default BookingMentor;
