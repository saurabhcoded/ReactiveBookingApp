import React from "react";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { BookingDialog } from ".";

export const BookingCard = () => {
  const [bookNow, setBookNow] = React.useState(false);
  const openBookNow = () => setBookNow(true);
  return (
    <>
      <Card variant="outlined" className="booking-card">
        <CardContent sx={{ padding: 2 }}>
          <Stack gap={1}>
            <Stack gap={1} className="header" direction={"row"} alignItems={"center"}>
              <img src="https://cdn-icons-png.flaticon.com/512/5435/5435707.png" alt="service" height={60} />
              <Box>
                <Typography className="heading">One Time</Typography>
                <Typography className="amount">Rs. 500</Typography>
              </Box>
            </Stack>
            <Button size="large" variant="contained" fullWidth onClick={openBookNow}>
              Book Now
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <BookingDialog open={bookNow} setBookNow={setBookNow} />
    </>
  );
};
