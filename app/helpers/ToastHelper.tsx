import Toast from 'react-native-root-toast';
import {AppColors} from '../Constants';

const defaultConfig = 'info';
const toastConfig = {
  info: {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    keyboardAvoiding: true,
  },
  success: {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    keyboardAvoiding: true,
    backgroundColor: AppColors.SUCCESS,
    textColor: AppColors.WHITE,
  },
  warning: {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    keyboardAvoiding: true,
    backgroundColor: AppColors.WARNING,
    textColor: AppColors.BLACK,
  },
  error: {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    keyboardAvoiding: true,
    backgroundColor: AppColors.ERROR,
    textColor: AppColors.WHITE,
  },
};

export function showToast(message: string, type: string = defaultConfig) {
  const config = Object(toastConfig)[type];
  Toast.show(message, config ? config : Object(toastConfig)[defaultConfig]);
}
