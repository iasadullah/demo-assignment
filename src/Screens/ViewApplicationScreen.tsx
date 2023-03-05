import React, {useEffect, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewApplication from '../Components/ViewApplication';
import UserContext from '../Utils/UseContext';
import {BackHandler} from 'react-native';

const ViewApplicationScreen = (props: any) => {
  const userContext = useContext(UserContext);
  const [applicationList, setApplicationList] = useState([]);
  useEffect(() => {
    console.warn(userContext.applicationList.length);
    getData();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onClosePressed,
    );
    return () => {
      backHandler.remove();
    };
  }, [userContext.applicationList]);

  const onClosePressed = () => {
    props.navigation.navigate('Home');
    return true;
  };
  const getData = async () => {
    try {
      if (userContext.applicationList.length > 0) {
        AsyncStorage.setItem(
          'crudData',
          JSON.stringify(userContext.applicationList),
        );
        setApplicationList(userContext.applicationList);
      } else {
        await AsyncStorage.removeItem('crudData');
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.log('getData error ::', error);
    }
  };

  const onDeletePressed = async (index: number) => {
    try {
      let tempdata = [...userContext.applicationList];
      tempdata.splice(index, 1);
      userContext.updateApplicationList(tempdata);
    } catch (error) {
      console.log('delet error ::', error);
    }
  };
  return (
    <ViewApplication
      applicationList={userContext.applicationList}
      onDeletePressed={onDeletePressed}
    />
  );
};

export default ViewApplicationScreen;
