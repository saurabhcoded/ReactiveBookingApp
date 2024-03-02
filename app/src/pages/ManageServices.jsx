import React from "react";
import { Box, Container, Typography } from "@mui/material";

export const ManageServices = () => {
  return (
    <Container sx={{ paddingY: 2 }}>
      <Box variant="outlined" bgcolor={"white"} padding={2}>
        <Typography variant="h4">Manage Services</Typography>
      </Box>
    </Container>
  );
};
