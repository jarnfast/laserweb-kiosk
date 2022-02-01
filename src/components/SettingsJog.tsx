import React, { ReactElement, FC, ChangeEvent, useState } from "react";
import { Container, TextField, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/lwActionTypes";

const SettingsJog: FC<any> = (): ReactElement => {
  const [uiFeedRate, setUiFeedRate] = useState(0);

  const dispatch = useDispatch();
  const { jogFeedRate } = useTypedSelector((state) => state.lwState);

  React.useEffect(() => {
    console.log("SJ started effect");
    setUiFeedRate(jogFeedRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeFeedRate = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newFeedRate = Number(event.target.value.replaceAll(/[^0-9]/g, ""));
    console.log("handleChangeFeedRate", newFeedRate);
    setUiFeedRate(newFeedRate);
    dispatch({
      type: ActionType.JOG_FEEDRATE_UPDATED,
      payload: newFeedRate,
    });
  };

  return (
    <>
      <Typography variant="h1">Jog Settings</Typography>
      <Container>
        <TextField
          id="outlined-required"
          label="Feed rate (mm/min)"
          size="small"
          onChange={handleChangeFeedRate}
          value={uiFeedRate}
        />
      </Container>
    </>
  );
};

export default SettingsJog;
