import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../Components/Home';
import {ToastAndroid, BackHandler} from 'react-native';
import UserContext from '../Utils/UseContext';

const userSampleData = require('../Constants/UserCarData.json');
const HomeScreen = (props: any) => {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState([]);
  const [categoryPressed, setCategory] = useState(false);
  useEffect(() => {
    getUserData();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onClosePressed,
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  const onClosePressed = () => {
    BackHandler.exitApp();
    return true;
  };
  const getUserData = async () => {
    try {
      let userLocalData = await AsyncStorage.getItem('userData');
      if (userLocalData !== null) {
        let parseData = JSON.parse(userLocalData);
        setUserName(parseData[0].userName);
      }
      setUserData(userSampleData.userData.registeredCars);
      userContext.updateCompanyList(userSampleData.userData.registeredCars);
      getUserApplicationdata();
      setIsLoading(false);
    } catch (error) {
      console.log('getUserData error ::', error);
      setIsLoading(false);
    }
  };
  const getUserApplicationdata = async () => {
    try {
      AsyncStorage.getItem('crudData').then(data => {
        if (data !== null) {
          let tempData = JSON.parse(data);
          userContext.updateApplicationList(tempData);
        }
      });
    } catch (error) {
      console.log('get application data error ::', error);
    }
  };
  const onCategoryPressed = () => {
    if (categoryPressed === true) setCategory(false);
    else {
      setCategory(true);
    }
  };
  const onSelectCompany = (val: string, id: number) => {
    userContext.updateCompanyname(val);
    userContext.updateCompanyId(id);
    props.navigation.navigate('NewCar');
  };
  const onViewApplicationPressed = () => {
    if (userContext.applicationList.length > 0) {
      props.navigation.navigate('ViewApplication');
    } else {
      ToastAndroid.show('No applications found', ToastAndroid.SHORT);
    }
  };

  return (
    <Home
      isLoading={isLoading}
      userName={userName}
      userData={userData}
      categoryPressed={categoryPressed}
      onCategoryPressed={onCategoryPressed}
      onSelectCompany={onSelectCompany}
      onViewApplicationPressed={onViewApplicationPressed}
    />
  );
};

export default HomeScreen;
