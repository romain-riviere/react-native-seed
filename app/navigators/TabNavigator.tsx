import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ActivityScreen from '../screens/ActivityScreen';
import HomeScreen from '../screens/HomeScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors, AppIcons, AppRoutes} from '../Constants';
import PreferencesScreen from '../screens/ProfileScreen';
import {StyleSheet} from 'react-native';
import I18n from 'react-native-i18n';

const Tab = createBottomTabNavigator();

class TabNavigator extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialRouteName={AppRoutes.TAB_HOME}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string = '';
              switch (route.name) {
                case AppRoutes.TAB_HOME:
                  iconName = focused ? AppIcons.HOME_ACTIVE : AppIcons.HOME;
                  break;
                case AppRoutes.TAB_ACTIVITY:
                  iconName = focused
                    ? AppIcons.ACTIVITY_ACTIVE
                    : AppIcons.ACTIVITY;
                  break;
                default:
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: AppColors.MAIN,
            inactiveTintColor: AppColors.INACTIVE,
          }}>
          <Tab.Screen
            name={AppRoutes.TAB_HOME}
            component={HomeScreen}
            options={({navigation}) => ({
              title: I18n.t('HOME_SCREEN.TITLE'),
              headerRight: () => (
                <TouchableOpacity style={styles.iconButtonRight}>
                  <Ionicons
                    name={AppIcons.PREFERENCES}
                    size={25}
                    color={AppColors.MAIN}
                    onPress={() => navigation.push(PreferencesScreen)}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Tab.Screen
            name={AppRoutes.TAB_ACTIVITY}
            component={ActivityScreen}
            options={{title: I18n.t('ACTIVITY_SCREEN.TITLE')}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  iconButtonRight: {paddingRight: 20},
});

export default TabNavigator;
