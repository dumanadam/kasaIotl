import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const LoginButton = props => {
  const {color, backgroundColor} = props;
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor}]}>
      <Text style={{color}}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

LoginButton.propTypes = {
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
});
