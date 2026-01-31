import React, { useState, useEffect } from 'react';
import { calculateTimeLeft } from '../lib/timeUtils';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: string;
  label?: string;
  onExpire?: () => void;
  small?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, label, onExpire, small = false }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.isExpired && onExpire) {
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);

  if (!hasMounted) return null; 

  if (timeLeft.isExpired) {
    return (
        <div className="flex flex-col items-center justify-center p-6 border border-glass-border bg-glass-surface rounded-xl">
             <span className="text-2xl md:text-4xl">✅</span>
             <span className="text-gray-400 mt-2 font-mono">Time Reached</span>
        </div>
    );
  }

  const TimeBlock = ({ value, label: unitLabel }: { value: number, label: string }) => (
    <div className={`flex flex-col items-center ${small ? 'mx-2' : 'mx-2 md:mx-4'}`}>
      <div className={`
        relative flex items-center justify-center 
        bg-slate-900/80 border border-slate-700 
        ${small ? 'w-12 h-12 text-lg' : 'w-16 h-16 md:w-24 md:h-24 text-3xl md:text-5xl'} 
        rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)]
      `}>
        <span className="font-mono font-bold text-white">
          {value.toString().padStart(2, '0')}
        </span>
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg pointer-events-none" />
      </div>
      <span className={`mt-2 font-mono text-slate-400 uppercase tracking-widest ${small ? 'text-[0.5rem]' : 'text-[0.6rem] md:text-xs'}`}>
        {unitLabel}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {label && <h3 className="text-neon-blue uppercase tracking-[0.2em] text-sm mb-6 animate-pulse-slow">{label}</h3>}
      <div className="flex justify-center">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default Countdown;