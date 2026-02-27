import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

export default function Card({ title, subtitle, children, className = '' }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
  };

  return (
    <MotionPaper
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      className={`glass-card p-5 ${className}`.trim()}
    >
      {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
      {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      <div className={title || subtitle ? 'mt-4' : ''}>{children}</div>
    </MotionPaper>
  );
}
