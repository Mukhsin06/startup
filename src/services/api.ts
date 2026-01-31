import { Startup, SubmissionPayload } from '../types';
import { sendSubmissionBundle } from './telegram';


// Mock data
const MOCK_STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'NebulaAI',
    founder: 'Aziz Rakhmankulov',
    phone: '+998901234567',
    about: 'AI-driven logistics optimization for Central Asia silk road routes.',
    revealedAt: '2026-02-14T00:00:01+05:00'
  },
  {
    id: '2',
    name: 'QuantumPay',
    founder: 'Malika Karimova',
    phone: '+998998887766',
    about: 'Decentralized payment gateway integrated with local Humo/Uzcard systems using quantum encryption.',
    revealedAt: '2026-02-14T00:05:00+05:00'
  },
  {
    id: '3',
    name: 'GreenTashkent',
    founder: 'Jamshid Aliev',
    phone: '+998971112233',
    about: 'Smart urban farming modules for high-rise apartments in Tashkent City.',
    revealedAt: '2026-02-14T00:10:00+05:00'
  },
  {
    id: '4',
    name: 'EduVerse VR',
    founder: 'Sevara Tursunova',
    phone: '+998909998877',
    about: 'Immersive history lessons focusing on the Timurid Empire using Virtual Reality.',
    revealedAt: '2026-02-14T00:15:00+05:00'
  }
];

export const submitStartup = async (data: SubmissionPayload): Promise<{ success: boolean }> => {
  // Direct Telegram submission (Frontend Only)
  // We use the telegram service to send message + excel + optional file
  await sendSubmissionBundle(data);
  return { success: true };
};

export const getRevealedStartups = async (): Promise<Startup[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_STARTUPS;
};
