import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UserContext from '../Utils/UseContext';
const MainStack = createNativeStackNavigator();
//screens
import SignUpScreen from '../Screens/SignUpScreen';
import HomeScreen from '../Screens/HomeScreen';
import AddNewCarScreen from '../Screens/AddNewCarScreen';
import ViewApplicationScreen from '../Screens/ViewApplicationScreen';
import LoginScreen from '../Screens/LoginScreen';
const Routes = () => {
  const [isWalkthrough, setIsWalkthrough] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [companyName, onSelectCompany] = useState('');
  const [companyList, setCompanyList] = useState([]);
  const [companyId, setCompanyId] = useState<number>();
  const [applicationList, setApplicationList] = useState([]);
  const updateIsWalkthrough = (_isWalkthrough: boolean) => {
    setIsWalkthrough(_isWalkthrough);
  };
  const updateIsLogin = (val: boolean) => {
    setIsLogin(true);
  };
  const updateCompanyname = (val: string) => {
    onSelectCompany(val);
  };
  const updateCompanyList = (val: any) => {
    setCompanyList(val);
  };
  const updateCompanyId = (val: number) => {
    setCompanyId(val);
  };
  const updateApplicationList = (val: any) => {
    console.warn('context', val);
    setApplicationList(val);
  };
  return (
    <UserContext.Provider
      value={{
        companyName,
        companyList,
        companyId,
        applicationList,
        isLogin,
        updateCompanyname,
        updateCompanyList,
        updateCompanyId,
        updateApplicationList,
        updateIsLogin,
        updateIsWalkthrough,
      }}>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          {isWalkthrough == true ? (
            <>
              <MainStack.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : (
            <>
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen name="Home" component={HomeScreen} />
              <MainStack.Screen name="NewCar" component={AddNewCarScreen} />
              <MainStack.Screen
                name="ViewApplication"
                component={ViewApplicationScreen}
              />
            </>
          )}
        </MainStack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default Routes;

const styles = StyleSheet.create({});
