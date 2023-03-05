import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../../Constants/Colors';
const SelectCarPopup = (props: any) => {
  return (
    <Modal
      onRequestClose={props.onHidePopUp}
      visible={props.show}
      animationType="none"
      transparent={true}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onHidePopUp}
        style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...styles.boxContainer,
            backgroundColor: Colors.backgroundColor,
          }}>
          <FlatList
            data={props.data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={
                  index === props.data.length - 1
                    ? {...styles.contentContainer, borderBottomWidth: 0}
                    : styles.contentContainer
                }
                onPress={() => props.onSelectCompany(item.make, item.id)}>
                <Text
                  style={{
                    ...styles.nameText,
                  }}>
                  {item.make}
                </Text>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default SelectCarPopup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  boxContainer: {
    width: 250,
    maxHeight: 421,
    borderRadius: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 15,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: Colors.buttonPrimaryColor,
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    includeFontPadding: false,
    marginHorizontal: 25,
    color: Colors.primarTextColor,
  },
});
