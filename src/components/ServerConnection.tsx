import React, {
  ReactElement,
  FC,
  MouseEvent,
  useState,
  ChangeEvent,
} from "react";
import { Button, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/lwActionTypes";

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { Link, LinkOff } from "@mui/icons-material";
import DialogConnecting from "./DialogConnecting";
import { useLocation } from "react-router-dom";

// define interface to represent component props
interface ServerProps {
  initialServer?: String;
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ServerConnection: FC<ServerProps> = ({ initialServer }): ReactElement => {
  const [uiServer, setUiServer] = useState("");
  const [connecting, setConnecting] = useState(false);

  const dispatch = useDispatch();
  const { serverConnected, server } = useTypedSelector(
    (state) => state.lwState
  );

  const query = useQuery();

  let queryServer = query.get("server");
  let autoConnect = query.get("autoconnect");

  React.useEffect(() => {
    console.log("useEffect SC", server);
    console.log("autoConnect", autoConnect);

    let chosenServer = updateUiServerFromStateAndQuery();

    if (autoConnect && !serverConnected) {
      console.log("server not connected, performing autoconnect");
      doConnect(chosenServer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    console.log("useEffect SC server", server);
    updateUiServerFromStateAndQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  React.useEffect(() => {
    console.log("uiServer is now", uiServer);
  }, [uiServer]);

  React.useEffect(() => {
    console.log("still connecting?", connecting);
    if (connecting) {
      const timeout = setTimeout(() => {
        console.log("UI gave up waiting for connection..");
        handleCancel();
      }, 5000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connecting]);

  React.useEffect(() => {
    console.log("serverConnected changed", serverConnected);
    if (serverConnected) {
      setConnecting(false);
    }
  }, [serverConnected]);

  const updateUiServerFromStateAndQuery = (): string => {
    console.log("queryServer", queryServer);

    let defaultServer = queryServer != null ? queryServer : "";
    let chosenServer = server != null ? server : defaultServer;
    console.log("setting server", chosenServer);

    setUiServer(chosenServer);
    return chosenServer;
  };

  const doConnect = (connectToServer: string) => {
    setConnecting(true);

    dispatch({
      type: ActionType.CONNECT_SERVER,
      payload: connectToServer,
    });
  };

  const handleClickConnect = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("click:connect");

    doConnect(uiServer);
  };

  const handleClickDisconnect = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("click:disconnect");

    setConnecting(false);

    dispatch({
      type: ActionType.DISCONNECT_SERVER,
    });
  };

  const handleChangeServer = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUiServer(event.target.value);
  };

  const handleCancel = () => {
    console.log("handleCancel");

    dispatch({
      type: ActionType.DISCONNECT_SERVER,
    });

    //setConnected(false);
    setConnecting(false);
  };

  return (
    <>
      <DialogConnecting open={connecting} handleCancel={handleCancel} />
      <Typography variant="h1">Server Connection</Typography>
      <Container>
        <TextField
          required
          id="outlined-required"
          label="Server IP"
          size="small"
          onChange={handleChangeServer}
          disabled={serverConnected || connecting}
          value={uiServer}
        />
      </Container>
      <Container>
        <Button
          id="btn-connect"
          variant="contained"
          disabled={serverConnected || connecting || !uiServer}
          onClick={handleClickConnect}
          startIcon={<Link />}
        >
          Connect
        </Button>
        <Button
          id="btn-disconnect"
          variant="contained"
          disabled={!serverConnected}
          onClick={handleClickDisconnect}
          startIcon={<LinkOff />}
        >
          Disconnect
        </Button>
      </Container>
    </>
  );
};

export default ServerConnection;
