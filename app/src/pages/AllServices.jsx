import { getActiveServices } from "@/_services/servicesService";
import { ServiceCard } from "@/components/service";
import { ServiceCardSkeleton } from "@/components/service/ServiceCardSkeleton";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export const AllServices = () => {
  const [services, setServices] = React.useState({
    data: [],
    loading: true,
  });
  React.useEffect(() => {
    getActiveServices()
      .then((response) => {
        if (response.data.status === "success") {
          setServices({ data: response.data.data, loading: false });
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box className="service">
      <Container>
        <Box>
          <Typography variant="h5" component="h1">
            All Services
          </Typography>
          <Typography gutterBottom>List of available active services by bookhappy</Typography>
          <Grid container spacing={3} className="grid-wrapper">
            {services.loading
              ? [1, 2, 3].map((skeleton) => {
                  return (
                    <Grid item xs={4}>
                      <ServiceCardSkeleton key={skeleton} />
                    </Grid>
                  );
                })
              : services.data.map((service) => (
                  <Grid item xs={4}>
                    <ServiceCard key={service.id} service={service} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
