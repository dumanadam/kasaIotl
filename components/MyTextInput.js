import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Input} from 'react-native-elements';
import {Icon} from 'react-native-elements';
const MyTextInput = props => {
  const {
    value,

    placeholder,
    onChangeText,
  } = props;

  return (
    <View>
      {/*       <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ddd"
        style={styles.input}
        onChangeText={onChangeText}
        {...props}
      /> */}
      <Input placeholder="BASIC INPUT" inputStyle={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,

    color: '#999999',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    width: '100%',
    color: 'black',
  },
});

export default MyTextInput;
