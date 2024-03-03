import { getServiceBySlug } from "@/_services/servicesService";
import { LoadingComponent } from "@/components/common/LoadingComponent";
import { BookingCard, ServiceReviews, ServiceSlides, ServiceDescription, ContactCard } from "@/components/service";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export const ServicePage = () => {
  const [service, setService] = React.useState({
    data: {},
    loading: true,
  });
  const urlParams = useParams();

  React.useEffect(() => {
    if (urlParams.serviceslug) {
      getServiceBySlug(urlParams.serviceslug)
        .then((response) => {
          if (response.data.status === "success") {
            setService({ data: response.data.data, loading: false });
          } else {
            alert(response?.data?.message);
          }
        })
        .catch((error) => {
          setService({ data: null, loading: false });
        });
    }
  }, [urlParams.serviceslug]);
  return (
    <Box className="service">
      <Container>
        {service.loading ? (
          <LoadingComponent />
        ) : (
          <Grid container spacing={3} className="grid-wrapper">
            <Grid item xs={8}>
              <Stack gap={2}>
                <ServiceSlides service={service.data} />
                <ServiceDescription service={service.data} />
                <ServiceReviews service={service.data} />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack gap={2} className="card-stacks">
                <BookingCard service={service.data} />
                <ContactCard service />
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
