import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../Constants/Colors';
import Loading from './Loading';

import Ionicons from 'react-native-vector-icons/Ionicons';

interface SignUp {
  userName: string;
  userPassword: string;
  showPassword: boolean;
  validationError: string;
  from: string;
  isLoading: boolean;
  onShowPassword: () => void;
  onChangeUserName: (arg: string) => void;
  onChangePassword: (arg: string) => void;
  onRegisterAccountPressed: (from: string) => void;
}

const SignUp: FC<SignUp> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {props.isLoading ? (
        <Loading isLoading={props.isLoading} />
      ) : (
        <View style={styles.mainContainer}>
          {/* Header section */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Enter your credentials to continue
            </Text>
          </View>
          {/* middle section */}
          <View style={styles.middleContainer}>
            <View style={{paddingHorizontal: 20}}>
              <TextInput
                style={styles.nameInputContainer}
                placeholder="Enter Name"
                placeholderTextColor={Colors.placeHolderTextColor}
                value={props.userName}
                onChangeText={props.onChangeUserName}
              />
            </View>
            <View style={styles.passwordContainer}>
              <View style={styles.passwordFieldSubContainer}>
                <TextInput
                  style={styles.passwordField}
                  placeholder="Enter Password"
                  placeholderTextColor={Colors.placeHolderTextColor}
                  onChangeText={props.onChangePassword}
                  secureTextEntry={!props.showPassword ? true : false}
                />
                <TouchableOpacity
                  onPress={props.onShowPassword}
                  style={styles.showPasswordContainer}>
                  {!props.showPassword ? (
                    <Ionicons
                      name="eye-off-outline"
                      size={20}
                      style={{color: '#D7E6E7'}}
                    />
                  ) : (
                    <Ionicons name="eye" size={20} style={{color: '#D7E6E7'}} />
                  )}
                </TouchableOpacity>
              </View>
              {props.validationError.length > 0 && (
                <Text style={styles.errorText}>{props.validationError}</Text>
              )}
            </View>
          </View>
          {/* bottom section */}
          <View style={{flex: 1}}>
            {props.from === 'Login' ? (
              <View style={styles.bottomSectionContainer}>
                <TouchableOpacity
                  style={styles.registerButtonContainer}
                  onPress={() => props.onRegisterAccountPressed(props.from)}>
                  <Text style={styles.registerText}>Login</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.bottomSectionContainer}>
                <TouchableOpacity
                  style={styles.registerButtonContainer}
                  onPress={() => props.onRegisterAccountPressed(props.from)}>
                  <Text style={styles.registerText}>Register Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: Colors.backgroundColor,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {fontSize: 15, color: '#fff', fontFamily: 'Poppins-Regular'},
  middleContainer: {
    flex: 4,
    justifyContent: 'center',
  },
  nameInputContainer: {
    backgroundColor: Colors.inputFieldColor,
    paddingLeft: 15,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    borderRadius: 10,
    color: '#fff',
  },
  passwordContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  passwordFieldSubContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.inputFieldColor,
    paddingLeft: 15,
    borderRadius: 10,
    width: '100%',
  },
  passwordField: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    width: '85%',
    zIndex: -1,
    color: '#fff',
  },
  showPasswordContainer: {
    width: '10%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSectionContainer: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  registerButtonContainer: {
    backgroundColor: Colors.buttonPrimaryColor,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  registerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primarTextColor,
  },
  errorText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
    color: Colors.errorMessage,
  },
});
