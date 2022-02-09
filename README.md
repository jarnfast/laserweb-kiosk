# LaserWeb Kiosk

This is a kiosk-style web frontend for the [Unified communications server for LaserWeb4 (lw.comm-server)](https://github.com/LaserWeb/lw.comm-server).

The UI is currently designed for use on a small LCD screen with a resolution of 320x240 px.

# DISCLAIMER

This is a __work in progress__. Use with care and don't expect miracles.

# Kiosk mode setup

For inspiration on configuring your favorite Raspberry Pi as a kiosk: [CNCjs Web Kiosk for Raspberry Pi](https://github.com/cncjs/cncjs-pendant-lcd#setup-web-kiosk-wip---subject-to-change)

# Running

After downloading and unpacking a release archive the LaserWeb Kiosk can be served by running the `start-laserweb-kiosk.sh` then direct your browser to [http://localhost:4000/](http://localhost:4000/).

## Environment variables

The script supports the following environment variables:

| Name | Description | Default |
| --- | --- | --- |
| LWKSERVE_PORT | Port the service will listen on | 4000 |
| LWK_SERVER | Backend lw.comm-server host and port. E.g. rpi:8000 | - |
| LWK_JOG_FEEDRATE | Jog feedrate (mm/min) | 1800 |
| LWK_LASERTEST_DURATION | Lasertest duration (ms) | 200 |
| LWK_LASERTEST_POWER | Lasertest power (%) | 1 |
| LWK_LASERTEST_PWM_MAX_S | Lasertest PWM Max S value | 1000 |

All `LWK_*` variables are initial values only and can be changed in the UI after start-up.

# Local development
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