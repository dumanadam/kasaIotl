import React, {useState, useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {AlertMessage} from '../api/context';
import AwesomeAlert from 'react-native-awesome-alerts';

const myAlert = (errorTitle, errorMessage, userObj) => {
  React.useEffect(() => {
    console.log('----------MyAlert ----------');

    console.log('----------Colour Exit ----------');
  }, []);

  const [isError, setisError] = useState(useContext(AlertMessage.showError));

  const showError = () => {
    setisError(!isError);
  };

  return (
    <AwesomeAlert
      show={userObj.showError}
      title={userObj.errorTitle}
      message={userObj.errorMessage}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
      showCancelButton={false}
      showConfirmButton={true}
      confirmText="OK"
      confirmButtonColor="#DD6B55"
      onConfirmPressed={() => {
        showError();
      }}
    />
  );
};

export default myAlert;

myAlert.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
  },
  alertCont: {
    zIndex: 100,
    flex: 1,
  },
});
