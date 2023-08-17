import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}))

export default BootstrapDialog
