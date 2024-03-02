import React, { useEffect } from "react";
import { ArrowForwardIosSharp, Language, LockClock, VideoCall } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, Divider, FormControl, FormControlLabel, Grid, List, ListItem, ListItemIcon, ListItemText, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography, styled } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useFormik } from "formik";
import moment from "moment";

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
  color: theme.palette.primary.dark,
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.dark,
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

export const BookingDialog = ({ open = false, setOpen }) => {
  const handleClose = () => setOpen(false);
  
  const bookingFormik = useFormik({
    initialValues: {
      bookDate: moment().format("YYYY-MM-DD"),
      bookTime: "",
      name: "",
      email: "",
      contact: "",
      countryCode: "+91",
    },
  });
  return (
    <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogBoxContent bookingFormik={bookingFormik} />
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleClose} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DialogBoxContent = ({ bookingFormik }) => {
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
  return (
    <Box className="bookingDialogCourse">
      <Grid container>
        <Grid xs={5}>
          <Box height={"100%"} sx={{ borderRight: "1px dashed lightgray" }}>
            <Stack direction={"row"} gap={2} alignItems={"flex-start"} p={2}>
              <img className="courseavatar" src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp" />
              <Box>
                <Typography color={"primary.darkest"} component={"h5"} variant="h6" fontWeight={500}>
                  This is the Course Title
                </Typography>
                <Typography variant="body2" component={"p"} lineHeight={1.3}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid officia nostrum accusantium maiores veniam culpa labore corporis
                </Typography>
              </Box>
            </Stack>
            <Divider />
            <Box paddingInline={2}>
              <List dense={true} className="info-list">
                <ListItem>
                  <ListItemText primaryTypographyProps={{ fontSize: "20px" }} primary="You are booking [30] Minutes Session for [Course Title]" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LockClock color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="45 Min" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Language color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="English" />
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
                        color: theme.palette.primary.dark,
                        borderRadius: 1.5,
                        borderWidth: 2,
                        borderColor: theme.palette.primary.dark,
                        border: "2px solid",
                        backgroundColor: theme.palette.primary.lightest,
                      }),
                    }}
                  />
                </Box>
                <FormControl className="time-selector" fullWidth>
                  <RadioGroup name="bookTime" className="radio-group" value={values.bookTime} onChange={handleChange}>
                    <FormControlLabel fullWidth value="12:00AM" control={<Radio />} label="12:00AM" />
                    <FormControlLabel fullWidth value="01:00PM" control={<Radio />} label="01:00PM" />
                    <FormControlLabel fullWidth value="03:00PM" control={<Radio />} label="03:00PM" />
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
                  <TextField required onChange={handleChange} label="Full Name" name="name" value={values.name} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField required onChange={handleChange} label="Email Address" name="email" value={values.email} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={"row"} gap={1.5}>
                    <Select name="countryCode" value={values.countryCode} onChange={handleChange}>
                      {CountryCodeJSON.map((cn) => (
                        <MenuItem key={cn.name} value={cn.code}>
                          {cn.flagIcon}&nbsp;
                          {cn.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField required onChange={handleChange} type="number" label="Contact Number" name="contact" value={values.contact} fullWidth />
                  </Stack>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
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
