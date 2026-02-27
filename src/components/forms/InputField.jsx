import TextField from '@mui/material/TextField';

export default function InputField({ label, error, ...props }) {
  return (
    <TextField
      fullWidth
      label={label}
      error={Boolean(error)}
      helperText={error || ' '}
      InputLabelProps={{ shrink: true }}
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: '10px',
          backgroundColor: '#fff',
        },
      }}
      {...props}
    />
  );
}
