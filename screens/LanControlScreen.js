import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../api/context';

const LanControlSreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View>
      <Text>Lan Control Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default LanControlSreen;
