import React from "react";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import DataTable from "@/components/common/DataTable";
import { getAllServices } from "@/_services/servicesService";

export const ManageServices = () => {
  const [services, setServices] = React.useState({ data: [], loading: true });
  React.useEffect(() => {
    getAllServices()
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
    <Container maxWidth={"xl"} sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Stack direction={"row"} gap={2} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Typography color={"primary"} variant="h5">
              Manage Services
            </Typography>
            <Typography>Here you can manage all your Services</Typography>
          </Box>
          <Stack direction={"row"}>
            <Button variant="contained" size="small">
              Add New
            </Button>
          </Stack>
        </Stack>
        <Card variant="outlined" sx={{ p: 2 }}>
          <DataTable rows={services.data} cols={Cols} />
        </Card>
      </Stack>
    </Container>
  );
};

const Cols = [
  { label: "ID", key: "id", type: "number" },
  { label: "Name", key: "name", type: "string" },
  { label: "Slug", key: "slug", type: "string" },
  { label: "Category", key: "category", type: "string" },
  { label: "Language", key: "language", type: "string" },
  { label: "Duration", key: "duration", type: "string" },
  { label: "MainPrice", key: "mainprice", type: "number" },
  { label: "DiscountedPrice", key: "discountedprice", type: "number" },
  { label: "Status", key: "status", type: "string" },
  { label: "Created", key: "created_at", type: "datehour" },
  { label: "Last Edit", key: "updated_at", type: "datehour" },
];
