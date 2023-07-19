import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import UploadIcon from '@mui/icons-material/Upload'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import BootstrapDialogTitle from './BootstrapDialogTitle.jsx'
import BootstrapDialog from './BootstrapDialog.jsx'
import ContentService from '@/services/ContentService.js'
import { openEditContentDialog } from '@/store/editContent.js'
import {
  closeCreateContentDialog,
  openCreateContentDialog,
  selectIsCreateContentDialogOpen,
  setCreatedContent
} from '@/store/createContent.js'
import { openAlert } from '@/store/alert.js'

const contentService = new ContentService()

export default function DialogCreateContent() {
  const dispatch = useDispatch()

  const isDialogOpen = useSelector(selectIsCreateContentDialogOpen)

  const [ isLoading, setIsLoading ] = useState(false)

  const inputFileRef = useRef()

  function onOpenDialog() {
    dispatch(openCreateContentDialog())
  }

  function onCloseDialog() {
    dispatch(closeCreateContentDialog())
  }

  function onClickInputFile() {
    inputFileRef.current.click()
  }

  async function onChangeCaptureInputFile(event) {
    if (isLoading) {
      return
    }

    setIsLoading(true)

    const file = event.target.files[0]

    const formData = new FormData()

    formData.append('video', file)

    try {
      const content = await contentService.createContent(formData)

      dispatch(setCreatedContent(content))

      dispatch(openAlert({
        type: 'success',
        message: 'Content has been created'
      }))

      setTimeout(() => {
        dispatch(openEditContentDialog(content))

        onCloseDialog()
      }, 0)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while creating content'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button variant="outlined" startIcon={<VideoCallOutlinedIcon/>} onClick={onOpenDialog}>
        CREATE
      </Button>

      <BootstrapDialog
        fullWidth={true}
        maxWidth="md"
        open={isDialogOpen}
        onClose={onCloseDialog}
      >
        <BootstrapDialogTitle onClose={onCloseDialog}>
          Upload Video
        </BootstrapDialogTitle>

        <DialogContent dividers sx={{ flex: 1, height: 'auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '370px',
            padding: '16px 50px 0',
          }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '100%',
                background: '#F9F9F9',
                width: '136px',
                height: '136px',
                cursor: isLoading ? 'default' : 'pointer',
                marginTop: 'auto'
              }}
              onClick={onClickInputFile}
            >
              <UploadIcon fontSize="large" sx={{ color: '#909090', fontSize: '75px' }}/>
            </div>

            <Typography gutterBottom sx={{ mt: 4 }}>
              Drag and drop video file to upload
            </Typography>

            <Typography variant="caption" gutterBottom sx={{ color: (theme) => theme.palette.grey[600] }}>
              Your videos will be private until you publish them.
            </Typography>

            <LoadingButton
              color="secondary"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              sx={{ mt: 4, marginBottom: 'auto' }}
              onClick={onClickInputFile}
            >
              <span>SELECT FILE</span>
            </LoadingButton>

            <input
              ref={inputFileRef}
              type="file"
              name="file"
              accept="video/mp4"
              disabled={isLoading}
              style={{ display: 'none' }}
              onChangeCapture={onChangeCaptureInputFile}
            />
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}
