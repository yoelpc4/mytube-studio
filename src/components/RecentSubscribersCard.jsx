import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import useContentEvent from '@/hooks/useContentEvent.jsx';
import { formatCount, pluralize } from '@/utils/helpers.js';
import videographerImageUrl from '@/assets/images/videographer.svg'

function RecentSubscribersCard({recentSubscribers}) {
  const {dispatchCreateContent} = useContentEvent()

  return (
    <Card>
      {recentSubscribers.length ? (
        <CardContent sx={{minHeight: '400px'}}>
          <Typography component="h2" variant="h6">
            Recent Subscribers
          </Typography>

          <Typography variant="body2" color="gray" sx={{mb: 2}}>
            Lifetime
          </Typography>

          <List sx={{width: '100%'}}>
            {recentSubscribers.map(recentSubscriber => (
              <li key={recentSubscriber.id}>
                <ListItem
                  component={Link}
                  href={`${import.meta.env.VITE_APP_URL}/channel/${recentSubscriber.username}`}
                  target="_blank"
                  rel="noreferrer"
                  alignItems="flex-start"
                  disablePadding
                  sx={{textDecoration: 'none', color: 'inherit'}}
                >
                  <ListItemAvatar>
                    <Avatar src={recentSubscriber.profileUrl} alt={recentSubscriber.name}/>
                  </ListItemAvatar>

                  <ListItemText
                    primary={recentSubscriber.name}
                    secondary={`${formatCount(recentSubscriber.channelSubscriptionsCount)} ${pluralize('subscriber', recentSubscriber.channelSubscriptionsCount)}`}
                  />
                </ListItem>
              </li>
            ))}
          </List>
        </CardContent>
      ) : (
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 2,
            minHeight: '400px',
          }}
        >
          <img src={videographerImageUrl} alt="videographer" width="144"/>

          <Typography variant="body2" color="gray">
            Want to see metrics on your recent video? <br/>
            Upload and publish a video to get started.
          </Typography>

          <Button variant="contained" onClick={dispatchCreateContent}>
            Upload Video
          </Button>
        </CardContent>
      )}
    </Card>
  )
}

RecentSubscribersCard.propTypes = {
  recentSubscribers: PropTypes.array,
}

export default RecentSubscribersCard
