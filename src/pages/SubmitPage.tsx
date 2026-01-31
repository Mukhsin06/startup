import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard, NeonButton, TextInput, TextArea, InputGroup, Badge } from '../components/UI';
import { AppStatus, FormState } from '../types';
import { getAppStatus } from '../lib/timeUtils';
import { submitStartup } from '../services/api';
import { PHONE_REGEX, SUBMISSION_DEADLINE, REVEAL_DATE } from '../constants';
import { CheckCircle, AlertTriangle, Paperclip } from 'lucide-react';
import Countdown from '../components/Countdown';
import { useI18n } from '../i18n';

const SubmitPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AppStatus>(getAppStatus());
  const [formData, setFormData] = useState<FormState>({
    name: '',
    founder: '',
    phone: '+998',
    about: '',
    file: null as File | null
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t, language } = useI18n();

  useEffect(() => {
    // Re-check status on mount
    setStatus(getAppStatus());

    // Periodically check if deadline passed while user is on page
    const interval = setInterval(() => {
      const current = getAppStatus();
      if (current !== status) setStatus(current);
    }, 10000);
    return () => clearInterval(interval);
  }, [status]);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (formData.name.length < 2) newErrors.name = t('errors.name');
    if (!formData.founder) newErrors.founder = t('errors.founder');
    if (!PHONE_REGEX.test(formData.phone)) newErrors.phone = t('errors.phone');
    if (formData.about.length < 30) newErrors.about = t('errors.about');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitStartup({
        ...formData,
        language,
        submittedAt: new Date().toISOString()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert(t('submit.error.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 text-center">
        <GlassCard className="p-12 border-green-500/30 bg-green-900/10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <CheckCircle className="w-24 h-24 text-green-400 mb-6" />
            <h2 className="text-3xl font-bold mb-4 font-mono">{t('submit.success.title')}</h2>
            <p className="text-slate-300 mb-8 text-lg">{t('submit.success.subtitle')}</p>

            <div className="bg-black/30 p-6 rounded-lg border border-white/10 w-full max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">{t('submit.success.status')}</span>
                <Badge status="LOCKED" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">{t('submit.success.unlockDate')}</span>
                <span className="text-white font-mono">14 Feb 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">{t('submit.success.unlockTime')}</span>
                <span className="text-white font-mono">00:00</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 w-full">
              <a
                href="https://t.me/FIgmalar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                {t('submit.success.subscribe')}
              </a>
              <NeonButton onClick={() => navigate('/')} variant="secondary">{t('submit.success.backHome')}</NeonButton>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    );
  }

  const isClosed = status !== AppStatus.SUBMISSION_OPEN;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          {t('submit.title')}
        </h1>
        {isClosed ? (
          <div className="flex flex-col items-center text-neon-pink mt-4">
            <AlertTriangle className="w-12 h-12 mb-2" />
            <h2 className="text-2xl font-mono uppercase tracking-widest">{t('submit.closedTitle')}</h2>
            <p className="text-slate-400 mt-2">{t('submit.closedDescription')}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 bg-neon-blue/10 border border-neon-blue/30 px-4 py-2 rounded-full mb-6">
              <span className="text-neon-blue font-bold text-sm uppercase">{t('submit.deadlineBadge')}</span>
              <span className="text-white font-mono">{t('submit.deadlineValue')}</span>
            </div>
            <p className="text-slate-400">{t('submit.helper')}</p>
          </div>
        )}
      </div>

      <GlassCard className={`p-8 ${isClosed ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
        <form onSubmit={handleSubmit}>
          <InputGroup label={t('submit.input.name')} error={errors.name}>
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('submit.placeholder.name')}
              disabled={isClosed}
            />
          </InputGroup>

          <InputGroup label={t('submit.input.founder')} error={errors.founder}>
            <TextInput
              name="founder"
              value={formData.founder}
              onChange={handleInputChange}
              placeholder={t('submit.placeholder.founder')}
              disabled={isClosed}
            />
          </InputGroup>

          <InputGroup label={t('submit.input.phone')} error={errors.phone}>
            <TextInput
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t('submit.placeholder.phone')}
              disabled={isClosed}
            />
          </InputGroup>

          <InputGroup label={t('submit.input.about')} error={errors.about}>
            <TextArea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder={t('submit.placeholder.about')}
              disabled={isClosed}
            />
          </InputGroup>

          <InputGroup label={t('submit.input.file')}>
            <label className={`w-full flex items-center gap-3 justify-between bg-slate-900/50 border ${formData.file ? 'border-neon-blue' : 'border-slate-700 hover:border-neon-blue'} rounded-lg px-4 py-3 text-white cursor-pointer transition-colors`}>
              <div className="flex items-center gap-3">
                <Paperclip className="text-slate-400" />
                <span className="text-sm text-slate-300">
                  {formData.file ? formData.file.name : t('submit.input.fileHelper')}
                </span>
              </div>
              <input
                type="file"
                name="file"
                className="hidden"
                disabled={isClosed}
                onChange={(e) => setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
              />
            </label>
          </InputGroup>

          <div className="mt-8">
            <NeonButton
              type="submit"
              className="w-full"
              disabled={isClosed}
              isLoading={isSubmitting}
            >
              {isClosed ? t('submit.button.closed') : t('submit.button.submit')}
            </NeonButton>
          </div>
        </form>
      </GlassCard>

      {!isClosed && (
        <div className="mt-12 mb-20">
          <Countdown targetDate={SUBMISSION_DEADLINE} label={t('submit.countdown')} small />
        </div>
      )}
    </div>
  );
};

export default SubmitPage;
