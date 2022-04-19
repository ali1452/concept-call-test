import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Alert,
  CircularProgress,
  Typography,
  Stack,
  Pagination,
  IconButton,
} from "@mui/material";
import EditProject from "./EditProject";

import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

function createData(id, name, creation, status) {
  return { id, name, creation, status };
}

export default function Projects({ status }) {
  const queryClient = useQueryClient();
  const queryString = status === "all" ? "" : `status=${status}`;
  console.log({ status, queryString });

  const { isLoading, error, data } = useQuery(["projects", status], () =>
    axios
      .get(`http://localhost:8000/projects?_limit=10&${queryString}`)
      .then((res) => res.data)
  );
  // console.log("data", data);

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
  const deleteRow = useMutation(
    (project) => {
      return axios.delete(
        "http://localhost:8000/projects/" + project.id,
        project
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
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
        {status == 1 ? "Completed Projects Detail" : " Projects Details"}
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
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Projects Name</TableCell>
                <TableCell align="center">Creation</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.creation}</TableCell>
                  <TableCell align="center">
                    {row.status === 1 ? "Complete" : "Archive"}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex" }}>
                      <EditProject project={row} />
                      {row.status !== 2 && (
                        <Button
                          variant="outlined"
                          style={{ marginLeft: "8px" }}
                          onClick={() => {
                            mutation.mutate({ ...row, status: 2 });
                          }}
                        >
                          Archived
                        </Button>
                      )}
                      {/* <Button
                        variant="outlined"
                        style={{ marginLeft: "8px" }}
                        onClick={() => {
                          deleteRow.mutate(row);
                        }}
                      >
                        Delete
                      </Button> */}
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          deleteRow.mutate(row);
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
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
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </Stack>
  );
}
