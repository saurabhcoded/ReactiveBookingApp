import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const ServiceCard = ({ service }) => {
  return (
    <Card variant="outlined">
      <CardMedia sx={{ height: 240 }} image={service?.thumbnail_url} title={service?.name} />
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {service?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service?.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small">Share</Button>
        <Button size="small" variant="contained" LinkComponent={Link} to={`/service/${service?.slug}`}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
};
