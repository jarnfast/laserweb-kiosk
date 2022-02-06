const Config = {
  server:
    window.__RUNTIME_ENVIRONMENT__.LWK_SERVER || process.env.LWK_SERVER || null,
  //activePort: process.env.LWK_null,

  jogFeedRate: Number(
    window.__RUNTIME_ENVIRONMENT__.LWK_JOG_FEEDRATE ||
      process.env.LWK_JOG_FEEDRATE ||
      1800
  ),
  laserTestDuration: Number(
    window.__RUNTIME_ENVIRONMENT__.LWK_LASERTEST_DURATION ||
      process.env.LWK_LASERTEST_DURATION ||
      200
  ),
  laserTestPower: Number(
    window.__RUNTIME_ENVIRONMENT__.LWK_LASERTEST_POWER ||
      process.env.LWK_LASERTEST_POWER ||
      1
  ),
  laserTestPwmMaxS: Number(
    window.__RUNTIME_ENVIRONMENT__.LWK_LASERTEST_PWM_MAX_S ||
      process.env.LWK_LASERTEST_PWM_MAX_S ||
      1000
  ),
};
export default Config;
