import { useQuery, useMutation, useQueryClient } from "react-query";
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
import {
  Alert,
  CircularProgress,
  Typography,
  Stack,
  Pagination,
  Avatar
} from "@mui/material";

import EditUsers from "./EditUsers";
import UsersAlertDialog from "./UsersAlerDialog";

export default function Users({ status }) {
  const [pageNumber,setPageNumber] =React.useState(1)
  const queryClient = useQueryClient();
//   const queryString = status === "all" ? "" : `status=${status}`;
  // console.log({ status, queryString });
  const handleChange = (event, value) => {
    return setPageNumber(value);}

  const { isLoading, error, data } = useQuery(["users",pageNumber], () =>
    axios
      .get(`http://localhost:8000/users?_limit=5&_page=${pageNumber}`)
      .then((res) => res.data)
  );
  // console.log("data", data.length);

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

  if (isLoading) return <CircularProgress />;

  if (error) return <Alert>An error has occurred: {error.message}</Alert>;

  return (
    <Stack style={{ backgroundColor: "#5891ed", height: "100vh" }}>
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
                {/* <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Description</strong>
                </TableCell> */}
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
                     <Avatar alt="Remy Sharp" src={row.url} />
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>

                  <TableCell align="center">{row.email}</TableCell>
                  {/* <TableCell align="center">{row.gender}</TableCell> */}

                  <TableCell align="center">
                    {row.gender==1?"Male":"Female"}
                  </TableCell>
                  {/* <TableCell align="center">{row.description}</TableCell> */}
                  <TableCell align="center">
                    <Box sx={{ display: "flex" }}>
                      <EditUsers users={row} />
                      <UsersAlertDialog users={row} />
                      {/* {row.status !== 2 && (
                        <IconButton
                          variant="outlined"
                          style={{ marginLeft: "8px" }}
                          onClick={() => {
                            mutation.mutate({ ...row, status: 2 });
                          }}
                        >
                          <ArchiveIcon />
                        </IconButton>
                      )} */}
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
  );
}
