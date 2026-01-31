import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppStatus } from '../types';
import { getAppStatus } from '../lib/timeUtils';
import { SUBMISSION_DEADLINE, REVEAL_DATE } from '../constants';
import Countdown from '../components/Countdown';
import { GlassCard, NeonButton, Badge } from '../components/UI';
import { ArrowRight, Lock, Clock } from 'lucide-react';
import { useI18n } from '../i18n';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<AppStatus>(getAppStatus());
  const { t } = useI18n();

  useEffect(() => {
    // Polling for status updates
    const timer = setInterval(() => {
      setStatus(getAppStatus());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16 mt-8"
      >
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-sm font-mono text-neon-blue">{t('hero.est')}</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
          {t('hero.subtitle1')} <br />
          {t('hero.subtitle2')}
        </p>
      </motion.div>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        
        {/* Card 1: Submission */}
        <GlassCard className="p-8 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="w-full flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="text-neon-blue" />
              {t('submission.phase')}
            </h2>
            <Badge status={status === AppStatus.SUBMISSION_OPEN ? 'OPEN' : 'CLOSED'} />
          </div>

          <div className="flex-grow flex flex-col justify-center mb-8 w-full">
            {status === AppStatus.SUBMISSION_OPEN ? (
               <>
                 <div className="mb-4">
                    <span className="text-sm text-slate-400 uppercase tracking-widest block mb-2">{t('submission.selectionDate')}</span>
                    <span className="text-white font-mono text-lg border-b border-neon-blue/50 pb-1">{t('submission.selectionValue')}</span>
                 </div>
                 <Countdown targetDate={SUBMISSION_DEADLINE} label={t('submission.endsIn')} small />
               </>
            ) : (
                <div className="text-slate-500 py-8">
                    <div className="text-4xl mb-2">✅</div>
                    <div className="font-mono uppercase tracking-widest">{t('submission.closedTitle')}</div>
                    <div className="text-xs mt-2">{t('submission.closedSubtitle')}</div>
                </div>
            )}
          </div>

          <div className="w-full mt-auto">
            {status === AppStatus.SUBMISSION_OPEN ? (
              <NeonButton 
                variant="primary" 
                className="w-full"
                onClick={() => navigate('/submit')}
              >
                {t('submission.button.submit')} <ArrowRight className="w-4 h-4" />
              </NeonButton>
            ) : (
               <NeonButton 
                disabled 
                className="w-full opacity-50 cursor-not-allowed"
              >
                {t('submission.button.closed')}
              </NeonButton>
            )}
          </div>
        </GlassCard>

        {/* Card 2: Reveal */}
        <GlassCard className="p-8 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="w-full flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lock className="text-neon-purple" />
              {t('reveal.title')}
            </h2>
            <Badge status={status === AppStatus.REVEALED ? 'REVEALED' : 'LOCKED'} />
          </div>

          <div className="flex-grow flex flex-col justify-center mb-8 w-full">
            {status === AppStatus.REVEALED ? (
               <div className="text-neon-blue py-8 animate-pulse">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="font-mono uppercase tracking-widest text-xl">{t('reveal.protocolUnlocked')}</div>
               </div>
            ) : (
               <Countdown targetDate={REVEAL_DATE} label={t('reveal.countdown')} small />
            )}
          </div>

          <div className="w-full mt-auto">
            {status === AppStatus.REVEALED ? (
              <NeonButton 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate('/launch')}
              >
                {t('reveal.button.viewStartups')} <ArrowRight className="w-4 h-4" />
              </NeonButton>
            ) : (
              <NeonButton 
                 variant="secondary"
                 className="w-full"
                 onClick={() => navigate('/launch')}
              >
                {t('reveal.button.viewTimer')}
              </NeonButton>
            )}
          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default LandingPage;
