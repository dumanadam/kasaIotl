import React from 'react';

const getDeviceList = async authObj => {
  try {
    const deviceList = await authObj.getDevices();

    return deviceList;
  } catch (error) {
    console.log(
      '----------------------------------------------error no devices>',
      error,
    );
    return error;
  }
};

export default getDeviceList;
