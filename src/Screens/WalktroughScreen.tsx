import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import UserContext from '../Utils/UseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalktroughScreen = (props: any) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    AsyncStorage.getItem('userData').then(value => {
      if (value !== null && value.length > 0) {
        userContext.updateIsWalkthrough(true);
        userContext.updateIsLogin(true);
      } else {
        useContext.updateIsWalkthrough(true);
        userContext.updateIsLogin(false);
      }
    });
  };
  return (
    <View>
      <Text>WalktroughScreen</Text>
    </View>
  );
};

export default WalktroughScreen;

const styles = StyleSheet.create({});
