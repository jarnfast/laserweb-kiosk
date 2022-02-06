export {};

declare global {
  interface Window {
    __RUNTIME_ENVIRONMENT__: {
      LWK_SERVER: string;
      LWK_JOG_FEEDRATE: string;
      LWK_LASERTEST_DURATION: string;
      LWK_LASERTEST_POWER: string;
      LWK_LASERTEST_PWM_MAX_S: string;
    };
  }
}