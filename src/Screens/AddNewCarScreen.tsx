import React, {useContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import AddNewCar from '../Components/AddNewCar';
import UserContext from '../Utils/UseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewCarScreen = (props: any) => {
  const userContext = useContext(UserContext);
  const [carName, setCarName] = useState(userContext.companyName);
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [selectCategory, onSelectCategory] = useState(false);
  const [companyData, setCompanyData] = useState(userContext.companyList);
  const [registrationNumber, setRegistrationNumber] = useState('');
  // const [isLoading, setIsLoading] = useState(true);
  //error hooks
  const [colorError, setColorError] = useState('');
  const [modelError, setModelError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const carRegEx = /^[A-Z]{3}-[0-9]{4}$/;
  useEffect(() => {
    setCarName(userContext.companyName);
    setModel('');
    setColor('');
    setRegistrationNumber('');
    setColorError('');
    setModelError('');
    setRegistrationError('');
  }, [userContext.companyName]);
  interface localData {
    id: number;
    color: string;
    model: string;
    registrationNumber: string;
  }
  const onChangeColor = (val: string) => {
    setColorError('');
    let colorRegex = new RegExp('^[a-zA-Z]*$');
    if (colorRegex.test(val.toLowerCase())) {
      setColor(val);
    } else {
      setColorError('Enter Number Only');
    }
  };

  const onChangeModel = (val: string) => {
    setModelError('');
    let numRegex = new RegExp('^[0-9]*$');
    if (numRegex.test(val)) {
      setModel(val);
    } else {
      setModelError('Enter Number Only');
    }
  };

  const onChangeRegistration = (val: string) => {
    setRegistrationError('');
    setRegistrationNumber(val);
    if (val.length === 8) {
      if (carRegEx.test(val)) {
        setRegistrationError('');
      } else {
        setRegistrationError('Please follow the format e.g XYZ-1234');
      }
    }
  };

  const onSelectCategoryPressed = () => {
    onSelectCategory(!selectCategory);
  };
  const onSelectCompany = (val: string, id: number) => {
    // console.warn('values::', val, id);
    userContext.updateCompanyname(val);
    userContext.updateCompanyId(id);
    onSelectCategory(false);
  };
  const onSubmitFile = async () => {
    try {
      if (color.length === 0) {
        ToastAndroid.show('Please enter color', ToastAndroid.SHORT);
      } else if (model.length === 0) {
        ToastAndroid.show('Please enter model', ToastAndroid.SHORT);
      } else if (registrationNumber.length === 0) {
        ToastAndroid.show(
          'Please enter registration number',
          ToastAndroid.SHORT,
        );
      }
      if (
        color.length > 0 &&
        colorError.length === 0 &&
        model.length === 4 &&
        modelError.length === 0 &&
        registrationNumber.length === 8 &&
        registrationError.length === 0
      ) {
        // console.warn('all checks satisfied');
        AsyncStorage.getItem('crudData').then(data => {
          if (data !== null) {
            // console.warn('not null');
            let tempData = [];
            tempData = JSON.parse(data);

            let userData = {
              id: userContext.companyId,
              make: carName,
              color: color,
              model: model,
              registrationNumber: registrationNumber,
            };
            tempData.push(userData);
            userContext.updateApplicationList(tempData);
            // console.warn('tempData ::', tempData);
            AsyncStorage.setItem('crudData', JSON.stringify(tempData));
            props.navigation.navigate('ViewApplication');
          } else {
            // console.warn('null');
            let userData = {
              id: userContext.companyId,
              make: carName,
              color: color,
              model: model,
              registrationNumber: registrationNumber,
            };
            userContext.updateApplicationList([userData]);
            AsyncStorage.setItem('crudData', JSON.stringify([userData]));
            props.navigation.navigate('ViewApplication');
          }
        });
      } else {
        ToastAndroid.show(
          'Please fill all the fields properly',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('submitting file Error::', error);
    }
  };
  return (
    <AddNewCar
      carName={carName}
      color={color}
      model={model}
      registrationNumber={registrationNumber}
      selectCategory={selectCategory}
      companyData={companyData}
      modelError={modelError}
      registrationError={registrationError}
      onChangeColor={onChangeColor}
      onChangeModel={onChangeModel}
      onChangeRegistration={onChangeRegistration}
      onSelectCategoryPressed={onSelectCategoryPressed}
      onSelectCompany={onSelectCompany}
      onSubmitFile={onSubmitFile}
    />
  );
};

export default AddNewCarScreen;
