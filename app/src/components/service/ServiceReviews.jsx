import { Edit } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Grid, LinearProgress, Rating, Stack, Typography, linearProgressClasses, styled } from "@mui/material";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export const ServiceReviews = () => {
  return (
    <Card variant="outlined" sx={{ padding: 2 }}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
        <Box>
          <Typography color={"primary"} variant="h5" component="h5">
            Reviews
          </Typography>
          <Typography gutterBottom>Wanted to write your review about this service</Typography>
        </Box>
        <Button variant="contained" size="small" startIcon={<Edit />}>
          Write
        </Button>
      </Stack>
      <Box className="review-box" marginTop={2}>
        <Stack direction={"row"} gap={2}>
          <ReviewScoreBox />
          <Box sx={{ width: "100%" }}>
            <Stack gap={2} className="rating">
              <ReviewLineComponent title="Features" rating={4.6} ratingCount={40} />
              <ReviewLineComponent title="Value for Money" rating={4.2} ratingCount={40} />
              <ReviewLineComponent title="Ease of Use" rating={2.7} ratingCount={40} />
              <ReviewLineComponent title="Customer Support" rating={4.9} ratingCount={40} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

const ReviewScoreBox = ({}) => {
  return (
    <Box className="score-box">
      <Typography variant="h6" component="h6" gutterBottom>
        Overall Score
      </Typography>
      <Stack direction="row" alignItems={"flex-end"} justifyContent={"center"} className="rating">
        <Typography variant="h5" className="rating-outcome">
          4.5/
        </Typography>
        <Typography variant="h6" className="rating-from">
          5
        </Typography>
      </Stack>
      <Rating name="read-only" value={4} readOnly />
      <Typography className="score-count-basis" variant="body2" component="p" gutterBottom marginTop={2}>
        Based on 255 Reviews
      </Typography>
    </Box>
  );
};

const ReviewLineComponent = ({ title, ratingCount, rating }) => {
  return (
    <Box display={"block"}>
      <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
        <Typography gutterBottom>
          {title} ({ratingCount})
        </Typography>
        <Typography variant="h6" gutterBottom>
          {rating}
        </Typography>
      </Stack>
      <BorderLinearProgress variant="determinate" value={rating * 20} />
    </Box>
  );
};
