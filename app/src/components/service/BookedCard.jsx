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
    <Card variant="outlined">
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h6" component="h3">
          {booking?.service?.name}
        </Typography>
        <Stack gap={1} className="info-list">
          <Typography variant="body2" color="text.secondary" display={"inline-flex"} sx={{ border: "1px solid black", padding: "5px 10px", alignItems: "center", justifyContent: "center", gap: "5px", borderRadius: "7px" }}>
            <CalendarMonth /> {booking?.bookDate}
          </Typography>
          <Typography variant="body2" color="text.secondary" display={"inline-flex"} sx={{ border: "1px solid black", padding: "5px 10px", alignItems: "center", justifyContent: "center", gap: "5px", borderRadius: "7px" }}>
            <LockClock /> {booking?.bookTime}
          </Typography>
        </Stack>
        <Stack gap={1} className="header" direction={"row"} alignItems={"center"}></Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small">Share</Button>
        <Button target="_blank" href={getZoomLink(booking.metadata)} size="small" variant="contained" color="primary" startIcon={<VideoCall />}>
          Join Zoom
        </Button>
      </CardActions>
    </Card>
  );
};
