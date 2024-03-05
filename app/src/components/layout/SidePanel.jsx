import PropTypes from "prop-types";
import DocumentCheckIcon from "@heroicons/react/24/solid/DocumentCheckIcon";
import { Box, Button, Divider, Drawer, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { SidePanelItem } from "./SidePanelItem";
import { useEffect } from "react";
import styled from "@emotion/styled";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { items } from "./panelconfig";

export const SidePanel = (props) => {
  const { open, setOpen, onClose } = props;
  const { SIDE_NAV_WIDTH, SIDE_NAV_MINI_WIDTH, TOP_NAV_HEIGHT } = props.layoutContants;
  const { pathname } = useLocation();
  const { syncUser, isAuthenticated, userData } = useAuth();
  const themeInfo = userData?.other_information?.theme;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  useEffect(() => {
    syncUser();
  }, [isAuthenticated]);

  /* Css for Opened Sidebar */
  const openedMixin = (theme) => ({
    width: SIDE_NAV_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  /* Css For Closed Sidebar */
  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `${SIDE_NAV_MINI_WIDTH}px`,
    " .side-nav-item-text": {
      display: "none",
    },
  });

  /* Custom Drawer Component */
  const CustomDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    backgroundColor: themeInfo?.sideNavBG || "neutral.700",
    color: themeInfo?.sideNavColor || "common.white",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  /* Drawer Content Component */
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}>
      <Box sx={{ p: 3 }}>{/* Here will be App or Users Info */}</Box>
      <Divider />
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1,
        }}>
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}>
          {items.map((item) => {
            const active = item.path ? pathname === item.path : false;

            return <SidePanelItem active={active} disabled={item.disabled} external={item.external} icon={item.icon} key={item.title} path={item.path} title={item.title} />;
          })}
          <SidePanelItem active={true} onClickHandle={() => setOpen((open) => !open)} icon={<SvgIcon fontSize="small"> {!open ? <ArrowRightIcon /> : <ArrowLeftIcon />}</SvgIcon>} title={"Close"} />
        </Stack>
      </Box>
      {open && (
        <>
          <Divider />
          <Box
            sx={{
              px: 2,
              py: 3,
            }}>
            <Typography color="primary.main" variant="subtitle2">
              Need Help
            </Typography>
            <Typography color="neutral.500" variant="body2" component={"p"}>
              Check out our professional designed certificate templates.
            </Typography>
            <Button
              component="a"
              endIcon={
                <SvgIcon fontSize="small">
                  <DocumentCheckIcon />
                </SvgIcon>
              }
              fullWidth
              href="https://material-kit-pro-react.devias.io/"
              sx={{ mt: 2 }}
              target="_blank"
              variant="contained">
              Explore Templates
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  /* Normal Drawer */
  if (lgUp) {
    return (
      <CustomDrawer
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "common.white",
            color: "neutral.600",
          },
        }}
        variant="permanent">
        {content}
      </CustomDrawer>
    );
  }

  /* Responsive Drawer */
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "common.white",
          color: "neutral.600",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary">
      {content}
    </Drawer>
  );
};

SidePanel.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
