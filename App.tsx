import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {initializeFB} from './src/firebase';

const App = () => {
  useEffect(() => {
    initializeFB();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Push Notification App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
