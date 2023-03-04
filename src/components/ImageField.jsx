import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ImageIcon from '@mui/icons-material/Image'
import Typography from '@mui/material/Typography'

export default function ImageField({ id, name, label, url, onImageChange }) {
  const [file, setFile] = useState(null)

  const [imageUrl, setImageUrl] = useState(url)

  useEffect(() => {
    if (file) {
      setImageUrl(URL.createObjectURL(file))
    }
  }, [file])

  function onChange(event) {
    const newFile = event.target.files[0]

    setFile(newFile)

    onImageChange(newFile)
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography component="label" variant="body2" sx={{ display: 'block', color: '#808080', mb: '3px' }}>
        {label}
      </Typography>

      <Button
        component="label"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fff',
          color: '#808080',
          width: '40%',
          cursor: 'pointer',
          border: '1px solid #c4c4c4',
          borderRadius: '5px',
          p: 3,
          aspectRatio: '16/9',
          '&:hover': {
            border: '1px solid #000',
          },
          ...(imageUrl && {
            background: `#fff url('${imageUrl}') no-repeat center center`,
            backgroundSize: 'cover',
            aspectRatio: '16/9',
          }),
          ...(!imageUrl && {
            '&:hover': {
              background: '#fff',
            },
          }),
        }}
      >
        {!imageUrl && (
          <>
            <ImageIcon sx={{ mr: '3px' }}/>

            <Typography component="p" variant="body2" sx={{ mt: '3px' }}>
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
          onChange={onChange}
        />
      </Button>
    </Box>
  )
}