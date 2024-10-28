import React, { useEffect, useMemo, useState } from "react";

// Define the type for the prop targetDate
interface CountdownTimerProps {
  targetDate: string | Date;
}

function calculateTimeRemaining(targetDate: string | Date): number {
  const currentTime = new Date();
  const targetTime = new Date(targetDate);
  const difference = targetTime.getTime() - currentTime.getTime();
  return difference > 0 ? difference : 0;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

  const timeComponents = useMemo(() => {
    return [
      days > 0 ? `${days} ngày` : "",
      hours > 0 ? `${hours} giờ` : "",
      minutes > 0 ? `${minutes} phút` : "",
      seconds > 0 ? `${seconds} giây` : "",
    ].filter(Boolean); // Filter out empty elements
  }, [days, hours, minutes, seconds]);

  return timeRemaining > 0 ? (
    <h6>{timeComponents.join(" ")}</h6>
  ) : (
    <h6>Cuộc họp đang diễn ra</h6>
  );
};

export default CountdownTimer;
