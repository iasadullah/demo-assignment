import {View, Modal, Text, ActivityIndicator, StyleSheet} from 'react-native';

import React from 'react';
const Loading = (props: any) => {
  return (
    <Modal transparent={true} visible={props.isLoading}>
      <View style={styles.mainContainer}>
        <View
          style={{
            ...styles.loadingContainer,
          }}>
          <ActivityIndicator size="large" color="#7FADB2" />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06464E',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 100,
  },
});
