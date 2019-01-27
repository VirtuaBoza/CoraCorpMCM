import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import AuthContext from '../AuthContext';

const styles = theme => ({
  brand: {
    cursor: 'pointer',
    marginRight: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  navButton: {
    marginLeft: theme.spacing.unit,
  },
});

const TopNav = ({ history, classes }) => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.brand}
          onClick={() => history.push('/')}
        >
          CoraCorpMCM
        </Typography>
        <div className={classes.grow} />
        {auth.isAuthenticated() ? (
          <>
            <IconButton
              className={classes.navButton}
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  auth.logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              className={classes.navButton}
              color="inherit"
              onClick={() => history.push('/register')}
            >
              Register
            </Button>
            <Button
              className={classes.navButton}
              color="inherit"
              variant="outlined"
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(withRouter(TopNav));
