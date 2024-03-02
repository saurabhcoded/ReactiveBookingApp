import React from "react";
import { Box, Button, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { BookingDialog } from ".";
import { Language, LockClock, VideoCall } from "@mui/icons-material";

export const BookingCard = () => {
  const [bookNow, setBookNow] = React.useState(false);
  const openBookNow = () => setBookNow(true);
  return (
    <>
      <Card variant="outlined" className="booking-card" sx={{ padding: 2 }}>
        <Stack gap={1}>
          <Typography variant="h5" className="heading">
            Web Development Course
          </Typography>
          <List dense={true} className="info-list">
            <ListItem>
              <ListItemIcon>
                <LockClock color="primary" />
              </ListItemIcon>
              <ListItemText primary="45 Min" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Language color="primary" />
              </ListItemIcon>
              <ListItemText primary="English" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VideoCall color="primary" />
              </ListItemIcon>
              <ListItemText primary="Joining Details Will be sent you upon confirmation" />
            </ListItem>
          </List>
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
      </Card>
      <BookingDialog open={bookNow} setOpen={setBookNow} />
    </>
  );
};
