import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Loading from './Loading';
import Colors from '../Constants/Colors';
import FI from 'react-native-vector-icons/FontAwesome';
import SelectCarPopup from './PopUp/SelectCarPopup';

interface Item {
  id: number;
  make: string;
  color: string;
  registration_no: string;
}
interface home {
  isLoading: boolean;
  userName: string;
  userData: Item[];
  categoryPressed: boolean;
  onCategoryPressed: () => void;
  onSelectCompany: (arg: string, id: number) => void;
  onViewApplicationPressed: () => void;
}
const RenderFeaturedList = ({item, index}: {item: Item; index: number}) => {
  return (
    <View style={styles.registeredCarListContainer}>
      <View style={styles.listMainContainer}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            color: Colors.primarTextColor,
          }}>
          {index + 1}
          {'\t'} {item.make}
        </Text>
        <View
          style={{
            padding: 10,
          }}>
          <Text style={styles.registrationText}>
            Registration# {'\t'}
            {item.registration_no}
          </Text>
        </View>
      </View>
    </View>
  );
};
const Home: FC<home> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SelectCarPopup
        show={props.categoryPressed}
        data={props.userData}
        onHidePopUp={props.onCategoryPressed}
        onSelectCompany={props.onSelectCompany}
      />
      {props.isLoading ? (
        <Loading isLoading={props.isLoading} />
      ) : (
        <View style={styles.mainConatiner}>
          {/**header section */}
          <View style={styles.headerContainer}>
            <View style={styles.userNameContainer}>
              <View style={styles.userNameSubContainer}>
                <FI name="user" size={20} style={{color: '#D7E6E7'}} />
                <Text style={{...styles.headerText, textAlign: 'center'}}>
                  {'\t\t'}Hi {props.userName}
                </Text>
              </View>
            </View>

            <View style={styles.carCatContaine}>
              <TouchableOpacity
                onPress={props.onCategoryPressed}
                style={styles.carCatSubContainer}>
                <Text style={styles.headerText}>
                  {'\t\t'}Car Category{'\t\t'}
                </Text>
                <FI name="caret-down" size={20} style={{color: '#D7E6E7'}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{alignSelf: 'center', marginTop: 10}}>
            <TouchableOpacity
              style={styles.viewApplicationContainer}
              onPress={props.onViewApplicationPressed}>
              <Text style={styles.headerText}>View Application</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.youCarContainer}>
              <Text style={styles.headingText}>Your Registered Vehicles</Text>
            </View>
            <View style={styles.carsList}>
              <FlatList
                data={props.userData}
                renderItem={({item, index}) => (
                  <RenderFeaturedList item={item} index={index} />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  mainConatiner: {flex: 1, backgroundColor: Colors.backgroundColor},
  headerText: {
    fontSize: 14,
    color: Colors.primarTextColor,
    fontFamily: 'Poppins-Regular',
    // marginTop: 20,
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-evenly',
  },
  userNameContainer: {
    backgroundColor: Colors.buttonPrimaryColor,
    borderRadius: 10,
  },
  userNameSubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  viewApplicationContainer: {
    backgroundColor: Colors.buttonPrimaryColor,
    padding: 15,
    borderRadius: 10,
  },
  carCatContaine: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  carCatSubContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.buttonPrimaryColor,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  headingText: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 3,
    color: Colors.primarTextColor,
  },
  registeredCarListContainer: {
    backgroundColor: Colors.inputFieldColor,
    flex: 1,
    marginTop: 10,
    padding: 20,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  listMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registrationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.primarTextColor,
  },
  youCarContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carsList: {
    marginTop: -20,
    flex: 5,
    backgroundColor: Colors.backgroundColor,
    marginBottom: 10,
  },
});
