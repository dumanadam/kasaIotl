import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const MyTextInput = props => {
  const [textInput, setTextInput] = React.useState('');
  return (
    <View>
      <TextInput
        {...props}
        placeholderTextColor="#ddd"
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        ref={props.inputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#f1f1f1',
    color: '#999999',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    width: 150,
    color: 'black',
  },
});

export default MyTextInput;
