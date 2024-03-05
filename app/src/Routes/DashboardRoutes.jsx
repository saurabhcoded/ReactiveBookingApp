import { DashboardLayout } from "@/layouts/DashboardLayout";
import { CompanyDashboard, ManageServices } from "@/pages";
import { ManageBookings } from "@/pages/ManageBookings";
import {MyBookings} from "@/pages/MyBookings";
import React from "react";
import { useRoutes } from "react-router-dom";

let DashRoutesJSON = [
  {
    path: "/",
    element: <CompanyDashboard />,
  },
  {
    path: "/bookings",
    element: <ManageBookings />,
  },
  {
    path: "/mybookings",
    element: <MyBookings />,
  },
  {
    path: "/services",
    element: <ManageServices />,
  },
];
const DashboardRoutes = () => {
  let DashboardPages = useRoutes(DashRoutesJSON);
  return <DashboardLayout>{DashboardPages}</DashboardLayout>;
};

export default DashboardRoutes;
