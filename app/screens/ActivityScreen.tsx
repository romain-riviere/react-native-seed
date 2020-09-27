import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class ActivityScreen extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Activity Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivityScreen;
