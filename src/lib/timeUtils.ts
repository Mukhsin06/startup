import { AppStatus } from '../types';
import { SUBMISSION_DEADLINE, REVEAL_DATE } from '../constants';

export const getAppStatus = (): AppStatus => {
  const now = new Date().getTime();
  const submissionEnd = new Date(SUBMISSION_DEADLINE).getTime();
  const revealStart = new Date(REVEAL_DATE).getTime();

  if (now < submissionEnd) {
    return AppStatus.SUBMISSION_OPEN;
  } else if (now < revealStart) {
    return AppStatus.SUBMISSION_CLOSED;
  } else {
    return AppStatus.REVEALED;
  }
};

export const calculateTimeLeft = (targetIsoString: string) => {
  const difference = +new Date(targetIsoString) - +new Date();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};