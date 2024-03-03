import { Container, Stack, Typography } from "@mui/material";
import React from "react";

export const LoadingComponent = () => {
  return (
    <Container>
      <Stack gap={2} width={"100%"} height={"70vh"} alignItems={"center"} justifyContent={"center"}>
        <img src="/loader.webp" alt="loading" height={200} width={200} style={{ objectFit: "cover" }} />
        <Typography variant="h5">Loading</Typography>
      </Stack>
    </Container>
  );
};
