import React from "react";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import DataTable from "@/components/common/DataTable";
import { getAllBookings } from "@/_services/servicesService";

export const ManageBookings = () => {
  const [bookings, setBookings] = React.useState({ data: [], loading: true });
  React.useEffect(() => {
    getAllBookings()
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
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Box variant="outlined" bgcolor={"white"} padding={2} borderRadius={1.5}>
          <Typography variant="h4">Manage Bookings</Typography>
        </Box>
        <Card variant="outlined" sx={{ p: 2 }}>
          <DataTable rows={bookings.data} cols={Cols} />
        </Card>
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
  { label: "Join Meet", key: "Metadata?.zoomData?.start_url", type: "conflink" },
];
