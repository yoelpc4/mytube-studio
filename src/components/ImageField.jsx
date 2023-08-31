import PropTypes from 'prop-types';
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ImageIcon from '@mui/icons-material/Image'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material';

function ImageField(
  {
    id,
    name,
    label,
    url,
    onImageChange,
    size = 'medium',
    rounded = false,
    error = false,
    helperText = '',
    sx = {}
  }
) {
  const [imageUrl, setImageUrl] = useState(url)

  const width = size === 'small' ? '144px' : '240px'

  const handleChange = event => {
    const [file] = event.target.files

    setImageUrl(URL.createObjectURL(file))

    onImageChange(file)
  }

  return (
    <Box sx={{my: 2, ...sx}}>
      <Typography component="label" variant="body2" sx={{display: 'block', color: '#808080', mb: '3px'}}>
        {label}
      </Typography>

      <Button
        component="label"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9f9f9',
          color: '#808080',
          maxWidth: '300px',
          cursor: 'pointer',
          border: '1px solid #c4c4c4',
          p: 3,
          aspectRatio: '16/9',
          '&:hover': {
            border: '1px solid #000',
          },
        }}
      >
        {imageUrl ? <img src={imageUrl} style={{width, borderRadius: rounded ? '50%' : 0}}/> : (
          <>
            <ImageIcon sx={{mr: '3px'}}/>

            <Typography component="p" variant="body2" sx={{mt: '3px'}}>
              Upload {label}
            </Typography>
          </>
        )}

        <input
          type="file"
          id={id}
          name={name}
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </Button>

      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    </Box>
  )
}

ImageField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  onImageChange: PropTypes.func,
  size: PropTypes.string,
  rounded: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  sx: PropTypes.object,
}

export default ImageField
