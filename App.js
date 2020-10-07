
// @refresh state
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyClevsPbwCko0B2G8y6pDWK7BUxzlYTLes",
  authDomain: "tb-react-native-chat.firebaseapp.com",
  databaseURL: "https://tb-react-native-chat.firebaseio.com",
  projectId: "tb-react-native-chat",
  storageBucket: "tb-react-native-chat.appspot.com",
  messagingSenderId: "455235893050",
  appId: "1:455235893050:web:8469820ee20e62f6f2c203"
};

if (firebase.apps.length === 0)
{
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');


  useEffect( () => {
    readUser();
  }, []);

  const readUser = async () =>
  {
    const user = await AsyncStorage.getItem('user');

    if (user)
    {
      setUser(JSON.parse(user));
    }
  }

  const handlePressConnect = async () =>
  {
    const _id = Math.random().toString(36).substring(7);
    const user = {  _id, name };

    await AsyncStorage.setItem('user', JSON.stringify(user));

    setUser(user);
  }

  const handlePressDisconnect = async () =>
  {
    await AsyncStorage.removeItem('user');

    setUser(null);
  }

  if (!user)
  {
    return (
      <View style={ styles.container }>
        <TextInput style={ styles.input } placeholder="Enter your name" value={ name } onChangeText={ setName } />
        <Button onPress={ handlePressConnect } title="Connect" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Hi { user.name }</Text>
      <Button onPress={ handlePressDisconnect } title="Disconnect" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    paddingLeft: 10,
    // marginBottom: 20,
    borderColor: "gray",

  }
});
