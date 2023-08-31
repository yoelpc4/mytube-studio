import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function TabPanel({children, scope, tab, index}) {
  return (
    <Box
      role="tabpanel"
      hidden={tab !== index}
      id={`${scope}-tabpanel-${index}`}
      aria-labelledby={`${scope}-tab-${index}`}
    >
      <Box sx={{p: 3}}>
        {children}
      </Box>
    </Box>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  scope: PropTypes.string,
  tab: PropTypes.number,
  index: PropTypes.any,
}

export default TabPanel
