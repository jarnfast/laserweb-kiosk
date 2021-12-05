import LaserWebCommService from "../../services/LaserWebCommService";
import { Action, ActionType } from "../actionTypes/lwActionTypes";

const lwMiddleware = (store: any) => {
  const dispatchAny = (action: Action) => {
    store.dispatch(action);
  };

  const laserWebCommService = new LaserWebCommService(dispatchAny);

  return (next: any) => (action: Action) => {
    //const lwState = store.getState().lwState;

    if (
      action.type !== ActionType.MACHINEPOSITION_UPDATED &&
      action.type !== ActionType.WORKPOSITION_UPDATED
    ) {
      console.log("middleware", action);
    }
    switch (action.type) {
      case ActionType.CONNECT_SERVER:
        console.log("middleware:connect_server", action);
        laserWebCommService.connect(action.payload);
        break;
      case ActionType.DISCONNECT_SERVER:
        laserWebCommService.disconnect();
        break;
      case ActionType.CONNECT_MACHINE:
        console.log("middleware:connect_server", action);
        laserWebCommService.connectMachine(action.payload);
        break;
      case ActionType.DISCONNECT_MACHINE:
        laserWebCommService.disconnectMachine();
        break;
      case ActionType.SHUTDOWN_SERVER:
        laserWebCommService.shutdown();
        break;
      case ActionType.PAUSE:
        laserWebCommService.pause();
        break;
      case ActionType.RESUME:
        laserWebCommService.resume();
        break;
      case ActionType.JOG:
        laserWebCommService.jog(action.payload);
        break;
      case ActionType.RUN_COMMAND:
        laserWebCommService.runCommand(action.payload);
        break;
      case ActionType.HOME:
        laserWebCommService.home(action.payload);
        break;
      case ActionType.SET_ZERO:
        laserWebCommService.setZero(action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default lwMiddleware;
