import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FI from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';

interface Item {
  id: number;
  make: string;
  color: string;
  registration_no: string;
}
interface AddNewCar {
  carName: string;
  color: string;
  model: string;
  registrationNumber: string;
  selectCategory: boolean;
  registrationError: string;
  modelError: string;
  companyData: Item[];
  onChangeColor: (args: string) => void;
  onChangeModel: (args: string) => void;
  onChangeRegistration: (args: string) => void;
  onSelectCategoryPressed: () => void;
  onSelectCompany: (companyName: string, id: number) => void;
  onSubmitFile: () => void;
}
const RenderFeaturedList = ({
  item,
  index,
  onSelectCompany,
}: {
  item: Item;
  index: number;
  onSelectCompany: (companyName: string, id: number) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelectCompany(item.make, item.id)}
      style={styles.listContainer}>
      <Text style={styles.listText}>{item.make}</Text>
    </TouchableOpacity>
  );
};
const AddNewCar: FC<AddNewCar> = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subConatiner}>
        <View style={styles.selectCatContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={props.onSelectCategoryPressed}>
            <Text style={styles.selectCatText}>Select Category{'\t\t'}</Text>
            <FI name="caret-down" size={20} style={{color: '#D7E6E7'}} />
          </TouchableOpacity>
        </View>
        <View>
          {props.selectCategory && (
            <View>
              <FlatList
                data={props.companyData}
                renderItem={({item, index}) => (
                  <RenderFeaturedList
                    item={item}
                    index={index}
                    onSelectCompany={props.onSelectCompany}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        {props.selectCategory === false && (
          <>
            <View style={styles.genericView}>
              <Text style={styles.fieldsText}>Company</Text>
              <View style={styles.companyNameContainer}>
                <Text style={styles.inputText}>{props.carName}</Text>
              </View>
            </View>
            <View style={styles.genericView}>
              <Text style={styles.fieldsText}>Enter color</Text>
              <TextInput
                style={styles.textInputFields}
                placeholderTextColor={Colors.placeHolderTextColor}
                placeholder="black"
                value={props.color}
                onChangeText={props.onChangeColor}
              />
            </View>
            <View style={styles.genericView}>
              <Text style={styles.fieldsText}>Enter model #</Text>
              <TextInput
                maxLength={4}
                style={styles.textInputFields}
                placeholder="20XX"
                placeholderTextColor={Colors.placeHolderTextColor}
                value={props.model}
                onChangeText={props.onChangeModel}
              />
              {props.modelError.length > 0 && (
                <Text style={styles.erroText}>{props.modelError}</Text>
              )}
            </View>
            <View style={styles.genericView}>
              <Text style={styles.fieldsText}>Enter registration number</Text>
              <TextInput
                style={styles.textInputFields}
                maxLength={8}
                value={props.registrationNumber}
                onChangeText={props.onChangeRegistration}
                placeholder="XYZ-1234"
                placeholderTextColor={Colors.placeHolderTextColor}
              />
              {props.registrationError.length > 0 && (
                <Text style={styles.erroText}>{props.registrationError}</Text>
              )}
            </View>
            <View style={styles.submitButtonContainer}>
              <TouchableOpacity
                onPress={props.onSubmitFile}
                style={styles.submitButton}>
                <Text style={styles.submitText}>Submit Application</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default AddNewCar;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#06464E'},
  subConatiner: {
    flex: 2,
    marginTop: 50,
  },
  selectCatContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  selectCatText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
    paddingLeft: 10,
  },
  listContainer: {
    backgroundColor: '#08626A',
    flex: 1,
    marginTop: 10,
    padding: 10,
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
  listText: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#fff'},
  genericView: {paddingHorizontal: 20, marginTop: 20},
  fieldsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
    paddingLeft: 10,
  },
  companyNameContainer: {
    backgroundColor: '#08626A',
    padding: 15,
    borderRadius: 10,
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
  },
  textInputFields: {
    backgroundColor: '#08626A',
    paddingLeft: 15,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    borderRadius: 10,
    color: '#fff',
  },
  erroText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.errorMessage,
    paddingLeft: 10,
  },
  submitButtonContainer: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: Colors.buttonPrimaryColor,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  submitText: {color: '#fff', fontFamily: 'Poppins-Regular'},
});
