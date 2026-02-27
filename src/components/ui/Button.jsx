import MuiButton from '@mui/material/Button';
import { motion } from 'framer-motion';

const MotionButton = motion(MuiButton);

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const muiVariant = variant === 'secondary' ? 'outlined' : 'contained';
  const color = 'primary';

  return (
    <MotionButton
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      variant={muiVariant}
      color={color}
      className={className}
      sx={
        variant === 'secondary'
          ? {}
          : variant === 'danger'
            ? { backgroundColor: '#4338ca', '&:hover': { backgroundColor: '#3730a3' } }
            : {}
      }
      {...props}
    >
      {children}
    </MotionButton>
  );
}
