import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Input} from 'react-native-elements';

const MyTextInput = props => {
  const {
    leftIcon,
    keyboardType,
    secureTextEntry,
    placeholder,
    onChangeText,
  } = props;
  console.log(`props ${props}`);
  return (
    <View>
      {/*       <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ddd"
        style={styles.input}
        onChangeText={onChangeText}
        {...props}
      /> */}
      <Input
        leftIcon={leftIcon}
        placeholder={placeholder}
        inputStyle={styles.input}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,

    color: '#F68F00',

    fontSize: 15,
    fontWeight: '600',
    width: '100%',
  },
});

export default MyTextInput;
