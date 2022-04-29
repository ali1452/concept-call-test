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
import ArchiveIcon from "@material-ui/icons/Archive";
import {
  Alert,
  CircularProgress,
  Typography,
  Stack,
  Pagination,
  IconButton,
} from "@mui/material";

import EditProject from "./EditProject";
import AlertDialog from "./Dialogue";

export default function Projects({ status }) {
  const [pageNumber,setPageNumber] =React.useState(1)
  const queryClient = useQueryClient();
  const queryString = status === "all" ? "" : `status=${status}`;
  // console.log({ status, queryString });
  const handleChange = (event, value) => {
    return setPageNumber(value);}

  const { isLoading, error, data } = useQuery(["projects",pageNumber, status], () =>
    axios
      .get(`http://localhost:8000/projects?_limit=5&_page=${pageNumber}&${queryString}`)
      .then((res) => res.data)
  );
  // console.log("data", data.length);

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
                <TableCell align="right">
                  <strong>ID</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Projects Name</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Creation</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Description</strong>
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
                      <AlertDialog project={row} />
                      {row.status !== 2 && (
                        <IconButton
                          variant="outlined"
                          style={{ marginLeft: "8px" }}
                          onClick={() => {
                            mutation.mutate({ ...row, status: 2 });
                          }}
                        >
                          <ArchiveIcon />
                        </IconButton>
                      )}
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
        <Pagination count={3} variant="outlined" shape="rounded"  onChange={handleChange}/>
      </Stack>
    </Stack>
  );
}
