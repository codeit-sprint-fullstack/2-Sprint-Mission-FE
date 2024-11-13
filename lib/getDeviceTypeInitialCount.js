import { deviceCounts } from './deviceConfig';

export const getDeviceTypeInitialCount = (userAgent) => {
  const deviceType = /mobile/i.test(userAgent)
    ? 'mobile'
    : /tablet|ipad/i.test(userAgent)
    ? 'tablet'
    : 'desktop';

  return deviceCounts[deviceType];
};
