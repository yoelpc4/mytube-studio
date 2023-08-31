import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { openAlert } from '@/store/alert.js';
import { selectUser, setUser } from '@/store/auth.js';
import useAsync from '@/hooks/useAsync.jsx';
import useForm from '@/hooks/useForm.jsx';
import TabPanel from '@/components/TabPanel.jsx';
import client from '@/utils/client.js';
import Button from '@mui/material/Button';
import ImageField from '@/components/ImageField.jsx';

const scope = 'customization'

const getA11yProps = index => ({
  id: `${scope}-tab-${index}`,
  'aria-controls': `${scope}-tabpanel-${index}`,
})

export default function Customization() {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const {data, error, isLoading, run} = useAsync()

  const [tab, setTab] = useState(0)

  const {inputs, errors, handleInput, updateInput, handleSubmit, handleServerErrors, handleReset} = useForm({
    username: user.username,
    name: user.name,
    email: user.email,
  })

  const submit = () => {
    if (isLoading) {
      return
    }

    const formData = new FormData()

    Object.entries(inputs).forEach(([name, value]) => formData.append(name, value))

    run(client.put(`channels/${user.username}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(({data}) => data))
  }

  useEffect(() => {
    if (!data) {
      return
    }

    dispatch(setUser(data))

    dispatch(openAlert({
      type: 'success',
      message: 'Profile has been updated',
    }))
  }, [dispatch, data])

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

  return user && (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h1" variant="h5" sx={{fontWeight: 500}}>
          Channel Customization
        </Typography>
      </Grid>

      <Grid xs={12}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} aria-label={`${scope}-tabs`} onChange={(event, value) => setTab(value)}>
            <Tab label="Basic Info" {...getA11yProps(0)}></Tab>
            <Tab label="Branding" {...getA11yProps(1)}></Tab>
          </Tabs>

          <Box sx={{display: 'flex', alignItems: 'center', columnGap: 2}}>
            <Button
              variant="text"
              href={`${import.meta.env.VITE_APP_URL}/channel/${user.username}`}
              target="_blank"
              color="secondary"
            >
              View Channel
            </Button>

            <Button variant="text" disabled={isLoading} onClick={handleReset}>
              Cancel
            </Button>

            <LoadingButton
              type="submit"
              form="update-channel-form"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
            >
              Publish
            </LoadingButton>
          </Box>
        </Box>

        <form id="update-channel-form" onSubmit={handleSubmit(submit)}>
          <TabPanel scope={scope} tab={tab} index={0}>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Name"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={inputs.name}
              error={!!errors.name}
              helperText={errors.name}
              onInput={handleInput}
            />

            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              required
              fullWidth
              margin="normal"
              value={inputs.username}
              error={!!errors.username}
              helperText={errors.username}
              onInput={handleInput}
            />

            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              margin="normal"
              required
              fullWidth
              value={inputs.email}
              error={!!errors.email}
              helperText={errors.email}
              onInput={handleInput}
            />
          </TabPanel>

          <TabPanel scope={scope} tab={tab} index={1}>
            <ImageField
              id="profile"
              name="profile"
              label="Profile"
              url={user.profileUrl}
              rounded
              size="small"
              error={!!errors.profile}
              helperText={errors.profile}
              onImageChange={value => updateInput('profile', value)}
            />

            <ImageField
              id="banner"
              name="banner"
              label="Banner"
              url={user.bannerUrl}
              error={!!errors.banner}
              helperText={errors.banner}
              onImageChange={value => updateInput('banner', value)}
            />
          </TabPanel>
        </form>
      </Grid>
    </Grid>
  )
}
