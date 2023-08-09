import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import BootstrapDialog from './BootstrapDialog.jsx'
import BootstrapDialogTitle from './BootstrapDialogTitle.jsx'
import {
  closeEditContentDialog,
  selectContentToEdit,
  selectIsEditContentDialogOpen,
  setUpdatedContent
} from '@/store/editContent.js'
import { openAlert } from '@/store/alert.js'
import ImageField from './ImageField.jsx'
import { STATUS_DRAFT, STATUS_PUBLISHED } from '@/constants.js'
import useForm from '@/hooks/useForm.jsx';
import RadioField from './RadioField.jsx';
import client from '@/utils/client.js';

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

  const content = useSelector(selectContentToEdit)

  const isDialogOpen = useSelector(selectIsEditContentDialogOpen)

  const {form, errors, isLoading, setForm, handleInput, handleSubmit} = useForm({
    data: {
      title: '',
      description: '',
      thumbnail: null,
      tags: '',
      status: statuses[0].value,
    },
    handleSuccess,
    handleError,
  })

  useEffect(() => {
    if (!content) {
      return
    }

    setForm({
      title: content.title,
      description: content.description ?? '',
      thumbnail: null,
      tags: content.tags ?? '',
      status: content.status,
    })
  }, [content])

  function handleImageChange(value) {
    setForm({
      ...form,
      thumbnail: value
    })
  }

  function onCloseDialog() {
    dispatch(closeEditContentDialog())
  }

  async function handleSuccess() {
    const formData = new FormData()

    for (let field in form) {
      formData.append(field, form[field])
    }

    const {data} = await client.put(`contents/${content.id}`, formData)

    dispatch(setUpdatedContent(data))

    dispatch(openAlert({
      type: 'success',
      message: 'Content has been updated'
    }))

    dispatch(closeEditContentDialog())
  }

  function handleError() {
    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while updating content'
    }))
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

      <DialogContent dividers sx={{flex: 1, height: 'auto'}}>
        <Grid container>
          <Grid sm={12} md={7} sx={{px: 2}}>
            <Typography component="h2" variant="h5">
              Details
            </Typography>

            <Box component="form" id="edit-video-form" onSubmit={handleSubmit}>
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
                error={!!errors.title}
                helperText={errors.title}
                onInput={handleInput}
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
                error={!!errors.description}
                helperText={errors.description}
                onInput={handleInput}
              />

              <ImageField
                id="thumbnail"
                name="thumbnail"
                label="Thumbnail"
                url={content.thumbnailUrl}
                error={!!errors.thumbnail}
                helperText={errors.thumbnail}
                sx={{my: 2}}
                onImageChange={handleImageChange}
              />

              <TextField
                id="tags"
                name="tags"
                type="text"
                label="Tags"
                fullWidth
                margin="normal"
                value={form.tags}
                error={!!errors.tags}
                helperText={errors.tags ?? 'Enter a comma after each tag'}
                onInput={handleInput}
              />
            </Box>
          </Grid>

          <Grid sm={12} md={5} sx={{px: 2}}>
            <video
              title={content.title}
              controls
              src={content.videoUrl}
              poster={content.thumbnailUrl}
              width="100%"
              style={{borderRadius: '10px', marginTop: 45}}
            >
            </video>

            <Box sx={{backgroundColor: '#F9F9F9', mt: 2, p: 2}}>
              <Box sx={{mb: 2, overflow: 'hidden', textOverflow: 'ellipsis'}}>
                <Typography color="grey.600" component="h6" variant="body2">
                  Video Link
                </Typography>

                <Typography
                  component="a"
                  variant="body2"
                  href={content.videoUrl}
                  target="_blank"
                  rel="noopener, noreferrer"
                >
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

            <RadioField
              label="Status"
              name="status"
              records={statuses}
              value={form.status}
              error={!!errors.status}
              helperText={errors.status}
              sx={{mt: 2}}
              onChange={handleInput}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <div style={{flexGrow: 1}}></div>

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
