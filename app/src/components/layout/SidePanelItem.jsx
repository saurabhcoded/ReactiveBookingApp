import PropTypes from "prop-types";
import { Box, ButtonBase, alpha } from "@mui/material";
import { Link } from "react-router-dom";

export const SidePanelItem = (props) => {
  const { active = false, external, icon, path, title, onClickHandle } = props;

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: Link,
          to: path,
        }
    : onClickHandle
    ? {
        onClick: onClickHandle,
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 0.8,
          display: "flex",
          justifyContent: "flex-start",
          pl: "12px",
          pr: "12px",
          height: "45px",
          textAlign: "left",
          width: "100%",
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
          },
          ...(active && {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            "& .MuiSvgIcon-root": {
              color: "primary.main",
            },
          }),
        }}
        {...linkProps}>
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.400",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              color: "inherit",
            }}>
            {icon}
          </Box>
        )}
        <Box
          component="span"
          className="side-nav-item-text"
          sx={{
            color: "inherit",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            lineHeight: "24px",
            whiteSpace: "nowrap",
          }}>
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SidePanelItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
