import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import UploadIcon from '@mui/icons-material/Upload'
import { openAlert } from '@/store/alert.js'
import BootstrapDialogTitle from '@/components/BootstrapDialogTitle.jsx'
import BootstrapDialog from '@/components/BootstrapDialog.jsx'
import useAsync from '@/hooks/useAsync.jsx';
import useContentEvent from '@/hooks/useContentEvent.jsx';
import client from '@/utils/client.js';

export default function DialogCreateContent() {
  const dispatch = useDispatch()

  const inputFileRef = useRef()

  const {data, error, isLoading, run} = useAsync()

  const {isEventCreate, dispatchContentCreated, dispatchUpdateContent, dispatchResetContent} = useContentEvent()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    dispatchResetContent()

    setIsOpen(false)
  }

  const handleClickInputFile = () => inputFileRef.current.click()

  const handleChangeCaptureInputFile = event => {
    if (isLoading) {
      return
    }

    const formData = new FormData()

    formData.append('video', event.target.files[0])

    run(client.post('contents', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(({data}) => data))
  }

  useEffect(() => {
    if (!isEventCreate) {
      return
    }

    setIsOpen(true)
  }, [isEventCreate])

  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(openAlert({
      type: 'success',
      message: 'Content has been created'
    }))

    dispatchContentCreated(data)

    setIsOpen(false)
  }, [dispatch, data, dispatchContentCreated, dispatchUpdateContent])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while creating content'
    }))
  }, [dispatch, error])

  return (
    <BootstrapDialog
      fullWidth={true}
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
    >
      <BootstrapDialogTitle onClose={handleClose}>
        Upload Video
      </BootstrapDialogTitle>

      <DialogContent dividers sx={{flex: 1, height: 'auto'}}>
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
            onClick={handleClickInputFile}
          >
            <UploadIcon fontSize="large" sx={{color: '#909090', fontSize: '75px'}}/>
          </div>

          <Typography gutterBottom sx={{mt: 4}}>
            Drag and drop video file to upload
          </Typography>

          <Typography variant="caption" gutterBottom sx={{color: (theme) => theme.palette.grey[600]}}>
            Your videos will be private until you publish them.
          </Typography>

          <LoadingButton
            variant="contained"
            color="secondary"
            loading={isLoading}
            disabled={isLoading}
            sx={{mt: 4, marginBottom: 'auto'}}
            onClick={handleClickInputFile}
          >
            <span>SELECT FILE</span>
          </LoadingButton>

          <input
            ref={inputFileRef}
            type="file"
            name="file"
            accept="video/mp4"
            disabled={isLoading}
            style={{display: 'none'}}
            onChangeCapture={handleChangeCaptureInputFile}
          />
        </div>
      </DialogContent>
    </BootstrapDialog>
  )
}
