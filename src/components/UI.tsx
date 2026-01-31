import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-glass-surface backdrop-blur-xl border border-glass-border rounded-2xl shadow-xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-neon-blue/10 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/20 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]",
    secondary: "bg-neon-purple/10 text-neon-purple border border-neon-purple/50 hover:bg-neon-purple/20 hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]",
    danger: "bg-neon-pink/10 text-neon-pink border border-neon-pink/50 hover:bg-neon-pink/20 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : children}
      </span>
    </button>
  );
};

export const InputGroup: React.FC<{
  label: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
    {children}
    {error && <p className="text-neon-pink text-xs mt-1">{error}</p>}
  </div>
);

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { error?: string }> = ({ error, className = '', ...props }) => (
  <input
    className={`w-full bg-slate-900/50 border ${error ? 'border-neon-pink' : 'border-slate-700 focus:border-neon-blue'} rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors duration-200 ${className}`}
    {...props}
  />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }> = ({ error, className = '', ...props }) => (
  <textarea
    className={`w-full bg-slate-900/50 border ${error ? 'border-neon-pink' : 'border-slate-700 focus:border-neon-blue'} rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors duration-200 min-h-[120px] ${className}`}
    {...props}
  />
);

export const Badge: React.FC<{ status: 'OPEN' | 'CLOSED' | 'LOCKED' | 'REVEALED' }> = ({ status }) => {
  const styles = {
    OPEN: 'bg-green-500/10 text-green-400 border-green-500/50',
    CLOSED: 'bg-neon-pink/10 text-neon-pink border-neon-pink/50',
    LOCKED: 'bg-amber-500/10 text-amber-400 border-amber-500/50',
    REVEALED: 'bg-neon-blue/10 text-neon-blue border-neon-blue/50',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${styles[status]} uppercase tracking-wider`}>
      {status}
    </span>
  );
};