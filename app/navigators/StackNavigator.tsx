import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../components/screens/ProfileScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors, AppIcons, AppRoutes, AppSettings} from '../Constants';
import I18n from 'react-native-i18n';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
  public user: FirebaseAuthTypes.User | null = null;

  private animationConfig: TransitionSpec = {
    animation: 'timing',
    config: {
      duration: 200,
    },
  };

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={AppRoutes.STACK_TABS}
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name={AppRoutes.STACK_TABS}
            component={TabNavigator}
            options={({navigation}) => ({
              title: AppSettings.APP_NAME,
              transitionSpec: {
                open: this.animationConfig,
                close: this.animationConfig,
              },
              headerRight: () =>
                this.user?.isAnonymous ? null : (
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
            options={{
              title: I18n.t('PROFILE_SCREEN.TITLE'),
              transitionSpec: {
                open: this.animationConfig,
                close: this.animationConfig,
              },
            }}
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
