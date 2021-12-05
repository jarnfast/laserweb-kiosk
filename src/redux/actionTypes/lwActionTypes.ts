export enum ActionType {
  SERVER_CONNECTING = "lw/ServerConnecting",
  SERVER_CONNECTED = "lw/ServerConnected",
  SERVER_DISCONNECTED = "lw/ServerDisconnected",
  MACHINE_CONNECTED = "lw/MachineConnected",
  MACHINE_DISCONNECTED = "lw/MachineDisconnected",
  PORTS_UPDATED = "lw/PortsUpdated",
  ACTIVEPORT_UPDATED = "lw/ActivePortUpdated",
  RUNSTATUS_UPDATED = "lw/RunStatusUpdated",
  WORKPOSITION_UPDATED = "lw/WorkPositionUpdated",
  MACHINEPOSITION_UPDATED = "lw/MachinePositionUpdated",
  MACHINESTATE_UPDATED = "lw/MachineStateUpdated",

  SERVER_FEATURE_SHUTDOWN_UPDATED = 'lw/ServerFeatureShutdownUpdated',

  CONNECT_SERVER = "lw/ConnectServer",
  CONNECT_MACHINE = "lw/ConnectMachine",

  DISCONNECT_SERVER = "lw/DisconnectServer",
  DISCONNECT_MACHINE = "lw/DisconnectMachine",

  SHUTDOWN_SERVER = "lw/ShutdownServer",

  JOG = 'lw/Jog',
  RUN_COMMAND = 'lw/RunCommand',
  HOME = 'lw/Home',
  SET_ZERO = 'lw/SetZero',

  PAUSE = "lw/Pause",
  RESUME = "lw/Resume",
}

interface actionWithoutPayload {
  type:
    | ActionType.DISCONNECT_SERVER
    | ActionType.DISCONNECT_MACHINE
    | ActionType.SERVER_DISCONNECTED
    | ActionType.MACHINE_CONNECTED
    | ActionType.MACHINE_DISCONNECTED
    | ActionType.SHUTDOWN_SERVER
    | ActionType.PAUSE
    | ActionType.RESUME
    ;
}

interface actionStringPayload {
  type:
    | ActionType.CONNECT_SERVER
    | ActionType.RUNSTATUS_UPDATED
    | ActionType.HOME
    | ActionType.SET_ZERO
    | ActionType.MACHINESTATE_UPDATED
    | ActionType.RUN_COMMAND
    | ActionType.SERVER_CONNECTED;
  payload: string;
}

interface actionBooleanPayload {
  type:
    | ActionType.SERVER_FEATURE_SHUTDOWN_UPDATED;
  payload: boolean;
}

interface actionPositionPayload {
  type:
    | ActionType.WORKPOSITION_UPDATED
    | ActionType.MACHINEPOSITION_UPDATED;
  payload: Position;
}

// TODO extract somewhere..
export enum MachineConnectionType {
  USB = "usb",
}

export interface payloadConnectMachineType {
  type: MachineConnectionType;
  port: string;
  baudRate: number;
}

export interface payloadJogData {
  axis: string,
  distance: number,
  feedrate: number,
}

export interface Position {
  x: number | null,
  y: number | null,
  z: number | null,
}

interface actionConnectMachinePayload {
  type: ActionType.CONNECT_MACHINE | ActionType.ACTIVEPORT_UPDATED;
  payload: payloadConnectMachineType;
}

interface actionPortsUpdated {
  type: ActionType.PORTS_UPDATED;
  payload: string[];
}

interface actionJogDataPayload {
  type: ActionType.JOG;
  payload: payloadJogData;
}

export type Action =
  | actionWithoutPayload
  | actionBooleanPayload
  | actionStringPayload
  | actionPortsUpdated
  | actionPositionPayload
  | actionJogDataPayload
  | actionConnectMachinePayload;
