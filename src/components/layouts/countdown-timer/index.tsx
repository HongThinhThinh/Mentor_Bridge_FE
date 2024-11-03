import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button } from "antd";

interface CountdownTimerProps {
  targetDate: string | Date;
  dateTo: string | Date;
}

function calculateTimeRemaining(targetDate: string | Date): number {
  const currentTime = new Date();
  const targetTime = new Date(targetDate);
  const difference = targetTime.getTime() - currentTime.getTime();
  return difference > 0 ? difference : 0;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  dateTo,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    calculateTimeRemaining(targetDate)
  );
  const [dateToRemaining, setDateToRemaining] = useState<number | null>(null); // Initially null
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        // Countdown to targetDate
        setTimeRemaining(calculateTimeRemaining(targetDate));
      } else if (dateToRemaining === null) {
        // Start countdown to dateTo after targetDate expires
        setDateToRemaining(calculateTimeRemaining(dateTo));
      } else if (dateToRemaining > 0) {
        // Continue countdown to dateTo
        setDateToRemaining(calculateTimeRemaining(dateTo));
      } else {
        // When dateTo reaches zero, show modal
        clearInterval(interval);
        setIsModalVisible(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, dateTo, timeRemaining, dateToRemaining]);

  const seconds = Math.floor(((dateToRemaining ?? timeRemaining) / 1000) % 60);
  const minutes = Math.floor(
    ((dateToRemaining ?? timeRemaining) / 1000 / 60) % 60
  );
  const hours = Math.floor(
    ((dateToRemaining ?? timeRemaining) / (1000 * 60 * 60)) % 24
  );
  const days = Math.floor(
    (dateToRemaining ?? timeRemaining) / (1000 * 60 * 60 * 24)
  );

  const timeComponents = useMemo(() => {
    return [
      days > 0 ? `${days} ngày` : "",
      hours > 0 ? `${hours} giờ` : "",
      minutes > 0 ? `${minutes} phút` : "",
      seconds > 0 ? `${seconds} giây` : "",
    ].filter(Boolean); // Filter out empty elements
  }, [days, hours, minutes, seconds]);

  const handleModalOk = () => {
    setIsModalVisible(false);
    // Add any additional confirmation logic here
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {timeRemaining > 0 ? (
        <h6>{timeComponents.join(" ")}</h6>
      ) : dateToRemaining !== null && dateToRemaining > 0 ? (
        <h6>Cuộc họp đang diễn ra</h6>
      ) : (
        <h6>Đang chờ xác nhận</h6>
      )}

      <Modal
        title="Xác nhận cuộc hẹn"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Bạn có muốn xác nhận cuộc hẹn đã thành công không?</p>
      </Modal>
    </>
  );
};

export default CountdownTimer;
