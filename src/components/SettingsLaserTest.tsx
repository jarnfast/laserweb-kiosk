import React, { ReactElement, FC, ChangeEvent, useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/lwActionTypes";

const TextFieldSpinner = styled(TextField)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
    -webkit-appearance: inner-spin-button !important;
  }
`;

const SettingsLaserTest: FC<any> = (): ReactElement => {
  const [uiDuration, setUiDuration] = useState(500);
  const [uiPwmMaxS, setUiPwmMaxS] = useState(1000);
  const [uiPower, setUiPower] = useState(1);

  const dispatch = useDispatch();
  const { laserTestDuration, laserTestPower, laserTestPwmMaxS } =
    useTypedSelector((state) => state.lwState);

  React.useEffect(() => {
    console.log("SLT started effect");
    setUiDuration(laserTestDuration);
    setUiPower(laserTestPower);
    setUiPwmMaxS(laserTestPwmMaxS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeDuration = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newDuration = Number(event.target.value.replaceAll(/[^0-9]/g, ""));
    console.log("handleChangeDuration", newDuration);
    if (newDuration < 0) {
      newDuration = 0;
    }
    setUiDuration(newDuration);
    dispatch({
      type: ActionType.LASERTEST_DURATION_UPDATED,
      payload: newDuration,
    });
  };

  const handleChangePower = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newPower = Number(event.target.value.replaceAll(/[^0-9]/g, ""));
    console.log("handleChangePower", newPower);
    if (newPower > 100) {
      newPower = 100;
    } else if (newPower < 0) {
      newPower = 0;
    }
    setUiPower(newPower);
    dispatch({
      type: ActionType.LASERTEST_POWER_UPDATED,
      payload: newPower,
    });
  };

  const handleChangePwmMaxS = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newPwmMaxS = Number(event.target.value.replaceAll(/[^0-9]/g, ""));
    console.log("handleChangePwmMaxS", newPwmMaxS);
    if (newPwmMaxS < 0) {
      newPwmMaxS = 0;
    }
    setUiPwmMaxS(newPwmMaxS);
    dispatch({
      type: ActionType.LASERTEST_PWM_MAX_S_UPDATED,
      payload: newPwmMaxS,
    });
  };

  return (
    <>
      <Typography variant="h1">Laser Test Settings</Typography>
      <Container>
        <TextFieldSpinner
          id="outlined-required"
          label="Power (%)"
          size="small"
          onChange={handleChangePower}
          value={uiPower}
          type="number"
          style={{ width: "50%" }}
        />
        <TextFieldSpinner
          id="outlined-required"
          label="Duration (ms)"
          size="small"
          onChange={handleChangeDuration}
          value={uiDuration}
          type="number"
          style={{ width: "50%" }}
        />
        <TextFieldSpinner
          id="outlined-required"
          label="PWM Max S"
          size="small"
          onChange={handleChangePwmMaxS}
          value={uiPwmMaxS}
          type="number"
        />
      </Container>
    </>
  );
};

export default SettingsLaserTest;
