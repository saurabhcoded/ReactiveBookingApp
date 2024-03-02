import React from "react";
import { Button, Card, Stack } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";

export const ContactCard = () => {
  return (
    <Card variant="outlined" className="contact-card" sx={{ padding: 2 }}>
      <Stack gap={2} direction={"row"}>
        <Button size="large" variant="outlined" fullWidth>
          Book Demo
        </Button>
        <Button size="large" color="success" variant="outlined" fullWidth startIcon={<WhatsApp />}>
          Contact
        </Button>
      </Stack>
    </Card>
  );
};
