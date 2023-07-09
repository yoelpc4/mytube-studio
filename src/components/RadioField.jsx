import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';

export default function RadioField({ label, name, value, records, onChange, error = false, helperText = '', ...props }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {records.map(({label, value}) => (
          <FormControlLabel key={value} control={<Radio />} label={label} value={value} />
        ))}
      </RadioGroup>

      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}
