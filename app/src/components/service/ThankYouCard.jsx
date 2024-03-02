import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Link } from "react-router-dom";

export const ThankYouCard = ({ redirecturl = "/" }) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} padding={3} sx={{ background: "#003241" }}>
      <ConfettiExplosion />
      <img src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/preview.gif" alt="" style={{ width: "100%" }} />
      <Typography variant="h4" component="h1" gutterBottom color={"#FFF"}>
        Congratulations 🎉
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom color={"#FFF"}>
        You have Successfully Booked
      </Typography>
      <Button LinkComponent={Link} to={redirecturl} size="large" variant="outlined" color="success">
        Booking Details
      </Button>
    </Stack>
  );
};
