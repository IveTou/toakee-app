import { withStyles } from 'material-ui';

const cardWidth = 30;
const cardHeight = 27;

export const withIndexStyle = withStyles(theme => ({
  card: {
    width: theme.spacing.unit * cardWidth,
    height: theme.spacing.unit * cardHeight,
    flex: '0 0 auto',
    margin: theme.spacing.unit,
    marginRight: 0,
    marginTop: theme.spacing.unit * 2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    boxShadow: 'none',
    background: 'none',
    '&:hover $cardImage': {
      transform: 'scale(1.2)',
    }
  },
  cardMedia: {
    position: 'relative',
    overflow: 'hidden',
    height: theme.spacing.unit * 15,
  },
  cardImage: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.grey[200],
    backgroundPosition: 'center',
    transition: 'transform .3s ease-in-out',
  },
  cardContent: {
    padding: 0,
  },
  cardContentHeader: {
    padding: [theme.spacing.unit / 2, 0].join('px '),
    marginBottom: theme.spacing.unit / 2,
    overflow: 'hidden',
    maxHeight: theme.spacing.unit * 6,
    whiteSpace: 'normal',
  },
  cardContentInfo: {
    display: 'flex',
    fontSize: theme.typography.fontSize,
    color: theme.palette.text.secondary,
  },
  cardContentInfoDetails: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  cardContentInfoDetailsIcon: {
    fontSize: theme.typography.subheading.fontSize,
    verticalAlign: 'text-bottom',
  },
}));

export const withPlaceholderStyle = withStyles(theme => ({
  card: {
    margin: theme.spacing.unit,
    marginRight: 0,
    marginTop: theme.spacing.unit * 2,
    width: theme.spacing.unit * cardWidth,
    height: theme.spacing.unit * cardHeight,
  },
  cardMedia: {
    width: theme.spacing.unit * cardWidth,
    height: theme.spacing.unit * 15,
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));
