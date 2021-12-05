import React, { ReactElement, FC, MouseEvent, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import {
  ActionType,
  MachineConnectionType,
} from "../redux/actionTypes/lwActionTypes";

import Container from "@mui/material/Container";
import { Link as LinkIcon, LinkOff as LinkOffIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MachineConnection: FC<any> = (): ReactElement => {
  const query = useQuery();
  const [uiPort, setUiPort] = useState("");
  const [uiBaudRate, setUiBaudRate] = useState(9600);
  const [autoConnect, setAutoConnect] = useState(query.get("autoconnect"));

  const dispatch = useDispatch();
  const { serverConnected, machineConnected, availablePorts, activePort } =
    useTypedSelector((state) => state.lwState);

  const availableBaudRates: number[] = [
    9600, 19200, 38400, 57600, 115200, 230400, 250000,
  ];

  let queryPort = query.get("port");
  let queryBaudRate = query.get("baudRate");

  React.useEffect(() => {
    console.log("MC started effetct");
    updateUiPortSettingsFromStateAndQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    console.log("useEffect MC activeport", activePort);
    updateUiPortSettingsFromStateAndQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePort]);

  React.useEffect(() => {
    console.log("port is now", uiPort);
  }, [uiPort]);

  React.useEffect(() => {
    console.log("baudrate is now", uiBaudRate);
  }, [uiBaudRate]);

  React.useEffect(() => {
    if (serverConnected && !machineConnected && autoConnect) {
      console.log("server connected, attempt to connect to machine");
      doConnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverConnected, machineConnected, autoConnect]);

  const updateUiPortSettingsFromStateAndQuery = (): string => {
    console.log("queryPort", queryPort);
    console.log("queryBaudRate", queryBaudRate);

    let defaultPort = queryPort != null ? queryPort : "";
    let chosenPort = activePort?.port != null ? activePort.port : defaultPort;
    console.log("setting port", chosenPort);
    setUiPort(chosenPort);

    let defaultBaudRate =
      queryBaudRate != null ? parseInt(queryBaudRate, 10) : 9600;
    let chosenBaudRate =
      activePort?.baudRate != null ? activePort.baudRate : defaultBaudRate;
    console.log("setting baudRate", chosenBaudRate);
    setUiBaudRate(chosenBaudRate);

    return chosenPort;
  };

  const doConnect = () => {
    dispatch({
      type: ActionType.CONNECT_MACHINE,
      payload: {
        type: MachineConnectionType.USB,
        port: uiPort,
        baudRate: uiBaudRate,
      },
    });
  };

  const handleClickConnect = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("click:machineConnect");
    doConnect();
  };

  const handleClickDisconnect = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("click:machineDisconnect");
    setAutoConnect(null);

    dispatch({
      type: ActionType.DISCONNECT_MACHINE,
    });
  };

  const handleChangePort = (event: SelectChangeEvent<string>) => {
    console.log("selected port", event.target.value);
    setUiPort(event.target.value);
  };

  const handleChangeBaudRate = (event: SelectChangeEvent<number>) => {
    console.log("selected baudrate", event.target.value);
    setUiBaudRate(event.target.value as number);
  };

  return (
    <>
      <Typography variant="h1">Machine Connection</Typography>
      <Container>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="select-port-label">USB / Serial port</InputLabel>
          <Select
            labelId="select-port-label"
            id="select-port"
            value={uiPort}
            size="small"
            sx={{ minWidth: 150 }}
            autoWidth
            label="USB / Serial port"
            disabled={!serverConnected || machineConnected}
            onChange={handleChangePort}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availablePorts.map((portName) => (
              <MenuItem key={portName} value={portName}>
                {portName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 60 }}>
          <InputLabel id="select-baudrate-label">Baud</InputLabel>
          <Select
            labelId="select-baudrate-label"
            id="select-baudrate"
            value={uiBaudRate}
            size="small"
            sx={{ minWidth: 60 }}
            autoWidth
            label="Baud"
            disabled={!serverConnected || machineConnected}
            onChange={handleChangeBaudRate}
          >
            {availableBaudRates.map((baudRate) => (
              <MenuItem key={baudRate} value={baudRate}>
                {baudRate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>
      <Container>
        <Button
          id="btn-connect"
          variant="contained"
          disabled={!serverConnected || machineConnected || !uiPort}
          onClick={handleClickConnect}
          startIcon={<LinkIcon />}
        >
          Connect
        </Button>
        <Button
          id="btn-disconnect"
          variant="contained"
          disabled={!machineConnected}
          onClick={handleClickDisconnect}
          startIcon={<LinkOffIcon />}
        >
          Disconnect
        </Button>
      </Container>
    </>
  );
};

export default MachineConnection;
