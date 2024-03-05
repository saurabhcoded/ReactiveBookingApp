import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import { Alert, Avatar, Badge, Box, Button, IconButton, Stack, SvgIcon, Tooltip, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import usePopover from "@/hooks/usePopover";
import { AccountPopover } from "./AccountPopover";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { useCallback, useEffect, useState } from "react";
// import { sendAccountVerificationLink } from "src/_services/userService";
import { urlConstants } from "@/_constants/urlConstants";
// import SearchDialog from "src/components/search/search-dialog";
import useAuth from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

export const AppBar = (props) => {
  const { SIDE_NAV_WIDTH, SIDE_NAV_MINI_WIDTH, TOP_NAV_HEIGHT } = props.layoutContants;
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const { userData } = useAuth();
  let SelectWidth = props.openNav ? SIDE_NAV_WIDTH : SIDE_NAV_MINI_WIDTH;

  const [resendCount, setResendCount] = useState(0);
  const [reloadTimer, setReloadTimer] = useState(0);
  const handleResendVerification = useCallback(() => {
    // sendAccountVerificationLink();
    setResendCount(120);
    setReloadTimer((old) => old + 1);
  }, [reloadTimer]);
  useEffect(() => {
    const countInterval = setInterval(() => {
      setResendCount((availed) => {
        if (availed === 0) {
          clearInterval(countInterval);
          return availed;
        } else {
          return availed - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countInterval);
    };
  }, [reloadTimer]);
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          borderBottom: "1px solid",
          borderBottomColor: (theme) => theme.palette.grey[300],
          left: {
            lg: `${SelectWidth}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SelectWidth}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}>
        {/* Alerts Stack for User */}
        <Stack>
          {/* Alert For Account Inactive */}
          {userData?.status !== "active" && (
            <Alert
              severity="success"
              sx={{ borderRadius: 0 }}
              action={
                <Button
                  disabled={Boolean(resendCount)}
                  onClick={handleResendVerification}
                  size="small"
                  color="success"
                  startIcon={
                    <SvgIcon>
                      <ArrowPathIcon />
                    </SvgIcon>
                  }
                  variant="contained">
                  Resend {Boolean(resendCount) && `(${resendCount} Sec)`}
                </Button>
              }>
              We have sent you a verification link to email <b>{userData?.email}</b>
            </Alert>
          )}
        </Stack>
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
            <NavLink to={"/"}>
              <img src="/logo.png" alt="bookhappy" height={40} />
            </NavLink>
            {/* <SearchDialog /> */}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
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
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src={userData?.profile?.url || urlConstants?.defaultAvatar} //TODO: Default Avatar
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover anchorEl={accountPopover.anchorRef.current} open={accountPopover.open} onClose={accountPopover.handleClose} />
    </>
  );
};

AppBar.propTypes = {
  onNavOpen: PropTypes.func,
};
