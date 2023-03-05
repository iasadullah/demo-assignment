import React, {FC} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Constants/Colors';

interface Item {
  id: number;
  make: string;
  model: string;
  color: string;
  registrationNumber: string;
}
interface ViewApplication {
  applicationList: Item[];
  onDeletePressed: (index: number) => void;
}
const RenderFeaturedList = ({
  item,
  index,
  onDeletePressed,
}: {
  item: Item;
  index: number;
  onDeletePressed: (index: number) => void;
}) => {
  return (
    <View style={styles.listMainContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={{flex: 5}}>
          <Text style={styles.listText}>{item.make}</Text>
          <Text style={{...styles.listText, fontSize: 12}}>{item.model}</Text>
          <Text style={{...styles.listText, fontSize: 12}}>
            {item.registrationNumber}
          </Text>
        </View>
        <View style={styles.deleteContainer}>
          <TouchableOpacity onPress={() => onDeletePressed(index)}>
            <MI name="delete" size={40} style={{color: '#c70404'}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const ViewApplication: FC<ViewApplication> = props => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>Your Application</Text>
      {props.applicationList && (
        <View>
          <FlatList
            data={props.applicationList}
            renderItem={({item, index}) => (
              <RenderFeaturedList
                item={item}
                index={index}
                onDeletePressed={props.onDeletePressed}
              />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default ViewApplication;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#06464E'},
  headerText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: Colors.primarTextColor,
  },
  listMainContainer: {
    backgroundColor: Colors.inputFieldColor,
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
  listText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.primarTextColor,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
