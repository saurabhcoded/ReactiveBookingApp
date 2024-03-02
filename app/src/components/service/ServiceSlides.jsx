import React from "react";
import { Card } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const ServiceSlides = ({ service }) => {
  return (
    <Card variant="outlined" className="service-card">
      <Swiper className="service-slides" modules={[Pagination, Navigation]} spaceBetween={30} pagination={{ clickable: true }} navigation={true}>
        {SlidesJson.map((slide) => (
          <SwiperSlide key={slide.slideID} className="service-slide">
            <ServiceSlide slide={slide} slideImage={service?.thumbnail_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

const ServiceSlide = ({ slide, slideImage }) => {
  return <img src={slideImage} alt={slide.slideTitle} className="service-slide-img" />;
};

const SlidesJson = [
  {
    slideID: 1,
    slideTitle: "Slide 1",
    slideImage: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    slideID: 2,
    slideTitle: "Slide 2",
    slideImage: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    slideID: 3,
    slideTitle: "Slide 3",
    slideImage: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    slideID: 4,
    slideTitle: "Slide 4",
    slideImage: "https://images.pexels.com/photos/716281/pexels-photo-716281.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
