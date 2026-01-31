import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAppStatus, formatDate } from '../lib/timeUtils';
import { AppStatus, Startup } from '../types';
import { REVEAL_DATE } from '../constants';
import { getRevealedStartups } from '../services/api';
import { GlassCard, Badge } from '../components/UI';
import Countdown from '../components/Countdown';
import { Lock, Search, Rocket } from 'lucide-react';
import { useI18n } from '../i18n';

const LaunchPage: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(getAppStatus());
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    setStatus(getAppStatus());
    const interval = setInterval(() => {
        const current = getAppStatus();
        if (current !== status) {
            setStatus(current);
            window.location.reload(); // Force reload on state change for reveal
        }
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === AppStatus.REVEALED) {
      setLoading(true);
      getRevealedStartups().then(data => {
        setStartups(data);
        setLoading(false);
      });
    }
  }, [status]);

  // Locked State
  if (status !== AppStatus.REVEALED) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="mb-8 relative inline-block">
                <Lock className="w-24 h-24 text-slate-600" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 mb-4 uppercase">
                {t('launch.accessDenied')}
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto">
                {t('launch.description')}
            </p>

            <GlassCard className="p-8 md:p-12 inline-block border-neon-purple/30 bg-black/40">
                <Countdown 
                    targetDate={REVEAL_DATE} 
                    label={t('launch.countdown')} 
                    onExpire={() => setStatus(AppStatus.REVEALED)}
                />
            </GlassCard>
        </motion.div>
      </div>
    );
  }

  // Revealed State
  const filteredStartups = startups.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.founder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
            <motion.div 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-3 bg-neon-blue/10 px-6 py-2 rounded-full border border-neon-blue/30 mb-6"
            >
                <Rocket className="text-neon-blue w-5 h-5" />
                <span className="text-neon-blue font-bold uppercase tracking-widest">{t('launch.protocolUnlocked')}</span>
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-6">{t('launch.title')}</h1>
            
            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder={t('launch.searchPlaceholder')}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-3 pl-12 pr-6 text-white outline-none focus:border-neon-blue transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </header>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                    <div key={i} className="h-64 bg-slate-900/50 rounded-2xl animate-pulse" />
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {filteredStartups.map((startup, index) => (
                    <motion.div
                        key={startup.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="h-full hover:border-neon-blue/50 transition-colors group relative">
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="p-6 relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">{startup.name}</h3>
                                    <Badge status="REVEALED" />
                                </div>
                                
                                <div className="mb-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{t('launch.founder')}</p>
                                    <p className="text-slate-300 font-medium">{startup.founder}</p>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-6">
                                    {startup.about}
                                </p>

                                <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <p className="text-slate-500">{t('launch.revealedAt')}</p>
                                        <p className="text-mono text-slate-300">{formatDate(startup.revealedAt)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500">{t('launch.contact')}</p>
                                        <p className="text-mono text-slate-300">{startup.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        )}
    </div>
  );
};

export default LaunchPage;
