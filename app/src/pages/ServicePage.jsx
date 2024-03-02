import { BookingCard, ServiceReviews, ServiceSlides, ServiceDescription, ContactCard } from "@/components/service";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";

export const ServicePage = () => {
  return (
    <Box className="service">
      <Container>
        <Grid container spacing={3} className="grid-wrapper">
          <Grid item xs={8}>
            <Stack gap={2}>
              <ServiceSlides />
              <ServiceDescription />
              <ServiceReviews />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack gap={2} className="card-stacks">
              <BookingCard />
              <ContactCard />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
