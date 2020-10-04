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
import CheckBox from '@react-native-community/checkbox';
import {AppColors} from '../../Constants';
import {AuthContext, AuthService} from '../../contexts/AuthContext';

interface State {
  acceptedTerms: boolean;
}
interface Props {}
interface FormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  acceptedTerms: boolean;
}

class SignUpComponent extends React.Component<Props, State> {
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
    passwordConfirm: Yup.string()
      .test('passwordMatch', 'Passwords must match', function (value) {
        return this.parent.password === value;
      })
      .required('Required'),
    acceptedTerms: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions.'),
  });

  constructor(props: Props) {
    super(props);
    this.state = {acceptedTerms: false};
  }
  componentDidMount() {
    this.authService = this.context;
  }

  private _toggleAcceptedTerms = (
    setFieldTouched: Function,
    setFieldValue: Function,
  ) => {
    setFieldTouched('acceptedTerms');
    setFieldValue('acceptedTerms', !this.state.acceptedTerms, true);
    this.setState((lastState) => ({acceptedTerms: !lastState.acceptedTerms}));
  };

  private _onFormSubmit = (values: FormValues, setSubmiting: Function) => {
    this.authService
      .signUpEmailPassword(values.email, values.password)
      .catch(() => {
        setSubmiting(false);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {I18n.t('AUTHENTICATION_SCREEN.SIGNUP.TITLE')}
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: '',
            acceptedTerms: false,
          }}
          validationSchema={this.validationSchema}
          onSubmit={(values: FormValues, {setSubmitting}) =>
            this._onFormSubmit(values, setSubmitting)
          }>
          {({
            handleChange,
            setFieldTouched,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <TextInput
                placeholder="Fill in your e-mail"
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                keyboardType="email-address"
                textContentType="emailAddress"
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="Choose your password"
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                clearTextOnFocus={true}
                secureTextEntry={true}
                textContentType="password"
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
              <TextInput
                placeholder="Confirm your password"
                onChangeText={handleChange('passwordConfirm')}
                onBlur={() => setFieldTouched('passwordConfirm')}
                clearTextOnFocus={true}
                secureTextEntry={true}
                textContentType="password"
                value={values.passwordConfirm}
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <Text style={styles.errors}>{errors.passwordConfirm}</Text>
              )}
              <TouchableOpacity
                style={styles.acceptedTerms}
                onPress={() =>
                  this._toggleAcceptedTerms(setFieldTouched, setFieldValue)
                }>
                <CheckBox
                  value={this.state.acceptedTerms}
                  disabled={true}
                  tintColors={{true: AppColors.MAIN, false: AppColors.MAIN}}
                />
                <Text>I accept the terms and conditions</Text>
              </TouchableOpacity>
              {errors.acceptedTerms && touched.acceptedTerms && (
                <Text style={styles.errors}>{errors.acceptedTerms}</Text>
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
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
  submitText: {
    color: AppColors.WHITE,
  },
  errors: {
    color: AppColors.ERROR,
  },
});

export default SignUpComponent;
