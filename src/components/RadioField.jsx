import PropTypes from 'prop-types';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';

function RadioField({label, name, value, options, onChange, error = false, helperText = '', sx = {}}) {
  return (
    <FormControl sx={sx}>
      <FormLabel>{label}</FormLabel>

      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(({label, value}) => (
          <FormControlLabel key={value} control={<Radio />} label={label} value={value} />
        ))}
      </RadioGroup>

      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  sx: PropTypes.object,
}

export default RadioField
