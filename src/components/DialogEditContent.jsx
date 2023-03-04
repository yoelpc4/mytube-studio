import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import LoadingButton from '@mui/lab/LoadingButton'
import BootstrapDialog from './BootstrapDialog.jsx'
import BootstrapDialogTitle from './BootstrapDialogTitle.jsx'
import { closeEditContentDialog, setUpdatedContent } from '../store/editContent.js'
import { openAlert } from '../store/alert.js'
import ContentService from '../services/ContentService.js'
import ImageField from './ImageField.jsx'
import { STATUS_DRAFT, STATUS_PUBLISHED } from '../constants.js'

const contentService = new ContentService()

const statuses = [
  {
    label: 'Draft',
    value: STATUS_DRAFT,
  },
  {
    label: 'Published',
    value: STATUS_PUBLISHED,
  },
]

export default function DialogEditContent() {
  const dispatch = useDispatch()

  const content = useSelector(state => state.editContent.contentToEdit)

  const isDialogOpen = useSelector(state => state.editContent.isEditContentDialogOpen)

  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail: null,
    tags: '',
    status: statuses[0].value,
  })

  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    if (content) {
      setForm({
        title: content.title,
        description: content.description ?? '',
        thumbnail: null,
        tags: content.tags ?? '',
        status: content.status,
      })
    }
  }, [content])

  function onInput(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function onImageChange(value) {
    setForm({
      ...form,
      thumbnail: value
    })
  }

  function onCloseDialog() {
    dispatch(closeEditContentDialog())
  }

  async function onSubmit(event) {
    event.preventDefault()

    if (isLoading) {
      return
    }

    setIsLoading(true)

    const formData = new FormData()

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    })

    try {
      await contentService.updateContent(content.id, formData)

      dispatch(setUpdatedContent(content))

      // close dialog after next tick
      setTimeout(() => dispatch(closeEditContentDialog()), 0)
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while updating content'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    content &&
    <BootstrapDialog
      fullWidth={true}
      maxWidth="md"
      open={isDialogOpen}
      onClose={onCloseDialog}
    >
      <BootstrapDialogTitle onClose={onCloseDialog}>
        {content.title}
      </BootstrapDialogTitle>

      <DialogContent dividers sx={{ flex: 1, height: 'auto' }}>
        <Grid container>
          <Grid sm={12} md={7} sx={{ px: 2 }}>
            <Typography component="h2" variant="h5">
              Details
            </Typography>

            <Box component="form" id="edit-video-form" onSubmit={onSubmit}>
              <TextField
                id="title"
                name="title"
                type="text"
                label="Title"
                required
                fullWidth
                autoFocus
                margin="normal"
                value={form.title}
                onInput={onInput}
              />

              <TextField
                id="description"
                name="description"
                type="text"
                label="Description"
                multiline
                rows={5}
                fullWidth
                margin="normal"
                value={form.description}
                onInput={onInput}
              />

              <ImageField
                id="thumbnail"
                name="thumbnail"
                label="Thumbnail"
                url={content.thumbnailUrl}
                onImageChange={onImageChange}
              />

              <TextField
                id="tags"
                name="tags"
                type="text"
                label="Tags"
                helperText="Enter a comma after each tag"
                fullWidth
                margin="normal"
                value={form.tags}
                onInput={onInput}
              />
            </Box>
          </Grid>

          <Grid sm={12} md={5} sx={{ px: 2 }}>
            <video
              title={content.title}
              controls
              poster={content.thumbnailUrl}
              width="100%"
              style={{ borderRadius: '10px', marginTop: 45 }}
            >
              <source src={content.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <Box sx={{ backgroundColor: '#F9F9F9', mt: 2, p: 2}}>
              <Box sx={{ mb: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Typography color="grey.600" component="h6" variant="body2">
                  Video Link
                </Typography>

                <Typography component="a" variant="body2" href={content.videoUrl} target="_blank" rel="noopener, noreferrer">
                  {content.videoUrl}
                </Typography>
              </Box>

              <Box>
                <Typography color="grey.600" component="h6" variant="body2">
                  Filename
                </Typography>

                <Typography component="p" variant="body2">
                  {content.videoBasename}
                </Typography>
              </Box>
            </Box>

            <FormControl sx={{ mt: 2 }}>
              <FormLabel>Status</FormLabel>

              <RadioGroup
                name="status"
                value={form.status}
                onChange={onInput}
              >
                {statuses.map(status => (
                  <FormControlLabel key={status.value} control={<Radio />} label={status.label} value={status.value} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <div style={{ flexGrow: 1 }}></div>

        <LoadingButton
          type="submit"
          form="edit-video-form"
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
        >
          <span>Update</span>
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  )
}
