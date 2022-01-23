# LaserWeb Kiosk

This is a kiosk-style web frontend for the [Unified communications server for LaserWeb4 (lw.comm-server)](https://github.com/LaserWeb/lw.comm-server).

The UI is currently designed for use on a small LCD screen with a resolution of 320x240 px.

# DISCLAIMER

This is a __work in progress__. Use with care and don't expect miracles.

# Kiosk mode setup

For inspiration on configuring your favorite Raspberry Pi as a kiosk: [CNCjs Web Kiosk for Raspberry Pi](https://github.com/cncjs/cncjs-pendant-lcd#setup-web-kiosk-wip---subject-to-change)

# Running

```
npm install
npm start
```
Then direct your browser to [http://localhost:3000/](http://localhost:3000/).

# Auto-connect

The application can auto-connect to a server and machine using the following query parameters.

Example:
`http://localhost:3000/communications?server=rpi:8000&port=/dev/ttyUSB0&baudRate=115200&autoconnect=true`
This will connect to the lw.comm-server running on `rpi:8000` and then connect to the machine on port `/dev/ttyUSB0` with baud rate `115200`.

# Shutdown feature

The UI supports shutting down the host running the `lw.comm-service` if the backend service supports the shutdown feature.

The feature is currently available in this fork (and branch): [modified lw.comm-server](https://github.com/jarnfast/lw.comm-server/tree/feature/enable-shutdown)

# Screenshots

![laserweb-kiosk-control-320x240.png](https://github.com/jarnfast/laserweb-kiosk/raw/main/media/laserweb-kiosk-control-320x240.png)