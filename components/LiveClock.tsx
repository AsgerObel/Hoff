import React, { useState, useEffect } from 'react';

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-6xl font-black tracking-tighter tabular-nums">{formattedTime}</span>
    </div>
  );
};

export default LiveClock;

