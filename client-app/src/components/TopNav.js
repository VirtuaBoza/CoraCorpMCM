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
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

import AuthContext from '../AuthContext';
import ROUTES from '../constants/routeConstants';

const styles = theme => ({
  menuButton: {
    marginLeft: -theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
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
  list: {
    width: 250,
  },
  topDrawer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

const TopNav = ({ history, classes }) => {
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {auth.isAuthenticated() && (
          <>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={() => setDrawerOpen(false)}
                onKeyDown={() => setDrawerOpen(false)}
              >
                <div className={classes.list}>
                  <div className={classes.topDrawer}>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                      <ChevronLeftIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {[].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
            </Drawer>
          </>
        )}
        <Typography
          variant="h6"
          color="inherit"
          className={classes.brand}
          onClick={() => history.push(ROUTES.HOME)}
        >
          CoraCorp MCM
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
              onClick={() => history.push(ROUTES.REGISTER)}
            >
              Register
            </Button>
            <Button
              className={classes.navButton}
              color="inherit"
              variant="outlined"
              onClick={() => history.push(ROUTES.LOGIN)}
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
