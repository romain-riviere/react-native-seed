import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import {AppColors, AppIcons, AppRoutes, AppSettings} from '../Constants';
import {StyleSheet} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={AppRoutes.STACK_TABS}>
          <Stack.Screen
            name={AppRoutes.STACK_TABS}
            component={TabNavigator}
            options={({navigation}) => ({
              title: AppSettings.APP_NAME,
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerRight}
                  onPress={() => navigation.push(AppRoutes.STACK_PROFILE)}>
                  <Ionicons
                    name={AppIcons.PREFERENCES}
                    size={25}
                    color={AppColors.INACTIVE}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name={AppRoutes.STACK_PROFILE}
            component={ProfileScreen}
            options={{title: 'Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {paddingRight: 20},
});

export default StackNavigator;
