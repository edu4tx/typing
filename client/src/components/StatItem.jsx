import { motion } from 'framer-motion';

export const StatItem = ({ label, value, color = "text-slate-800" }) => {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">{label}</span>
      <motion.span 
        key={value}
        initial={{ opacity: 0.5, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-2xl font-bold tabular-nums leading-none ${color}`}
      >
        {value}
      </motion.span>
    </div>
  );
};
