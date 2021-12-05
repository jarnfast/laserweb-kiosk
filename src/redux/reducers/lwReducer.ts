import {
  Action,
  ActionType,
  Position,
  payloadConnectMachineType,
} from "../actionTypes/lwActionTypes";

/*export interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}*/

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

  serverFeatureShutdownEnabled: boolean;

  runStatus: string;
  machineState: string;

  workPosition: Position;
  machinePosition: Position;
}

const initialState = {
  /*comments: [],
    loading: false, 
    error: null */
  serverConnected: false,
  machineConnected: false,
  serverFeatureShutdownEnabled: false,
  availablePorts: [],
  //port: null,
  server: null,
  activePort: null,

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
      }
    default:
      return state;
  }
};

export default lwReducer;
