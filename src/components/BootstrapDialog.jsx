import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

export default styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}))
