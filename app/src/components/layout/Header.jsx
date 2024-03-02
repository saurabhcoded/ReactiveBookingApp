import React, { useState } from "react";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { Avatar, Badge, Box, Button, IconButton, Menu, MenuItem, Stack, SvgIcon, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

let SelectWidth = "0px";
const SIDE_NAV_WIDTH = 280;
const SIDE_NAV_MINI_WIDTH = 80;
const TOP_NAV_HEIGHT = 64;

export const Header = () => {
  const [openMenuID, setOpenMenuID] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const onNavOpen = () => {};
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const manageMenu = (MenuID) => {
    return (event) => {
      if (MenuID === null) {
        setAnchorEl(null);
        setOpenMenuID(null);
        return;
      }
      setAnchorEl(event.currentTarget);
      setOpenMenuID(MenuID);
    };
  };
  const handleNavigate = (path) => {
    return () => {
      setOpenMenuID(null);
      navigate(path);
    };
  };
  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
        position: "sticky",
        borderBottom: "1px solid",
        borderBottomColor: (theme) => theme.palette.neutral[200],
        left: {
          lg: `${SelectWidth}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${SelectWidth}px)`,
        },
        zIndex: (theme) => theme.zIndex.appBar,
      }}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 2,
        }}>
        <Stack alignItems="center" direction="row" spacing={2}>
          {!lgUp && (
            <IconButton onClick={onNavOpen}>
              <SvgIcon fontSize="small">
                <Bars3Icon />
              </SvgIcon>
            </IconButton>
          )}
          <Typography variant="h6">Reactive Booking</Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          {/* Admin Menu */}
          <Button id="admin-button" onClick={manageMenu("admin")}>
            Admin <KeyboardArrowDown />
          </Button>
          <Menu id="admin-menu" anchorEl={anchorEl} open={openMenuID === "admin"} onClose={manageMenu(null)}>
            <MenuItem onClick={handleNavigate("/admin/bookings")}>Manage Bookings</MenuItem>
            <MenuItem onClick={handleNavigate("/admin/services")}>Manage Services</MenuItem>
          </Menu>
          <NavLink to="/">All Services</NavLink>
          <Tooltip title="Contacts">
            <IconButton>
              <SvgIcon fontSize="small">
                <UsersIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="success" variant="dot">
                <SvgIcon fontSize="small">
                  <BellIcon />
                </SvgIcon>
              </Badge>
            </IconButton>
          </Tooltip>
          {/* <Avatar
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
            src={userData?.profile?.url || urlConstants.defaultAvatar}
          /> */}
        </Stack>
      </Stack>
    </Box>
  );
};
