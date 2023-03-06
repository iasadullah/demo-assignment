import React, {useEffect, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from '../Components/SignUp';
import UserContext from '../Utils/UseContext';
const SignUpScreen = (props: any) => {
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [strength, setStrength] = useState('');
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    // console.warn('signup');
    checkUser();
  }, []);
  const checkUser = async () => {
    try {
      setIsLoading(true);
      AsyncStorage.getItem('userData').then(value => {
        if (value !== null && value.length > 0) {
          userContext.updateIsWalkthrough(false);
          userContext.updateIsLogin(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log('checkUser Error', error);
    }
  };
  const onChangeUserName = (value: string) => {
    let nameRegex = new RegExp('^[a-zA-Z]*$');
    if (nameRegex.test(value)) {
      setUserName(value);
    } else {
      ToastAndroid.show('Please enter alphbats only', ToastAndroid.SHORT);
    }
  };
  const onChangePassword = (value: string) => {
    // console.warn('value', value.length);
    if (value.length === 0) {
      setValidationError('');
      setUserPassword('');
    } else {
      switch (true) {
        case !/^\S+$/.test(value):
          setStrength('no space allowed');
          break;
        case value.length < 8:
          setStrength('Password must be at least 8 characters long');
          break;
        case !/[A-Z]/.test(value):
          setStrength('Password must contain at least one uppercase letter');
          break;
        case !/[a-z]/.test(value):
          setStrength('Password must contain at least one lowercase letter');
          break;
        case !/[0-9]/.test(value):
          setStrength('Password must contain at least one number');
          break;
        case !/[!@#$%^&+=]/.test(value):
          setStrength(
            'Password must contain at least one special character (!@#$%^&+=)',
          );
          break;
        default:
          setUserPassword(value);
          setStrength('');
          break;
      }
    }
  };
  const onRegisterAccountPressed = (from: string) => {
    if (userName.length === 0) {
      ToastAndroid.show('Please enter name', ToastAndroid.SHORT);
    } else if (strength.length > 0) {
      setValidationError(strength);
      // console.warn(strength);
    } else if (userPassword) {
      setValidationError('');
      registerUser();
    } else if (userPassword.length === 0) {
      ToastAndroid.show('Please enter password', ToastAndroid.SHORT);
    }
  };
  const registerUser = async () => {
    try {
      // await AsyncStorage.setItem('userName', userName);
      // await AsyncStorage.setItem('userPassword', userPassword);
      const userData = [{userName: userName}, {userPassword: userPassword}];
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      // console.warn(userData);
      userContext.updateIsWalkthrough(false);
      userContext.updateIsLogin(true);
    } catch (error) {
      console.log('register User Error::', error);
    }
  };
  return (
    <SignUp
      userName={userName}
      userPassword={userPassword}
      showPassword={showPassword}
      onShowPassword={onShowPassword}
      onChangeUserName={onChangeUserName}
      onChangePassword={onChangePassword}
      onRegisterAccountPressed={onRegisterAccountPressed}
      validationError={validationError}
      isLoading={isLoading}
      from="SignUp"
    />
  );
};

export default SignUpScreen;
