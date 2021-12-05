import React, {
  ReactElement,
  FC,
} from "react";

import MachineConnection from "./MachineConnection";
import ServerConnection from "./ServerConnection";

const Communications: FC<any> = (): ReactElement => {
  
  return (
    <>
      <ServerConnection/>
      <MachineConnection/>
    </>
  );
};

export default Communications;
