import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Slider} from 'react-native-elements';
import PropTypes from 'prop-types';

const mySlider = props => {
  const {color, backgroundColor} = props;
  return <Slider />;
};

export default mySlider;

mySlider.propTypes = {
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
