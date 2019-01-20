import React, { Component } from 'react';
import getItems from '../../services/collectionService';

class CollectionPage extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    getItems().then(items => this.setState({ items }));
  }

  render() {
    return (
      <ul>
        {this.state.items.map(item => (
          <li key={item.id}>
            Id: {item.id} Museum: {item.museumId}
          </li>
        ))}
      </ul>
    );
  }
}

export default CollectionPage;
