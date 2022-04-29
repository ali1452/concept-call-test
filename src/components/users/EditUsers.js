import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

import {
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function EditUsers({ users }) {
  const notify = () => toast("Wow so easy!");

  const formik = useFormik({
    initialValues: users,
    onSubmit: (values) => {
      mutation.mutate(values);
      notify();
      setOpen(false);
    },
  });
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation(
    (user) => {
      return axios.put("http://localhost:8000/users/" + user.id, user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  return (
    <div>
      <IconButton color="success" variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{ display: "inline-block" }}>
            <TextField
              fullWidth
              name="first_name"
              id="standard-basic"
              label="First Name"
              variant="standard"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
             <TextField
              fullWidth
              name="last_name"
              id="standard-basic"
              label="Last Name"
              variant="standard"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              name="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.gender}
                name="gender"
                label="Gender"
                onChange={formik.handleChange}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <MenuItem value={3}>Genderqueer</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">
              Update
            </Button>
            <ToastContainer />
          </CardActions>
        </form>
      </Dialog>
    </div>
  );
}
