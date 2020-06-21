import React from 'react';
import {IotlStrings, Colours, AuthContext, Errors} from '../api/context';

const getLatestLightState = async (kasaObj, deviceId) => {
  console.log('received kasaObj ', kasaObj);
  console.log('received deviceId ', deviceId);

  try {
    latestLightState = await kasaObj.info(deviceId);
    return latestLightState;
  } catch (error) {
    console.log(
      '----------------------------------------------error no light status >',
      error,
    );
    return {errorMessage: IotlStrings.plug_Offline};
  }
};

export default getLatestLightState;
