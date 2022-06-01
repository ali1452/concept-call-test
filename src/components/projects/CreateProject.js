import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { Button, Card, Pagination, Typography } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

export default function CreateProject() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Should be 5 character long")
      .max(20, "should not exceed 20 characters")
      .required("Project name is required"),

    description: Yup.string()
      .min(5, "Should be 5 character long")
      .max(100, "should not exceed 100 characters")
      .required("Description is required"),

    url: Yup.string()
      .email("invalid email address")
      .required("email is required"),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      url: "",
      creation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      relocate();
    },
  });

  const relocate = () => {
    navigate("/dashboard/projects/all");
  };

  const mutation = useMutation((project) => {
    return axios.post("http://localhost:8000/projects", project);
  });
  return (
    <Card
      sx={{
        // marginX: "5%",
        margin:"auto",
        height: "auto",
        width: "360px",
        // minWidth: "100%",
        maxWidth: "80%",
        backgroundColor: "#f6f2f7",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          "& > :not(style)": { m: 2 },
          display: "inline-block",
          maxWidth: "90%",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Create New Project
        </Typography>

        <Input
          fullWidth
          placeholder="Project name"
          inputProps={ariaLabel}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.name ? formik.errors.name : null}
        </Typography>
        <Input
          fullWidth
          placeholder="Description"
          inputProps={ariaLabel}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.description ? formik.errors.description : null}
        </Typography>
        <Input
          fullWidth
          placeholder="Creation date"
          type="date"
          inputProps={ariaLabel}
          name="creation"
          value={formik.values.creation}
          onChange={formik.handleChange}
        />
        <Input
          fullWidth
          placeholder="Email"
          type="email"
          inputProps={ariaLabel}
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.url ? formik.errors.url : null}
        </Typography>
        <Button
          type="submit"
          style={{ margin: 10 }}
          variant="contained"
          fullWidth
        >
          Create
        </Button>
      </Box>
    </Card>
  );
}
