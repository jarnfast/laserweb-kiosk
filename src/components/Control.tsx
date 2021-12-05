import React, { ReactElement, FC, MouseEvent, useState } from "react";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { ActionType } from "../redux/actionTypes/lwActionTypes";

import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  GpsNotFixed as SetZeroIcon,
  GpsFixed as GoToZeroIcon,
  LocalFireDepartment as LaserTestIcon,
} from "@mui/icons-material";

const ControlButton = styled(Button)(({ theme }) => ({
  width: 46,
  minWidth: 46,
  height: 46,
  minHeight: 46,
  padding: theme.spacing(1),
  "& .MuiButton-startIcon": {
    margin: 0,
    padding: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 40,
  },
}));

// 320 - 32 : 288ish

const Control: FC<any> = (): ReactElement => {
  const [uiJogDistance, setUiJogDistance] = useState(10);

  const [machineRunning, setMachineRunning] = useState(false);
  const [machinePaused, setMachinePaused] = useState(false);

  const dispatch = useDispatch();

  const { machineConnected, workPosition, machinePosition, machineState } =
    useTypedSelector((state) => state.lwState);

  const jogDistances: number[] = [0.1, 1, 10, 50, 100];

  React.useEffect(() => {
    console.log("Control started effect");
  }, []);

  React.useEffect(() => {
    switch (machineState) {
      case "home":
      case "run":
        setMachineRunning(true);
        setMachinePaused(false);
        break;
      case "hold":
        setMachinePaused(true);
        break;
      default:
        setMachineRunning(false);
        setMachinePaused(false);
    }
  }, [machineState]);

  const handleJog = (axis: string, direction: number) => {
    dispatch({
      type: ActionType.JOG,
      payload: {
        axis: axis,
        distance: direction * uiJogDistance,
        feedrate: 1800,
      },
    });
  };

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("clickButton:", event.currentTarget.id);
    switch (event.currentTarget.id) {
      case "btn-playpause":
        if (machinePaused) {
          dispatch({
            type: ActionType.RESUME,
          });
        } else {
          dispatch({
            type: ActionType.PAUSE,
          });
        }
        break;
      case "btn-jog-up":
        handleJog("Y", 1);
        break;
      case "btn-jog-down":
        handleJog("Y", -1);
        break;
      case "btn-jog-left":
        handleJog("X", -1);
        break;
      case "btn-jog-right":
        handleJog("X", 1);
        break;
      case "btn-go-to-zero":
        dispatch({
          type: ActionType.RUN_COMMAND,
          payload: "G0 X0Y0",
        });
        break;
      case "btn-go-to-home":
        dispatch({
          type: ActionType.HOME,
          payload: "all",
        });
        break;
      case "btn-set-zero":
        dispatch({
          type: ActionType.SET_ZERO,
          payload: "all",
        });
        break;

      default:
      // do nothing
    }
    // go zero G0 X0Y0
  };

  const handleChangeJogDistance = (event: SelectChangeEvent<number>) => {
    console.log("selected jogdistance", event.target.value);
    setUiJogDistance(event.target.value as number);
  };

  // Running = running / resumed
  // Paused = paused
  const formatPosition = (pos: number | null): string => {
    if (pos == null) {
      return "-";
    }
    return pos.toFixed(3);
    //return Number.parseFloat(pos).toFixed(3);
  };

  return (
    <>
      <Grid container rowSpacing={1} spacing={1} columns={6}>
        <Grid item xs={5}>
          <TextField
            id="machine-state"
            label="State"
            size="small"
            contentEditable={false}
            value={machineState}
          />
        </Grid>
        <Grid item xs={1}>
          <ControlButton
            id="btn-playpause"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || !machineRunning}
            startIcon={machinePaused ? <PlayIcon /> : <PauseIcon />}
          />
        </Grid>

        <Grid item container xs={6} rowSpacing={1} spacing={1} columns={4}>
          <Grid item xs={1}>
            <Typography variant="h3">WPos:</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3" align="right">
              {formatPosition(workPosition.x)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3" align="right">
              {formatPosition(workPosition.y)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3" align="right">
              {formatPosition(workPosition.z)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3">MPos:</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3" align="right">
              {formatPosition(machinePosition.x)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3" align="right">
              {formatPosition(machinePosition.y)}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h3" align="right">
              {formatPosition(machinePosition.z)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <ControlButton
            id="btn-go-to-home"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<HomeIcon />}
          />
        </Grid>
        <Grid item xs={1}>
          <ControlButton
            id="btn-set-zero"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<SetZeroIcon />}
          />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <ControlButton
            id="btn-jog-up"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<ArrowUpwardIcon />}
          />
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={1}>
          <ControlButton
            id="btn-laser-test"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<LaserTestIcon />}
          />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <ControlButton
            id="btn-jog-left"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<ArrowBackIcon />}
          />
        </Grid>
        <Grid item xs={1}>
          <ControlButton
            id="btn-go-to-zero"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<GoToZeroIcon />}
          />
        </Grid>
        <Grid item xs={1}>
          <ControlButton
            id="btn-jog-right"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<ArrowForwardIcon />}
          />
        </Grid>

        <Grid item xs={2}>
          <FormControl sx={{ minWidth: 64 }}>
            <InputLabel id="select-jog-distance-lbl">mm</InputLabel>
            <Select
              labelId="select-jog-distance-lbl"
              id="select-jog-distance"
              value={uiJogDistance}
              size="small"
              sx={{ minWidth: 64 }}
              autoWidth
              label="mm"
              disabled={!machineConnected || machineRunning}
              onChange={handleChangeJogDistance}
            >
              {jogDistances.map((distance) => (
                <MenuItem key={distance} value={distance}>
                  {distance}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <ControlButton
            id="btn-jog-down"
            onClick={handleClickButton}
            variant="outlined"
            disabled={!machineConnected || machineRunning}
            startIcon={<ArrowDownwardIcon />}
          />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
};

export default Control;
