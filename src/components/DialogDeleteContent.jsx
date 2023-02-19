import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function DialogDeleteContent({ content, isOpen, onConfirmed, onCancelled }) {
  return (
    content &&
    <Dialog open={isOpen} onClose={onCancelled}>
      <DialogTitle>
        Delete Content Confirmation
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure to delete content <strong>{content.title}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onConfirmed}>
          Yes
        </Button>

        <Button onClick={onCancelled} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}
