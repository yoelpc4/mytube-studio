import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import DataTableContents from '../components/DataTableContents.jsx'

export default function ChannelContents() {
  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 500 }}>
          Channel Contents
        </Typography>
      </Grid>

      <Grid xs={12}>
        <DataTableContents />
      </Grid>
    </Grid>
  )
}
