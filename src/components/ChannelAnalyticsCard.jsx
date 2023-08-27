import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import BoxSpaceBetween from '@/components/BoxSpaceBetween.jsx';

function ChannelAnalyticsCard({subscribersCount, contentsCount, contentViewsCount, contentLikesCount}) {
  return (
    <Card sx={{minHeight: '400px'}}>
      <CardContent>
        <Typography component="h2" variant="h6" sx={{mb: 2}}>
          Channel Analytics
        </Typography>

        <Typography variant="body2">
          Current subscribers
        </Typography>

        <Typography variant="h5">
          {subscribersCount}
        </Typography>

        <Divider sx={{mt: 4, mb: 2}} />

        <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 1}}>
          <Box>
            <Typography variant="body1" sx={{fontWeight: 500}}>
              Summary
            </Typography>

            <Typography variant="body2" color="gray">
              Lifetime
            </Typography>
          </Box>

          <BoxSpaceBetween>
            <Typography variant="body2">
              Contents
            </Typography>

            <Typography variant="body2">
              {contentsCount}
            </Typography>
          </BoxSpaceBetween>

          <BoxSpaceBetween>
            <Typography variant="body2">
              Views
            </Typography>

            <Typography variant="body2">
              {contentViewsCount}
            </Typography>
          </BoxSpaceBetween>

          <BoxSpaceBetween>
            <Typography variant="body2">
              Likes
            </Typography>

            <Typography variant="body2">
              {contentLikesCount}
            </Typography>
          </BoxSpaceBetween>
        </Box>
      </CardContent>
    </Card>
  )
}

ChannelAnalyticsCard.propTypes = {
  subscribersCount: PropTypes.number,
  contentsCount: PropTypes.number,
  contentViewsCount: PropTypes.number,
  contentLikesCount: PropTypes.number,
}

export default ChannelAnalyticsCard
