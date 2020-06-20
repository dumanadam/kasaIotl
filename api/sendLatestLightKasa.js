import React from 'react';
import {IotlStrings} from './context';

const sendLatestLightKasa = async updatesettings => {
  console.log('updatesettings', updatesettings.authObj);
  console.log('updatesettings', updatesettings.deviceId);
  // console.log('updatesettings.lightSettings', updatesettings.lightSettings);

  try {
    const power = await updatesettings.authObj.power(
      updatesettings.deviceId,
      updatesettings.toState,
      updatesettings.transTime,
      updatesettings.lightSettings,
    );
    console.log('power result >> ', power);

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
