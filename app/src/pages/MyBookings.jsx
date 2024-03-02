import React from "react";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import DataTable from "@/components/common/DataTable";
import { getPersonalBooking } from "@/_services/servicesService";
import { useParams } from "react-router-dom";
import { BookedCard } from "@/components/service/BookedCard";

export const MyBookings = () => {
  const [bookings, setBookings] = React.useState({ data: [], loading: true });
  const params = useParams();
  React.useEffect(() => {
    if (params.useremail) {
      getPersonalBooking(params.useremail)
        .then((response) => {
          if (response.data.status === "success") {
            setBookings({ data: response.data.data, loading: false });
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.useremail]);
  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Box variant="outlined" bgcolor={"white"} padding={2} borderRadius={1.5}>
          <Typography variant="h4">My Bookings</Typography>
        </Box>
        <Grid container spacing={3} className="grid-wrapper">
          {Array.isArray(bookings.data) &&
            bookings.data.map((booking) => (
              <Grid item xs={4}>
                <BookedCard key={booking.id} booking={booking} />
              </Grid>
            ))}
        </Grid>
      </Stack>
    </Container>
  );
};

const Cols = [
  { label: "ID", key: "id", type: "number" },
  { label: "Booking Date", key: "bookDate", type: "string" },
  { label: "Booking Hour", key: "bookTime", type: "string" },
  { label: "zoomMeetingID", key: "zoomMeetingID", type: "string" },
  { label: "googleEventID", key: "googleEventID", type: "string" },
  { label: "Name", key: "name", type: "string" },
  { label: "Email", key: "email", type: "string" },
  { label: "Phone", key: "contact", type: "string" },
  { label: "Country", key: "countryCode", type: "string" },
  { label: "Service Name", key: "service.name", type: "eval" },
  { label: "Created", key: "created_at", type: "datehour" },
  { label: "Last Edit", key: "updated_at", type: "datehour" },
];
