import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography';
import { openAlert } from '@/store/alert.js';
import ChannelAnalyticsCard from '@/components/ChannelAnalyticsCard.jsx';
import LatestContentCard from '@/components/LatestContentCard.jsx';
import RecentSubscribersCard from '@/components/RecentSubscribersCard.jsx';
import useAsync from '@/hooks/useAsync.jsx';
import client from '@/utils/client.js';
import useBreakpoints from '@/hooks/useBreakpoints.jsx';

export default function Dashboard() {
  const dispatch = useDispatch()

  const {isMobile} = useBreakpoints()

  const {data, error, run} = useAsync()

  useEffect(() => {
    const controller = new AbortController

    run(client('dashboard', {
      signal: controller.signal,
    }).then(({data}) => data))

    return () => controller.abort()
  }, [run])

  useEffect(() => {
    if (!error) {
      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while fetching dashboard',
    }))
  }, [dispatch, error])

  return data && (
    <Grid container columnSpacing={isMobile ? 0 : 2} rowSpacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h1" variant="h5" sx={{fontWeight: 500}}>
          Channel Dashboard
        </Typography>
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <LatestContentCard latestContent={data.latestContent} />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <ChannelAnalyticsCard
          subscribersCount={data.subscribersCount}
          contentsCount={data.contentsCount}
          contentViewsCount={data.contentViewsCount}
          contentLikesCount={data.contentLikesCount}
        />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <RecentSubscribersCard recentSubscribers={data.recentSubscribers} />
      </Grid>
    </Grid>
  )
}
