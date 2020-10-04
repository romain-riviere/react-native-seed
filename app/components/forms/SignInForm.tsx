import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import I18n from 'react-native-i18n';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AppColors} from '../../Constants';
import {AuthContext, AuthService} from '../../contexts/AuthContext';
import {GoogleSigninButton} from '@react-native-community/google-signin';
interface State {}
interface Props {}
interface FormValues {
  email: string;
  password: string;
}

class SignInComponent extends React.Component<Props, State> {
  static contextType = AuthContext;
  private authService!: AuthService;

  private validationSchema: Yup.ObjectSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(
        RegExp(
          '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
        ),
        'Password must be 6 characters long and must contain a number, a lowercase letter, an uppercase letter.',
      )
      .required('Required'),
  });

  constructor(props: Props) {
    super(props);
    this.state = {acceptedTerms: false};
  }
  componentDidMount() {
    this.authService = this.context;
  }

  private _onFormSubmit = (values: FormValues, setSubmiting: Function) => {
    this.authService
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(() => {
        setSubmiting(false);
      });
  };

  private _onPressSignInGoogle = () => {
    this.authService.getCredentialsFromGoogle().then((credentials) => {
      this.authService.signInWithCredentials(credentials);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {I18n.t('AUTHENTICATION_SCREEN.SIGNIN.TITLE')}
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={this.validationSchema}
          onSubmit={(values: FormValues, {setSubmitting}) =>
            this._onFormSubmit(values, setSubmitting)
          }>
          {({
            handleChange,
            setFieldTouched,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Fill in your e-mail"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                keyboardType="email-address"
                autoCompleteType="email"
                textContentType="emailAddress"
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Entrust us your password"
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                clearTextOnFocus={true}
                secureTextEntry={true}
                autoCompleteType="password"
                textContentType="password"
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._onPressSignInGoogle}
              />
            </View>
          )}
        </Formik>
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
  title: {
    paddingTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    minWidth: '80%',
    maxWidth: '80%',
  },
  input: {
    marginBottom: 5,
    backgroundColor: AppColors.BLACK_TRANSPARENT,
  },
  acceptedTerms: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  submit: {
    marginTop: 10,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.MAIN,
  },
  googleButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignSelf: 'center',
  },
  submitText: {
    color: AppColors.WHITE,
  },
  errors: {
    color: AppColors.ERROR,
  },
});

export default SignInComponent;
