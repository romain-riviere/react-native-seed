import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from 'react-native-i18n';

class RegisterComponent extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{I18n.t('AUTHENTICATION_SCREEN.REGISTER.TITLE')}</Text>
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

export default RegisterComponent;
