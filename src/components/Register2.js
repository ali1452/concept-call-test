import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

function Register(props) {
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [gender, setGender] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm_password, setConfirm_Password] = useState("");
  // const [email, setEmail] = useState("");
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(5, "Should be 5 character long")
      .max(20, "should not exceed 20 characters")
      .required("First name is required"),

    last_name: Yup.string()
      .min(5, "Should be 5 character long")
      .max(100, "should not exceed 100 characters")
      .required("Last name is required"),

    email: Yup.string()
      .email("invalid email address")
      .required("email is required"),
  });
  const formik = useFormik({
    initialValues: {
      first_name: "Ali",
      last_name: "Abbas",
      email: "ali@gmail.com",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      relocate();
    },
    // onSubmit: ()=>{alert('hello')}
  });

  const mutation = useMutation((user) => {
    return axios.post("http://localhost:8000/users", user);
  });
  const navigate = useNavigate();
  const relocate = () => {
    return navigate("/");
  };
  return (
    <div style={{ height: "100vh" }}>
      <Card
        sx={{
          display: "inline-block",
          marginTop: "5%",
          marginLeft: "8%",
          border: "1px solid black",
          maxWidth: "90%",
          backgroundColor: "#f6f2f7",
        }}
      >
        <CardContent>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "25ch", display: "flex" },
            }}
            onSubmit={formik.handleSubmit}
            // noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                // label="first name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
              />
               <TextField
                required
                id="outlined-required"
                label="last name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
              />
              {/* <TextField
                required
                id="outlined-required"
                label="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              /> */}
              {/* <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                required
                id="outlined-required"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                value={confirm_password}
                onChange={(e) => setConfirm_Password(e.target.value)}
              /> */}

              <TextField
                required
                id="outlined-email"
                label="email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <Button
              style={{ marginLeft: "20px" }}
              variant="contained"
              type="submit"
              // onClick={() => {
              //   mutation.mutate({first_name, last_name, email, gender  });
              //   navigate("/");
              // }}
            >
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
