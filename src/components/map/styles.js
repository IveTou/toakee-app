import { withStyles } from 'material-ui';

const markerHeight = 34;
const markerWidth = 20;

export const withIndexStyle = withStyles(theme => ({
  root: {
    height: theme.spacing.unit * 50,
    position: 'relative',
  },
  mini: {
    height: theme.spacing.unit * 17,
  },
  centerMarker: {
    position: 'absolute',
    background: 'url(http://maps.gstatic.com/mapfiles/markers2/marker.png) no-repeat',
    top: '50%',
    left: '50%',
    height: markerHeight,
    width: markerWidth,
    marginLeft: markerWidth / -2,
    marginTop: markerHeight * -1,
  },
  searchBox: {
    border: 0,
    height: theme.spacing.unit * 4,
    padding: 0,
    paddinLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit *2,
    boxShadow: theme.shadows[1],
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipsis',
    marginTop: theme.spacing.unit,
    width: `calc(100% - ${theme.spacing.unit * 21})`,
    maxWidth: theme.spacing.unit * 40,
  },
}));
