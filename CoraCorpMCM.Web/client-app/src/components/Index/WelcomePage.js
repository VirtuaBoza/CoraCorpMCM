import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ROUTES from '../../constants/routeConstants';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtonContainer: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
  },
  heroButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const WelcomePage = ({ classes, history }) => {
  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          CoraCorp MCM
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          CoraCorp MCM is a free, open-source web application for managing art
          collections. Anyone can register a museum and invite other
          administrators to join your account to help manage your collection.
        </Typography>
        <div className={classes.heroButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.heroButton}
            onClick={() => history.push(ROUTES.REGISTER)}
          >
            Register Your Museum
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(WelcomePage);
