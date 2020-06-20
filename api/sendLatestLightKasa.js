import React from 'react';
import {IotlStrings, Colours, AuthContext, Errors} from './context';

const sendLatestLightKasa = async (
  authObj,
  toState,
  transTime,
  lightSettings,
) => {
  try {
    const power = await authObj.kasaObj.power(
      authObj.deviceInfo.deviceId,
      toState,
      transTime,
      lightSettings,
    );
    return power;
  } catch (error) {
    console.log(
      '----------------------------------------------error cant send to KASA >',
      error,
    );
    return {errorMessage: IotlStrings.plug_Offline};
  }
};

export default sendLatestLightKasa;
