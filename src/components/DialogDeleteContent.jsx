import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { openAlert } from '@/store/alert.js';
import useAsync from '@/hooks/useAsync.jsx';
import { useContentEvent } from '@/contexts/contentEvent.jsx';
import client from '@/utils/client.js';

export default function DialogDeleteContent() {
  const dispatch = useDispatch()

  const {error, isLoading, isSuccess, run} = useAsync()

  const {content, isEventDelete, dispatchContentDeleted, dispatchResetContent} = useContentEvent()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    dispatchResetContent()

    setIsOpen(false)
  }

  const handleConfirm = () => {
    if (isLoading) {
      return
    }

    run(client.delete(`contents/${content.id}`))
  }

  useEffect(() => {
    if (!isEventDelete || !content) {
      return
    }

    setIsOpen(true)
  }, [isEventDelete, content])

  useEffect(() => {
    if (!isSuccess) {
      return
    }

    dispatch(openAlert({
      type: 'success',
      message: 'Content has been deleted'
    }))

    dispatchContentDeleted()

    setIsOpen(false)
  }, [dispatch, isSuccess, dispatchContentDeleted])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while deleting content'
    }))
  }, [dispatch, error])

  return content && (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        Delete Content Confirmation
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure to delete content <strong>{content.title}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button disabled={isLoading} onClick={handleConfirm}>
          Yes
        </Button>

        <Button disabled={isLoading} onClick={handleClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}
