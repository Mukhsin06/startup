import { SubmissionPayload } from '../types';
import * as XLSX from 'xlsx';

const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8299271199:AAHORq-fbX7OpdUzc2nCVpXohGv47qt-YfQ';
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '-1003251233811';

if (!botToken || !chatId) {
  console.error('Missing Telegram credentials');
}

const telegramApi = (method: string) => `https://api.telegram.org/bot${botToken}/${method}`;

const sendMessage = async (text: string) => {
  const fd = new FormData();
  fd.append('chat_id', chatId);
  fd.append('text', text);
  fd.append('parse_mode', 'HTML');

  try {
    await fetch(telegramApi('sendMessage'), {
      method: 'POST',
      body: fd,
      mode: 'no-cors' // Use no-cors to avoid CORS errors, response will be opaque
    });
  } catch (err) {
    console.error('sendMessage failed:', err);
  }
};

const sendDocument = async (file: File | Blob, filename: string, caption?: string) => {
  const fd = new FormData();
  fd.append('chat_id', chatId);
  fd.append('document', file instanceof File ? file : new File([file], filename));
  if (caption) fd.append('caption', caption);

  try {
    await fetch(telegramApi('sendDocument'), {
      method: 'POST',
      body: fd,
      mode: 'no-cors'
    });
  } catch (err) {
    console.error('sendDocument failed:', err);
  }
};

const buildExcel = (payload: SubmissionPayload): Blob => {
  const rows = [
    ['Startup Name', payload.name],
    ['Founder', payload.founder],
    ['Phone', payload.phone],
    ['About', payload.about],
    ['Language', payload.language.toUpperCase()],
    ['Submitted At (ISO)', payload.submittedAt],
  ];
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, 'Submission');
  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};


const formatSubmissionText = (payload: SubmissionPayload) => {
  const lines = [
    '🛰️ Startup Submission | Ariza | Заявка',
    '',
    `• Name: <b>${payload.name}</b>`,
    `• Founder: ${payload.founder}`,
    `• Phone: ${payload.phone}`,
    `• About: ${payload.about}`,
    `• UI language: ${payload.language ? payload.language.toUpperCase() : 'N/A'}`,
    `• Submitted: ${payload.submittedAt}`
  ];
  return lines.join('\n');
};

export const sendSubmissionBundle = async (payload: SubmissionPayload) => {
  const message = formatSubmissionText(payload);
  await sendMessage(message);

  // Excel with this submission
  const excelBlob = buildExcel(payload);
  await sendDocument(excelBlob, `submission-${payload.name.replace(/\s+/g, '_')}-${Date.now()}.xlsx`, '📄 Submission Excel');

  // Optional user attachment
  if (payload.file) {
    await sendDocument(payload.file, payload.file.name, '📎 User attachment');
  }
};
