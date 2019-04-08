import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import * as auth from '../../utilities/auth';

const styles = theme => ({
  container: {
    padding: `${theme.spacing.unit * 6}px 0 ${theme.spacing.unit * 4}px`,
  },
});

const DashboardPage = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {auth.getProfile().museumName}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(DashboardPage);
