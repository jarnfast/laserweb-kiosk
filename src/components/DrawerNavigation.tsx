import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import { PowerSettingsNew } from "@mui/icons-material";
import { ActionType } from "../redux/actionTypes/lwActionTypes";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import DialogConfirm from "./DialogConfirm";
import { NavLink, withRouter } from "react-router-dom";
import Routes from "../Routes";

const drawerWidth = 100;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  /*transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),*/
  overflowX: "hidden",
  padding: theme.spacing(1),
});

const closedMixin = (theme: any) => ({
  /*transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),*/
  overflowX: "hidden",
  padding: theme.spacing(1),
  //width: `calc(${theme.spacing(7)} + 1px)`,
  //width: `calc(${theme.spacing(12)} + 1px)`,
  width: "32px",
  //[theme.breakpoints.up("sm")]: {
  //  width: `calc(${theme.spacing(9)} + 1px)`,
  //},
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ListItemText = styled(MuiListItemText)`
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

const ListItemIcon = styled(MuiListItemIcon)`
  min-width: 32px;
`;

const DrawerNavigation: React.FC = (props: any) => {
  //const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [showShutdownDialog, setShowShutdownDialog] = useState(false);

  const dispatch = useDispatch();
  const { serverConnected, serverFeatureShutdownEnabled } = useTypedSelector(
    (state) => state.lwState
  );

  const activeRoute = (routeName: any) => {
    return props.location.pathname === routeName ? true : false;
  };

  const handleDrawerClose = () => {
    console.log("handleDrawerClose");
    setOpen(false);
  };

  /*const toggleDrawer = () => {
    console.log("toggleDrawer");
    setOpen(!open);
  };*/

  const handleShutdownClicked = () => {
    setShowShutdownDialog(true);
    console.log("handleShutdownClicked");
  };
  const handleShutdownCancel = () => {
    setShowShutdownDialog(false);
  };
  const handleShutdownConfirm = () => {
    setShowShutdownDialog(false);
    dispatch({
      type: ActionType.SHUTDOWN_SERVER,
    });
  };

  // a button to open/close the drawer
  /*<List disablePadding>
        <ListItem button disableGutters key="navopen" onClick={toggleDrawer}>
          <ListItemIcon>
            <ExpandCircleDown />
          </ListItemIcon>
        </ListItem>
      </List>*/

  return (
    <Drawer variant="permanent" open={open} onClose={handleDrawerClose}>
      <List disablePadding>
        {Routes.map((prop, key) => {
          return (
            <NavLink
              to={prop.path}
              style={{ textDecoration: "none" }}
              key={key}
            >
              <ListItem disablePadding={true} selected={activeRoute(prop.path)}>
                <ListItemIcon>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText primary={prop.sidebarName} />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      {serverFeatureShutdownEnabled && [
        <Divider />,
        <List disablePadding>
          <ListItem
            button
            disableGutters
            key="power"
            disabled={!serverConnected}
            onClick={handleShutdownClicked}
          >
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
          </ListItem>
        </List>,
        <DialogConfirm
          title="Shutdown?"
          content="Do you really want to shutdown the LaserWeb server?"
          handleCancel={handleShutdownCancel}
          handleConfirm={handleShutdownConfirm}
          open={showShutdownDialog}
        />,
      ]}
    </Drawer>
  );
};

export default withRouter(DrawerNavigation);
