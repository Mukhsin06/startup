export enum AppStatus {
  SUBMISSION_OPEN = 'SUBMISSION_OPEN',
  SUBMISSION_CLOSED = 'SUBMISSION_CLOSED',
  REVEALED = 'REVEALED'
}

export interface Startup {
  id: string;
  name: string;
  founder: string;
  phone: string;
  about: string;
  revealedAt: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface FormState {
  name: string;
  founder: string;
  phone: string;
  about: string;
  file?: File | null;
}

export type Language = 'uz' | 'en' | 'ru';

export interface SubmissionPayload extends FormState {
  file?: File | null;
  language: Language;
  submittedAt: string;
}
