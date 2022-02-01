import React from "react";

import { ControlCamera, Cable, Settings as SettingsIcon } from "@mui/icons-material";

import Communications from "./components/Communications";
import Control from "./components/Control";
import Settings from "./components/Settings";

const Routes = [
  {
    path: "/communications",
    icon: Cable,
    sidebarName: "Communications",
    component: <Communications />,
  },
  {
    path: "/control",
    icon: ControlCamera,
    sidebarName: "Control",
    component: <Control />,
  },
  {
    path: "/settings",
    icon: SettingsIcon,
    sidebarName: "Settings",
    component: <Settings/>,
  }
];

export default Routes;
