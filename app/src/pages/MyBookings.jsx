import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { getPersonalBooking } from "@/_services/servicesService";
import { BookedCard } from "@/components/service/BookedCard";

export const MyBookings = () => {
  const [bookings, setBookings] = React.useState({ data: [], loading: true });
  React.useEffect(() => {
    getPersonalBooking("saurabhcoded@gmail.com")
      .then((response) => {
        if (response.data.status === "success") {
          setBookings({ data: response.data.data, loading: false });
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container maxWidth="xl" sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Stack direction={"row"} gap={2} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Typography color={"primary"} variant="h5">
              My Bookings
            </Typography>
            <Typography>Here you can see all your past and future Bookings</Typography>
          </Box>
          <Stack direction={"row"}>
            <Button variant="contained" size="small">
              New Booking
            </Button>
          </Stack>
        </Stack>
        <Grid container spacing={3} className="grid-wrapper">
          {Array.isArray(bookings.data) &&
            bookings.data.map((booking) => (
              <Grid item xs={4} lg={3}>
                <BookedCard key={booking.id} booking={booking} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Container>
  );
};