import {
  Action,
  ActionType,
  Position,
  payloadConnectMachineType,
} from "../actionTypes/lwActionTypes";

interface State {
  //comments: Comment[];
  //loading: boolean;
  //error: string | null;
  serverConnected: boolean;
  machineConnected: boolean;
  //activeInterface: string,
  availablePorts: string[];
  //port: string | null,
  server: string | null;
  activePort: payloadConnectMachineType | null;

  jogFeedRate: number;
  laserTestDuration: number;
  laserTestPower: number;
  laserTestPwmMaxS: number;

  serverFeatureShutdownEnabled: boolean;

  runStatus: string;
  machineState: string;

  workPosition: Position;
  machinePosition: Position;
}

const initialState = {
  serverConnected: false,
  machineConnected: false,
  serverFeatureShutdownEnabled: false,
  availablePorts: [],
  server: null,
  activePort: null,

  // TODO get from env
  jogFeedRate: 1800,
  laserTestDuration: 200,
  laserTestPower: 1,
  laserTestPwmMaxS: 1000,

  runStatus: "n/a",
  machineState: "n/a",
  workPosition: { x: null, y: null, z: null },
  machinePosition: { x: null, y: null, z: null },
};

const lwReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SERVER_CONNECTED:
      return {
        ...state,
        serverConnected: true,
        server: action.payload,
      };
    case ActionType.SERVER_DISCONNECTED:
      return {
        ...state,
        serverConnected: false,
        machineConnected: false,
        availablePorts: [],
        activePort: null,
        runStatus: initialState.runStatus,
        machineState: initialState.machineState,
        workPosition: initialState.workPosition,
        machinePosition: initialState.machinePosition,
        serverFeatureShutdownEnabled: initialState.serverFeatureShutdownEnabled,
      };
    case ActionType.MACHINE_CONNECTED:
      return {
        ...state,
        serverConnected: true,
        machineConnected: true,
      };
    case ActionType.MACHINE_DISCONNECTED:
      return {
        ...state,
        machineConnected: false,
        activePort: null,
        runStatus: initialState.runStatus,
        machineState: initialState.machineState,
        workPosition: initialState.workPosition,
        machinePosition: initialState.machinePosition,
      };
    case ActionType.PORTS_UPDATED:
      return {
        ...state,
        availablePorts: action.payload,
      };
    case ActionType.ACTIVEPORT_UPDATED:
      return {
        ...state,
        activePort: action.payload,
      };
    case ActionType.RUNSTATUS_UPDATED:
      return {
        ...state,
        runStatus: action.payload,
      };
    case ActionType.MACHINESTATE_UPDATED:
      return {
        ...state,
        machineState: action.payload,
      };
    case ActionType.MACHINEPOSITION_UPDATED:
      return {
        ...state,
        machinePosition: action.payload,
      };
    case ActionType.WORKPOSITION_UPDATED:
      return {
        ...state,
        workPosition: action.payload,
      };
    case ActionType.SERVER_FEATURE_SHUTDOWN_UPDATED:
      return {
        ...state,
        serverFeatureShutdownEnabled: action.payload,
      };
    case ActionType.JOG_FEEDRATE_UPDATED:
      return {
        ...state,
        jogFeedRate: action.payload,
      };
    case ActionType.LASERTEST_DURATION_UPDATED:
      return {
        ...state,
        laserTestDuration: action.payload,
      };
    case ActionType.LASERTEST_POWER_UPDATED:
      return {
        ...state,
        laserTestPower: action.payload,
      };
    case ActionType.LASERTEST_PWM_MAX_S_UPDATED:
      return {
        ...state,
        laserTestPwmMaxS: action.payload,
      };
    default:
      return state;
  }
};

export default lwReducer;
