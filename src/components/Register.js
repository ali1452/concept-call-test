import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";

function Register(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation((user) => {
    return axios.post("http://localhost:8000/users", user);
  });
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh" }}>
      <Card
        sx={{
          display: "inline-block",
          marginTop: "10%",
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
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                required
                id="outlined-email"
                label="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              style={{ marginLeft: "20px" }}
              variant="contained"
              onClick={() => {
                mutation.mutate({ email: email, name: userName });
                navigate("/");
              }}
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
