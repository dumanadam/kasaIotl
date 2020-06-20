import React from 'react';
import {IotlStrings, Colours, AuthContext, Errors} from '../api/context';

const getLatestLightState = async (authObj, deviceId) => {
  console.log('received authobj ', authObj);
  console.log('received deviceId ', deviceId);

  try {
    latestLightState = await authObj.info(deviceId);
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
