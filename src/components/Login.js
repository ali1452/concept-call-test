import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleButton from 'react-google-button'
import { auth,provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import React, { useContext,useState } from "react";
import { useNavigate } from "react-router";
import { Button, TextField, Typography, Link, Card } from "@mui/material";
import { Box } from "@mui/system";
import { UserContext } from "../App";

function Login(props) {
  const [email,setEmail] = useState();
  const [password,setPassword] =useState();
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const LogIn= async ()=>{
    try{
         await signInWithEmailAndPassword(
            auth,
            email,
            password)
            setIsLoggedIn(true);
            navigate('users');
        alert("User has successfully Sign In")
    } catch (error){
        alert(error.message)
    }
}
  const signInWithGoogle =()=>{
    signInWithPopup(auth,provider).then((result) =>{
      localStorage.setItem('true',true)
      setIsLoggedIn(true)
      navigate('users')
    })
  }
  return (
    <div style={{ height: "100vh" }}>
      <Card
        sx={{
          display: "inline-block",
          marginTop: "10%",
          marginX: "10%",
          border: "1px solid black",
          maxWidth: "90%",
          height: "300px",
          backgroundColor: "#f6f2f7",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "25ch", display: "flex" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <Typography textAlign="center" variant="h5">
              Log In
            </Typography>

            <TextField
              required
              id="outlined-email"
              onChange={(e)=>setEmail(e.target.value)}
              label="email"
              type="email"
              autoComplete="off"
            />

            <TextField
              required
              id="outlined-required"
              onChange={(e)=>setPassword(e.target.value)}
              label="Password"
              type="password"
              autoComplete="off"
            />
            <Button
              style={{ marginLeft: "100px",marginBottom:"2px" }}
              variant="contained"
              onClick={ LogIn }
            >
              Log In
            </Button>
            <br></br>
            <GoogleButton
             style={{marginLeft: "25px"  }}
             onClick={signInWithGoogle}
             />
            <Link
              style={{ margin: "40%" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Link>
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default Login;
