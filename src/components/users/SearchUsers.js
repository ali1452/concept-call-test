import { useQuery } from "react-query";
import axios from "axios";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  CircularProgress,
  Typography,
  Stack,
  Pagination,
  Avatar,
  TextField,
  InputAdornment,
  Button
} from "@mui/material";

import EditUsers from "./EditUsers";
import UsersAlertDialog from "./UsersAlerDialog";
import { useNavigate } from "react-router-dom";

export default function SearchUsers() {
  const navigation = useNavigate();
  const [user,setUser]=React.useState("");
  const [searchUser,setSearchUser]=React.useState(user);
  const [pageNumber,setPageNumber] =React.useState(1)
  const handleChange = (event, value) => {
    return setPageNumber(value)};
   
    const findUser =(user)=>{
     setSearchUser(user);
    console.log(user);
    }


    const handleSearch =(e,value)=>{
      // e.preventDefault();
      setUser(e.target.value)
}
  const { isLoading, error, data } = useQuery(["users",pageNumber,searchUser], () =>
    axios
      .get(`http://localhost:8000/users?_limit=5&_page=${pageNumber}&q=${searchUser}`)
      .then((res) => res.data)
  );
  

  if (isLoading) return <CircularProgress />;

  if (error) return <Alert>An error has occurred: {error.message}</Alert>;

  return (
  <Stack sx={{
    marginLeft:"4px",
    height:"100vh"
  }}>
  <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },marginBottom: 7,marginTop:-7
      }}
      noValidate
      autoComplete="off"
    >
    <Button variant="contained" onClick={()=> navigation(-1)}>Go Back</Button>

       <Typography variant="h6">Search User ||</Typography>
      <TextField
      autoFocus
      sx={{fontSize:"30px",}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
           <Button onClick={()=> findUser(user)}> <SearchIcon /></Button>
          </InputAdornment>
        ),
      }}
      id="outlined-basic"  variant="outlined"
      value={user}
      onChange={handleSearch}
      />
    </Box>
    <Stack style={{ backgroundColor: "#5891ed", height: "100vh", width:"1400px" }}>

      <Typography
        sx={{ marginX: 5, marginTop: -5, marginBottom: 2 }}
        variant="h5"
      >
        Users Detail
      </Typography>
      <div
        style={{
          border: "1px solid black",
          maxWidth: 1400,
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left">
                  <strong>Profile</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>ID</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>First Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Email</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Gender</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                     <TableCell align="right" component="th" scope="row">
                     <Avatar alt="image" src={row.url} />
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.gender===1?"Male":"Female"}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex" }}>
                      <EditUsers users={row} />
                      <UsersAlertDialog users={row} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack
        spacing={2}
        style={{ marginLeft: "auto", marginTop: "4px", marginRight: "15px" }}
      >
        <Pagination count={4} variant="outlined" shape="rounded"  onChange={handleChange}/>
      </Stack>
    </Stack>
    </Stack>
  );
}
