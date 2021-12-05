import React from "react";

import { ControlCamera, Cable } from "@mui/icons-material";

import Communications from "./components/Communications";
import Control from "./components/Control";

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
];

export default Routes;
