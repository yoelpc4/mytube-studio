import PropTypes from 'prop-types';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BoxSpaceBetween from '@/components/BoxSpaceBetween.jsx';
import useContentEvent from '@/hooks/useContentEvent.jsx';
import { formatCount } from '@/utils/helpers.js';
import videographerImageUrl from '@/assets/images/videographer.svg'

function LatestContentCard({latestContent}) {
  const {dispatchCreateContent} = useContentEvent()

  return (
    <Card>
      {latestContent ? (
        <CardContent sx={{minHeight: '400px'}}>
          <Typography component="h2" variant="h6" sx={{mb: 2}}>
            Latest Video Performance
          </Typography>

          <Box sx={{mb: 2}}>
            <video
              title={latestContent.title}
              src={latestContent.videoUrl}
              poster={latestContent.thumbnailUrl}
              width="100%"
            ></video>
          </Box>

          <Box sx={{display: 'flex', flexDirection: 'column', rowGap: 1}}>
            <BoxSpaceBetween>
              <Typography variant="body2">
                Views
              </Typography>

              <Typography variant="body2">
                {formatCount(latestContent.viewsCount)}
              </Typography>
            </BoxSpaceBetween>

            <BoxSpaceBetween>
              <Typography variant="body2">
                Likes
              </Typography>

              <Typography variant="body2">
                {formatCount(latestContent.likesCount)}
              </Typography>
            </BoxSpaceBetween>
          </Box>
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

LatestContentCard.propTypes = {
  latestContent: PropTypes.object,
}

export default LatestContentCard
