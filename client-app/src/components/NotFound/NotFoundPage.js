import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const NotFoundPage = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Typography variant="h1">404</Typography>
      <Typography component="h2" variant="h4">
        Page not found.
      </Typography>
    </div>
  );
};

export default withStyles(styles)(NotFoundPage);
