import { Language, LockClock, VideoCall } from "@mui/icons-material";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";

export const BookingDialog = ({ open = false, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogBoxContent />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DialogBoxContent = () => {
  return (
    <Box className="bookingDialogCourse">
      <Grid container>
        <Grid xs={5}>
          <Box sx={{ borderRight: "1px dashed lightgray" }}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <img className="courseavatar" src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp" />
              <Typography component={"h5"} variant="h6">
                This is the Course Title
              </Typography>
            </Stack>
            <Divider sx={{ marginY: 2 }} />
            <Typography component={"h5"} variant="h6">
              You are booking [30] Minutes Session for [Course Title]
            </Typography>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <LockClock />
                </ListItemIcon>
                <ListItemText primary="45 Min" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Language />
                </ListItemIcon>
                <ListItemText primary="English" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VideoCall />
                </ListItemIcon>
                <ListItemText primary="Joining Details Will be sent you upon confirmation" />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Stack direction={"row"} gap={2} alignItems={"center"} paddingInline={2}>
            <Box>
              <StaticDatePicker
                defaultValue={moment()}
                disablePast={true}
                sx={{
                  ".MuiPickersToolbar-root": {
                    color: "#1565c0",
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor: "#2196f3",
                    border: "2px solid",
                    backgroundColor: "#bbdefb",
                  },
                }}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
