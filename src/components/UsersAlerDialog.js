import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function UsersAlertDialog({ users }) {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const deleteRow = useMutation(
    (user) => {
      return axios.delete(
        "http://localhost:8000/users/" + user?.id,
        user
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon color="error" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete <strong>{users.first_name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            color="error"
            onClick={() => deleteRow.mutate(users)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
