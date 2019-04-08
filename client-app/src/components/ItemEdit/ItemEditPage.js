import React from 'react';
import routeConstants from '../../constants/routeConstants';
import MuseumHubContext from '../../contexts/MuseumHubContext';

import { getItem, updateItem } from '../../services/collectionService';

import isUUID from 'validator/lib/isUUID';
import isEqual from 'lodash.isequal';

import Loading from '../Shared/Loading';

// Material
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class ItemEditPage extends React.Component {
  state = {
    item: {
      id: null,
      title: '',
    },
    loading: true,
    updatedElsewhere: false,
    subscribed: false,
    saving: false,
  };

  componentDidMount() {
    const { location, history } = this.props;
    const id = new URLSearchParams(location.search).get('id');
    if (id && isUUID(id)) {
      getItem(id).then(item => this.setState({ item, loading: false }));
      const hubConnection = this.context;
      if (hubConnection) {
        this.subscribe(hubConnection);
      }
    } else {
      history.replace(routeConstants.NOT_FOUND);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hubConnection = this.context;
    if (!this.state.subscribed && hubConnection) {
      this.subscribe(hubConnection);
    }
  }

  componentWillUnmount() {
    if (this.context) {
      this.context.off('ItemUpdated');
    }
  }

  subscribe = hubConnection => {
    console.log('subscribing to ItemUpdated');
    hubConnection.on('ItemUpdated', this.handleItemUpdated);
    this.setState({ subscribed: true });
  };

  handleItemUpdated = updatedItem => {
    const itemInStateWithNewConcurrencyStamp = {
      ...this.state.item,
      concurrencyStamp: updatedItem.concurrencyStamp,
    };
    if (!isEqual(itemInStateWithNewConcurrencyStamp, updatedItem)) {
      this.setState({ updatedElsewhere: true });
    } else {
      this.setState({ item: itemInStateWithNewConcurrencyStamp });
    }
  };

  handleInputChange = e => {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value },
    });
  };

  handleSave = () => {
    this.setState(
      {
        saving: true,
      },
      async () => {
        const item = await updateItem(this.state.item);
        this.setState({ saving: false, item });
      },
    );
  };

  render() {
    const { classes } = this.props;
    const { item, loading, updatedElsewhere, saving } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {updatedElsewhere && 'Updated elsewhere'}
          <TextField
            required
            id="title"
            name="title"
            label="Title of item"
            fullWidth
            value={item.title}
            onChange={this.handleInputChange}
          />
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSave}
              className={classes.button}
              disabled={saving || updatedElsewhere}
            >
              Save
            </Button>
          </div>
        </Paper>
      </main>
    );
  }
}

ItemEditPage.contextType = MuseumHubContext;

export default withStyles(styles)(ItemEditPage);
