import { CalendarMonth, LockClock, VideoCall } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const BookedCard = ({ booking }) => {
  const getZoomLink = (metadata) => {
    let data = JSON.parse(metadata);
    return data?.zoomData?.join_url;
  };
  return (
    <Card variant="outlined" className="booked-card past">
      <CardMedia sx={{ height: 240 }} image={"https://booking.saurabhcoded.com/storage/resources/mqJS89jGaxSXB9WOiVvHCpGobR0Yd2P3e8vUE8z8.png"} title={booking?.service?.name} />
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {booking?.service?.name}
        </Typography>
        <Stack gap={1} direction={"row"} className="card-tags">
          <Typography variant="body2" color="text.secondary" display={"inline-flex"} className="tag">
            <CalendarMonth fontSize="small" /> {booking?.bookDate}
          </Typography>
          <Typography variant="body2" color="text.secondary" display={"inline-flex"} className="tag">
            <LockClock fontSize="small" /> {booking?.bookTime}
          </Typography>
        </Stack>
        <Stack gap={1} className="header" direction={"row"} alignItems={"center"}></Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button target="_blank" href={getZoomLink(booking.metadata)} size="small" variant="contained" color="primary" startIcon={<VideoCall />}>
          Join Zoom
        </Button>
      </CardActions>
    </Card>
  );
};
