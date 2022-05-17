import {createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { Button, Card, Typography } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

export default function Register() {
  const validationSchema = Yup.object().shape({
    // first_name: Yup.string()
    //   .min(3, "Should be 3 character long")
    //   .max(20, "should not exceed 20 characters")
    //   .required("First name is required"),

    // last_name: Yup.string()
    //   .min(3, "Should be 5 character long")
    //   .max(20, "should not exceed 20 characters")
    //   .required("Last name is required"),
    password: Yup.string()
    // .min("min 6 character require")
    .required("password is required"),

    email: Yup.string()
      .email("invalid email address")
      .required("email is required"),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      // first_name: "",
      // last_name: "",
      email: "",
      password:""
    },
    validationSchema,
    onSubmit: async (value)=>{
      try{
          await createUserWithEmailAndPassword(auth,value.email,value.password)
          relocate();
          console.log("User has successfully Registered")
      } catch (error){
          alert(error.message)
      }}
    // onSubmit: (values) => {
    //   mutation.mutate(values);
    //   relocate();
    // },
  });

  const relocate = () => {
    navigate("/");
  };

  const mutation = useMutation(async (user) => {
    // return axios.post("http://localhost:8000/users", user);
    return await axios.post("https://myreactdata-default-rtdb.firebaseio.com/users.json", user);

  });
  return (
    <Card
      sx={{
        marginX: "5%",
        marginTop:"5%",
        height: "auto",
        width: "360px",
        // minWidth: "100%",
        maxWidth: "80%",
        backgroundColor: "#f6f2f7",
        textAlign:"center"
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
          New User
        </Typography>
        {/* <Input
          fullWidth
          placeholder="First name"
          inputProps={ariaLabel}
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.first_name ? formik.errors.first_name : null}
        </Typography> */}
        {/* <Input
          fullWidth
          placeholder="Last name"
          inputProps={ariaLabel}
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.last_name ? formik.errors.last_name : null}
        </Typography> */}
        {/* <Input
          fullWidth
          placeholder="Creation date"
          type="date"
          inputProps={ariaLabel}
          name="creation"
          value={formik.values.creation}
          onChange={formik.handleChange}
        /> */}
        <Input
          fullWidth
          placeholder="Email"
          type="email"
          inputProps={ariaLabel}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.email ? formik.errors.email : null}
        </Typography>
        <Input
          fullWidth
          placeholder="password"
          type="password"
          inputProps={ariaLabel}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Typography sx={{ color: "error.main" }} variant="subtitle2">
          {formik.errors.password ? formik.errors.password : null}
        </Typography>
        <Button
          type="submit"
          style={{ margin: 10 }}
          variant="contained"
          fullWidth
        >
          Register
        </Button>
      </Box>
    </Card>
  );
}
