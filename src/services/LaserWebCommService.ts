import * as io from "socket.io-client";

import {
  ActionType,
  Action,
  Position,
  MachineConnectionType,
  payloadConnectMachineType,
  payloadJogData,
  payloadLaserTest,
} from "../redux/actionTypes/lwActionTypes";

class LaserWebCommService {
  static instance: LaserWebCommService;
  callbacks = {};

  server!: string;
  socket!: any;

  ports!: any[];

  connected: boolean = false;
  machineConnected: boolean = false;

  runStatus: string = "n/a";
  machineState: string = "n/a";

  workPosition!: Position;
  machinePosition!: Position;

  //  machineConnection!: payloadConnectMachineType;

  dispatch: (action: Action) => void;

  constructor(dispatch: (action: Action) => void) {
    this.dispatch = dispatch;
  }

  setServer(server: string) {
    this.server = server;
  }

  disconnect() {
    console.log("lwcs:disconnecting");
    this.socket.disconnect();
    this.dispatch({
      type: ActionType.SERVER_DISCONNECTED,
    });
  }

  shutdown() {
    this.socket.emit('x-shutdown');
    this.disconnect();
  }

  pause() {
    this.socket.emit("pause");
  }

  resume() {
    this.socket.emit("resume");
  }

  jog(jogData: payloadJogData) {
    let data = `${jogData.axis},${jogData.distance},${jogData.feedrate.toFixed(0)}`;
    this.socket.emit('jog', data);
  }

  laserTest(laserTestData: payloadLaserTest) {
    this.socket.emit('laserTest', laserTestData.power.toFixed(0) + ',' + laserTestData.duration.toFixed(0) + ',' + laserTestData.pwmMaxS.toFixed(0));
  }

  runCommand(gcode: string) {
    if (this.machineConnected) {
      console.log('runCommand', gcode);
      this.socket.emit('runCommand', gcode);
    }
  }

  home(axis: string) {
    if (this.machineConnected) {
      console.log('home', axis);
      this.socket.emit('home', axis);
    }
  }

  setZero(axis: string) {
    if (this.machineConnected) {
      console.log('setZero', axis);
      this.socket.emit('setZero', axis);
    }
  }
  connectMachine(machine: payloadConnectMachineType) {
    console.log("connectMachine", machine);
    if (!this.connected) {
      console.log("Server not connected.");
      return;
    }
    if (this.machineConnected) {
      console.log("Machine already connected");
      return;
    }

    switch (machine.type) {
      case MachineConnectionType.USB:
        this.socket.emit(
          "connectTo",
          `usb,${machine.port},${machine.baudRate}`
        );
        break;
      default:
        console.log("Unsupported machine type", machine);
    }
  }

  disconnectMachine() {
    console.log("disconnectMachine");
    if (!this.connected) {
      console.log("Server not connected.");
      return;
    }
    this.socket.emit("closePort");
    this.dispatch({
      type: ActionType.MACHINE_DISCONNECTED,
    });
  }

  connect(server: string) {
    this.server = server;
    console.log(`lwcs:connecting to ${this.server}`);
    this.socket = io.connect("ws://" + this.server); //, { upgrade: true });

    this.socket.on("connect", (data: any) => {
      console.log("lwcs:recv:connect", data);
      console.log(`connected to ${this.server}`);
      console.log("connect data", data);
      this.connected = true;

      this.dispatch({
        type: ActionType.SERVER_CONNECTED,
        payload: this.server,
      });
      
      this.socket.emit("getServerConfig");
    });

    this.socket.on("error", (data: any) => {
      console.log("lwcs:recv:error", data);
    });

    this.socket.on("close", () => {
      console.log("lwcs:recv:close");
      this.connected = false;
    });

    this.socket.on("disconnected", () => {
      console.log("lwcs:recv:disconnected");
      console.log(`disconnected from ${this.server}`);
      this.connected = false;
    });

    this.socket.on("serverConfig", (data: any) => {
      console.log("lwcs:recv:serverConfig", data);

      if (data.featureShutdownEnabled === '1') {
        console.log("lwcs:featureShutdown enabled");
      } else {
        console.log("lwcs:featureShutdown disabled")
      }
      this.dispatch({
        type: ActionType.SERVER_FEATURE_SHUTDOWN_UPDATED,
        payload: data.featureShutdownEnabled === '1',
      });
    });

    this.socket.on("connectStatus", (data: any) => {
      console.log("lwcs:recv:connectStatus", data);

      let statusArr = data.split(":");
      switch (statusArr[0]) {
        case "opened":
          this.machineConnected = true;
          this.dispatch({
            type: ActionType.MACHINE_CONNECTED,
          });
          break;
        case "closed":
          this.machineConnected = false;
          this.dispatch({
            type: ActionType.MACHINE_DISCONNECTED,
          });
          break;
        default:
          break;
      }
    });

    this.socket.on("activePort", (data: any) => {
      console.log("lwcs:recv:activePort", data);
      let activePort: payloadConnectMachineType = {
        type: MachineConnectionType.USB,
        port: "",
        baudRate: 9600,
      };
      console.log("data type", typeof data);
      if (typeof data === "string") {
        activePort.port = data;
      } else {
        activePort.port = data.port;
        activePort.baudRate = data.baudrate;
      }

      this.dispatch({
        type: ActionType.ACTIVEPORT_UPDATED,
        payload: activePort,
      });
    });

    this.socket.on("interfaces", (data: any) => {
      console.log("lwcs:recv:interfaces", data);
    });

    this.socket.on("ports", (data: any) => {
      console.log("lwcs:recv:ports", data);
      if (data.length > 0) {
        this.ports = data;
        this.dispatch({
          type: ActionType.PORTS_UPDATED,
          payload: this.ports.map((obj) => obj.path),
        });
      }
    });

    this.socket.on("runStatus", (data: any) => {
      console.log("lwcs:recv:runstatus", data);
      if (data.length > 0) {
        this.runStatus = data;
        this.dispatch({
          type: ActionType.RUNSTATUS_UPDATED,
          payload: this.runStatus,
        });
      }
    });

    this.socket.on("data", (data: any) => {
      if (data.indexOf("<") === 0) {
        let state = data
          .substring(data.indexOf("<") + 1, data.search(/[,:|]/))
          .toLowerCase();
        if (state !== this.machineState) {
          this.machineState = state;
          this.dispatch({
            type: ActionType.MACHINESTATE_UPDATED,
            payload: this.machineState,
          });
        }
      }
    });

    this.socket.on("wPos", (data: any) => {
      //console.log("lwcs:recv:wPos", data);
      let newPosition = {
        x: Number.parseFloat(data.x),
        y: Number.parseFloat(data.y),
        z: Number.parseFloat(data.z),
      };
      this.workPosition = newPosition;
      this.dispatch({
        type: ActionType.WORKPOSITION_UPDATED,
        payload: this.workPosition,
      });
    });

    this.socket.on("wOffset", (data: any) => {
      //console.log("lwcs:recv:wPos", data);

      if (this.workPosition != null) {
        let newPosition = {
          x:
            this.workPosition.x != null
              ? this.workPosition.x + Number.parseFloat(data.x)
              : null,
          y:
            this.workPosition.y != null
              ? this.workPosition.y + Number.parseFloat(data.y)
              : null,
          z:
            this.workPosition.z != null
              ? this.workPosition.z + Number.parseFloat(data.z)
              : null,
        };

        this.machinePosition = newPosition;
        this.dispatch({
          type: ActionType.MACHINEPOSITION_UPDATED,
          payload: this.machinePosition,
        });
      }
    });
  }
}

export default LaserWebCommService;
