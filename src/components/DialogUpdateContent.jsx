import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import BootstrapDialog from '@/components/BootstrapDialog.jsx'
import BootstrapDialogTitle from '@/components/BootstrapDialogTitle.jsx'
import ImageField from '@/components/ImageField.jsx'
import RadioField from '@/components/RadioField.jsx'
import { openAlert } from '@/store/alert.js'
import useAsync from '@/hooks/useAsync.jsx'
import useContentEvent from '@/hooks/useContentEvent.jsx';
import useForm from '@/hooks/useForm.jsx'
import client from '@/utils/client.js'
import { STATUS_DRAFT, STATUS_PUBLISHED } from '@/utils/constants.js'

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

export default function DialogUpdateContent() {
  const dispatch = useDispatch()

  const {data, error, isLoading, run} = useAsync()

  const {content, isEventCreated, isEventUpdate, dispatchContentUpdated, dispatchResetContent} = useContentEvent()

  const {inputs, errors, setInputs, handleSubmit, handleInput, updateInput, handleServerErrors} = useForm({
    title: '',
    description: '',
    thumbnail: null,
    tags: '',
    status: statuses[0].value,
  })

  const [isOpen, setIsOpen] = useState(false)

  const videoLink = `${import.meta.env.VITE_APP_URL}/watch/${content?.id}`

  const handleClose = () => {
    dispatchResetContent()

    setIsOpen(false)
  }

  const submit = () => {
    const formData = new FormData()

    for (let field in inputs) {
      formData.append(field, inputs[field])
    }

    run(client.put(`contents/${content.id}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(({data}) => data))
  }

  useEffect(() => {
    if (!content || !(isEventCreated || isEventUpdate)) {
      return
    }

    setInputs({
      title: content.title,
      description: content.description ?? '',
      thumbnail: null,
      tags: content.tags ?? '',
      status: content.status,
    })

    setIsOpen(true)
  }, [isEventCreated, isEventUpdate, content, setInputs])

  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(openAlert({
      type: 'success',
      message: 'Content has been updated',
    }))

    dispatchContentUpdated(data)

    setIsOpen(false)
  }, [dispatch, data, dispatchContentUpdated])

  useEffect(() => {
    if (!error) {
      return
    }

    const {response} = error

    if (response) {
      if (response.status === 400) {
        handleServerErrors(response.data.errors)

        return
      }
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while updating content',
    }))
  }, [dispatch, error, handleServerErrors])

  return content && (
    <BootstrapDialog
      fullWidth={true}
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
    >
      <BootstrapDialogTitle onClose={handleClose}>
        {content.title}
      </BootstrapDialogTitle>

      <DialogContent dividers sx={{flex: 1, height: 'auto'}}>
        <Grid container>
          <Grid sm={12} md={7} sx={{px: 2}}>
            <Typography component="h2" variant="h5">
              Details
            </Typography>

            <Box component="form" id="edit-video-form" onSubmit={handleSubmit(submit)}>
              <TextField
                id="title"
                name="title"
                type="text"
                label="Title"
                required
                fullWidth
                autoFocus
                margin="normal"
                value={inputs.title}
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
                value={inputs.description}
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
                onImageChange={value => updateInput('thumbnail', value)}
              />

              <TextField
                id="tags"
                name="tags"
                type="text"
                label="Tags"
                fullWidth
                margin="normal"
                value={inputs.tags}
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
                  href={videoLink}
                  target="_blank"
                  rel="noopener, noreferrer"
                >
                  {videoLink}
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
              options={statuses}
              value={inputs.status}
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
