import React, { Component } from 'react';

// Services
import { getItems } from '../../services/collectionService';

// Material
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

// Components
import AddItemDialog from './AddItemDialog';
import routeConstants from '../../constants/routeConstants';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

class CollectionPage extends Component {
  state = {
    items: [],
    modalOpen: false,
    newItem: {
      title: '',
    },
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    getItems().then(items => this.setState({ items }));
  };

  handleAddClicked = () => {
    this.setState({ modalOpen: true });
  };

  handleItemEditClicked = id => {
    this.props.history.push({
      pathname: routeConstants.ITEM_EDIT,
      search: `?id=${id}`,
    });
  };

  handleClose = (e, itemAdded) => {
    if (itemAdded) {
      this.loadItems();
    }

    this.setState({ modalOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { items, modalOpen } = this.state;

    return (
      <div className={classes.container}>
        <Fab color="primary" aria-label="Add" onClick={this.handleAddClicked}>
          <AddIcon />
        </Fab>
        <Grid container spacing={40}>
          {items.map(item => (
            <Grid item key={item.id} sm={6} md={4} lg={2}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.handleItemEditClicked(item.id)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <AddItemDialog open={modalOpen} onClose={this.handleClose} />
      </div>
    );
  }
}

export default withStyles(styles)(CollectionPage);
