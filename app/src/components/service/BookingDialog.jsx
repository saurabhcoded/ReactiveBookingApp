import React, { useEffect } from "react";
import { createNewBooking } from "@/_services/servicesService";
import { ArrowForwardIosSharp, Language, LockClock, VideoCall } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, Divider, FormControl, FormControlLabel, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, styled } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useFormik } from "formik";
import moment from "moment";
import { ThankYouCard } from "./ThankYouCard";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />} {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lightest,
  color: theme.palette.primary.main,
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.primary.main}`,
}));

export const BookingDialog = ({ open = false, setOpen, service }) => {
  const [pageStatus, setPageStatus] = React.useState("booking");
  const isThankYou = pageStatus === "thankyou";
  const isBooking = pageStatus === "booking";
  const bookingFormik = useFormik({
    initialValues: {
      bookDate: moment().format("YYYY-MM-DD"),
      serviceID: service?.id,
      bookTime: "",
      name: "",
      email: "",
      contact: "",
      countryCode: "+91",
    },
    onSubmit: (values, helpers) => {
      console.log("Booking Confirmed", values);
      helpers.setSubmitting(true);
      createNewBooking(values)
        .then((response) => {
          helpers.setSubmitting(false);
          console.log("response", response);
          if (response.data.status === "success") {
            alert(response.data.message);
            setPageStatus("thankyou");
          }
        })
        .catch((error) => {
          console.log("Error", error);
          helpers.setSubmitting(false);
        });
    },
  });
  const { handleSubmit, isSubmitting } = bookingFormik;
  const handleClose = () => setOpen(false);

  return (
    <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogBoxContent service={service} bookingFormik={bookingFormik} showThankYou={isThankYou} />
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleSubmit} autoFocus disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const genBookSchedules = (start, end, gap) => {
  /* TODO: Get all the busy time duration and neglect those time durations */
  const result = [];

  // Parse the start and end times
  const startTime = new Date(`1970-01-01T${start}`);
  const endTime = new Date(`1970-01-01T${end}`);

  // Calculate the time difference in milliseconds
  const timeDiff = endTime - startTime;

  // Calculate the gap in milliseconds
  const gapInMillis = gap * 60 * 1000;

  // Calculate the number of intervals
  const intervals = Math.floor(timeDiff / gapInMillis);

  // Generate time values with gaps
  for (let i = 0; i <= intervals; i++) {
    const currentTime = new Date(startTime.getTime() + i * gapInMillis);
    const formattedTime = currentTime.toTimeString().slice(0, 5);
    result.push(formattedTime);
  }

  return result;
};

/* Booking  */
const DialogBoxContent = ({ bookingFormik, service, showThankYou = true }) => {
  const { setFieldValue, handleChange, values, errors } = bookingFormik;
  const handleDateChange = (date) => {
    setFieldValue("bookDate", date.format("YYYY-MM-DD"));
  };
  const [expanded, setExpanded] = React.useState("timings");
  const handleExpand = (panel) => {
    return () => {
      setExpanded(expanded === panel ? false : panel);
    };
  };

  /*  */

  let TimeDurations = genBookSchedules("12:00", "18:00", service?.duration);
  return (
    <Box className="bookingDialogCourse">
      <Grid container>
        <Grid xs={5}>
          <Box height={"100%"} sx={{ borderRight: "1px dashed lightgray" }}>
            <Stack direction={"row"} gap={2} alignItems={"flex-start"} p={2}>
              <img className="courseavatar" src={service.thumbnail_url} />
              <Box>
                <Typography color={"primary.darkest"} component={"h5"} variant="h6" fontWeight={500}>
                  {service.name}
                </Typography>
                <Typography variant="body2" component={"p"} lineHeight={1.3}>
                  {service.description}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            <Box paddingInline={2}>
              <List dense={true} className="info-list">
                <ListItem>
                  <ListItemText primaryTypographyProps={{ fontSize: "20px", lineHeight: "24px" }} primary={`You are booking ${service.duration} Minutes Session for "${service.name}"`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LockClock color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={`${service.duration} Min`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Language color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={service.language} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VideoCall color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Joining Details Will be sent you upon confirmation" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Grid>
        <Grid xs={7}>
          {showThankYou ? (
            <ThankYouCard redirecturl={"/bookings/" + values.email} />
          ) : (
            <>
              {/* Timings Accordian */}
              <Accordion expanded={expanded === "timings"} onChange={handleExpand("timings")}>
                <AccordionSummary aria-controls="timings-content" id="timings-header">
                  <Typography>Booking Date and Time</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack p={2} direction={"row"} gap={2} alignItems={"flex-start"} paddingInlineStart={2} className="date-time-picker">
                    <Box>
                      <StaticDatePicker
                        value={moment(values.bookDate)}
                        disablePast={true}
                        onChange={handleDateChange}
                        sx={{
                          ".MuiPickersToolbar-root": (theme) => ({
                            color: theme.palette.primary.main,
                            borderRadius: 1.5,
                            borderWidth: 2,
                            borderColor: theme.palette.primary.main,
                            border: "2px solid",
                            backgroundColor: theme.palette.primary.lightest,
                          }),
                        }}
                      />
                    </Box>
                    <FormControl className="time-selector" fullWidth>
                      <RadioGroup name="bookTime" className="radio-group" value={values.bookTime} onChange={handleChange}>
                        {TimeDurations.map((time) => (
                          <FormControlLabel fullWidth value={time} control={<Radio />} label={time} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </AccordionDetails>
              </Accordion>
              {/* Personal Details Accordian */}
              <Accordion expanded={expanded === "personal"} onChange={handleExpand("personal")}>
                <AccordionSummary aria-controls="personal-content" id="personal-header">
                  <Typography>Personal Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField required onBlur={handleChange} label="Full Name" name="name" defaultValue={values.name} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField required onBlur={handleChange} label="Email Address" name="email" defaultValue={values.email} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction={"row"} gap={1.5}>
                        <Select name="countryCode" defaultValue={values.countryCode} onBlur={handleChange}>
                          {CountryCodeJSON.map((cn) => (
                            <MenuItem key={cn.name} value={cn.code}>
                              {cn.flagIcon}&nbsp;
                              {cn.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <TextField required onBlur={handleChange} type="number" label="Contact Number" name="contact" defaultValue={values.contact} fullWidth />
                      </Stack>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const CountryCodeJSON = [
  {
    name: "IND",
    code: "+91",
    flagIcon: "🇮🇳",
  },
  {
    name: "USA",
    code: "+1",
    flagIcon: "🇺🇸",
  },
];
