import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { Button, Card, Pagination, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const ariaLabel = { "aria-label": "description" };

export default function CreateProject() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [creation, setCreation] = React.useState("");
  const navigate = useNavigate();

  const relocate = () => {
    navigate("/dashboard/projects/all");
  };

  const mutation = useMutation((project) => {
    return axios.post("http://localhost:8000/projects", project);
  });
  return (
    <Card
      sx={{
        marginX: "5%",
        height: "auto",
        width: "90%",
      }}
    >
      <Box
        component="form"
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          fullWidth
          placeholder="Description"
          inputProps={ariaLabel}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          fullWidth
          placeholder="Creation date"
          type="date"
          inputProps={ariaLabel}
          value={creation}
          onChange={(e) => setCreation(e.target.value)}
        />
        <Input
          fullWidth
          placeholder="URL"
          type="email"
          inputProps={ariaLabel}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          onClick={() => {
            mutation.mutate(
              {
                name,
                description,
                url,
                creation,
              },
              setName(""),
              setDescription(""),
              setUrl(""),
              setCreation(""),
              relocate()
            );
          }}
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
