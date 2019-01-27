import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Loading = () => {
  return (
    <div style={styles.container}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
