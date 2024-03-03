import { Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material";
import React from "react";

export const ServiceCardSkeleton = () => {
  return (
    <Card variant="outlined">
      <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Skeleton />
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" disabled>
          Share
        </Button>
        <Button size="small" variant="contained" disabled>
          Book
        </Button>
      </CardActions>
    </Card>
  );
};
