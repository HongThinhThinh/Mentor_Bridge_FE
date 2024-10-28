import React, { useEffect, useState } from "react";

// Định nghĩa kiểu cho prop targetDate
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

  return (
    <div>
      <h3>Countdown Timer</h3>
      <p>
        {days} days {hours} hours {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
};

export default CountdownTimer;
