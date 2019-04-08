import React, { useState } from 'react';

// Material
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// Services
import { createItem } from '../../services/collectionService';

const AddItemDialog = ({ open, onClose }) => {
  const [item, setItem] = useState({ title: '' });

  const handleInputChange = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    createItem(item)
      .then(() => {
        onClose(null, true);
        setItem({ title: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          value={item.title}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
