import { Box, Card, Typography } from "@mui/material";
import React from "react";

export const ServiceDescription = ({ service }) => {
  return (
    <Card variant="outlined" className="service-description-card">
      <Typography variant="h4" component="h1" gutterBottom>
        {service?.name}
      </Typography>
      <Typography component="p" gutterBottom>
        {service?.description}
      </Typography>
      <Box>
        <Typography variant="h6">More About Service</Typography>
        <div dangerouslySetInnerHTML={{ __html: service?.content }}></div>
      </Box>
    </Card>
  );
};
