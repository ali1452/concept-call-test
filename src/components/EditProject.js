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

export default function EditProject({ project }) {
  const notify = () => toast("Wow so easy!");

  const formik = useFormik({
    initialValues: project,
    onSubmit: (values) => {
      mutation.mutate(values);
      notify();
      setOpen(false);
    },
  });
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  // console.log("project", project);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation(
    (project) => {
      return axios.put("http://localhost:8000/projects/" + project.id, project);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
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
              name="name"
              id="standard-basic"
              label="Project Name"
              variant="standard"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              name="description"
              id="standard-basic"
              label="Description"
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="URL"
              name="url"
              variant="standard"
              value={formik.values.url}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              // disabled
              id="standard-basic"
              label="Creation Date"
              variant="standard"
              type="date"
              name="creation"
              value={formik.values.creation}
              onChange={formik.handleChange}
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.status}
                name="status"
                label="Status"
                onChange={formik.handleChange}
              >
                <MenuItem value={1}>Complete</MenuItem>
                <MenuItem value={2}>Acrhived</MenuItem>
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
