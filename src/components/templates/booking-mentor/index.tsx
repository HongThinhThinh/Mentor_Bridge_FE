import { Select, Space } from "antd";
import { Mentor } from "../../../pages/student/booking";
import { useEffect, useState } from "react";
import useAdminService from "../../../services/useAdminService";
import useBookingService from "../../../services/useBookingService";

interface BookingMentorProps {
}



function BookingMentor({

}: BookingMentorProps) {
  const [items, setItems] = useState([]);
  const [scheduleItems, sétcheduleItems] = useState([ ])
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
    setIsFetching(true);
    getSchedule(value)
      .then(listSchedule => {
        
        console.log(listSchedule);

        
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      }).finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <div>
<Select
      defaultValue={items[0]}
      style={{ width: 120 }}
      onChange={handleChange}
      placeholder="Chọn giáo viên"
      options={items}
    />

<Collapse
      bordered={false}
      defaultActiveKey={['1']}
      items={}
    />
    </div>
  );
}

export default BookingMentor;
