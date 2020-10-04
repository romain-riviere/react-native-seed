import React from 'react';
import {
  Keyboard,
  EmitterSubscription,
  KeyboardEventListener,
} from 'react-native';

interface Props {
  onDidShow: KeyboardEventListener;
  onDidHide: KeyboardEventListener;
}

class KeyboardListener extends React.Component<Props> {
  private keyboardDidShowListener: EmitterSubscription | undefined;
  private keyboardDidHideListener: EmitterSubscription | undefined;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.props.onDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.props.onDidHide,
    );
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  render() {
    return false;
  }
}

export default KeyboardListener;
