import { useState } from "react";
import Alert from "../../../components/atoms/alert";
import VerticalScheduler from "../../../components/molecules/vertical-scheduler";
import UpdateScheduler from "../../../components/organisms/update-schedule";

const EmptySchedulePage = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  return (
    <div className="relative">
      <div className="absolute -top-[75px] left-56">
        <UpdateScheduler />
      </div>
      <div className="mt-5 empty-schedule">
        <Alert
          onCancel={() => setIsopen(false)}
          open={true}
          type="error"
          message="Giảng viên vui lòng cập nhật lịch trống trước ngày 30-08-2024"
          timeClose={3}
        />

        <VerticalScheduler />
      </div>
    </div>
  );
};

export default EmptySchedulePage;
