import React, { FC, ReactElement } from "react";
import SettingsJog from "./SettingsJog";
import SettingsLaserTest from "./SettingsLaserTest";

const Settings: FC<any> = (): ReactElement => {
  return (
    <>
      <SettingsLaserTest />
      <SettingsJog />
    </>
  );
};

export default Settings;
