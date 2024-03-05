import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
// import AccountOnboard from "src/sections/account/account-onboard";
import { SidePanel } from "@/components/layout/SidePanel";
import { useLocation } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { AppBar } from "@/components/layout";
import { useMediaQuery } from "@mui/material";

const SIDE_NAV_WIDTH = 280;
const SIDE_NAV_MINI_WIDTH = 80;
const TOP_NAV_HEIGHT = 64;

export const DashboardLayout = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const LayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: openNav ? SIDE_NAV_WIDTH : SIDE_NAV_MINI_WIDTH,
    },
  }));

  const LayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
  });

  const handlePathnameChange = useCallback(() => {
    if (openNav && !lgUp) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <AuthGuard>
      <AppBar layoutContants={{ SIDE_NAV_WIDTH, SIDE_NAV_MINI_WIDTH, TOP_NAV_HEIGHT }} openNav={openNav} onNavOpen={() => setOpenNav(true)} />
      <SidePanel onClose={() => setOpenNav(false)} open={openNav} setOpen={setOpenNav} layoutContants={{ SIDE_NAV_WIDTH, SIDE_NAV_MINI_WIDTH, TOP_NAV_HEIGHT }} />
      {/* <AccountOnboard /> */}
      <LayoutRoot>
        <LayoutContainer className="Content_Container" openNav={openNav}>
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </AuthGuard>
  );
};
