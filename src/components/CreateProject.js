import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import { Button, Card, Typography } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

export default function CreateProject() {
  return (
    <Card
      sx={{
        marginX: "5%",
        height: "auto",
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

        <Input fullWidth placeholder="Project name" inputProps={ariaLabel} />
        <Input fullWidth placeholder="Description" inputProps={ariaLabel} />
        <Input fullWidth placeholder="Creation date" inputProps={ariaLabel} />
        <Input fullWidth placeholder="url" inputProps={ariaLabel} />
        <Button
          onClick={() => {
            alert("created");
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
