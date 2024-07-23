import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval, index, array) => {
    timerComponents.push(
      <span key={interval}>
        {(timeLeft as any)[interval]} {interval}
        {index < array.length - 1 ? "/" : ""}
      </span>
    );
  });

  return (
    <div className='header-item2'>
      {timerComponents.length ? timerComponents : <span>Competition Ended!</span>}
    </div>
  );
};

export default Countdown;