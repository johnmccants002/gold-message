import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import {
  Text,
  StyleSheet,
} from 'react-native';

import { Input } from 'react-native-elements';
import Colors from '../ui-conf/colors';
import { phoneAuthentication, authenticatedUser } from '../actions/profile';
import AuthenticationButton from './common/AuthenticationButton';
import AuthenticationTitle from './common/AuthenticationTitle';
import AuthenticationScreen from './common/AuthenticationScreen';
import ErrorModal from './common/ErrorModal';
import { clearError } from '../actions/errors';


const styles = StyleSheet.create({
  inputContainerStyle: {
    margin: 0,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 100,
    marginTop: 180,
  },
  inputStyle: {
    color: '#fff',
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
  inputComponentContainerStyle: {
    padding: 0,
    margin: 0,
    borderBottomWidth: 0
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { phoneNumber : '' }
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.props.authenticatedUser(user)
      //firebase.auth().signOut();
      if(!user || !user.displayName) {
        return
      }

      //Leaving in here for testing purposes, this will clear the display name to facilitate testing signup
      //user.updateProfile({ displayName: ``})
      if(user.displayName) {
        this.props.navigation.navigate('InBox')
      } else {
        this.props.navigation.navigate('SignUp')
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const { verification: prevVerification } = prevProps
    const { verification } = this.props

    if(prevVerification !== verification) {
      this.props.navigation.navigate('PhoneVerification')
    }
  }

  authenticate = () => {
    const { phoneNumber } = this.state

    this.props.phoneAuthentication(phoneNumber)
  }

  onErrorDismissed = () => {
    this.props.clearError()
  }

  render() {
    const { phoneNumber } = this.state
    const { loading, error } = this.props
    const { inputContainerStyle, inputStyle, inputComponentContainerStyle } = styles

    return (
      <AuthenticationScreen>
      <ErrorModal isVisible={error != undefined} message={error} onDismissed={this.onErrorDismissed} backgroundColor={Colors.white} textColor={Colors.gold1} />
        <AuthenticationTitle leadingText={'Phone Verification'} title={'Sign In'} />

        <Input
          containerStyle={inputContainerStyle}
          inputStyle={inputStyle}
          inputContainerStyle={inputComponentContainerStyle}
          keyboardType="phone-pad"
          placeholder="ENTER PHONE NUMBER"
          value={phoneNumber}
          onChangeText={(value) => this.setState({ phoneNumber: value})}
        />

        <AuthenticationButton title="Sign In" onPress={() => this.authenticate()} loading={loading} />

        <Text style={styles.instructions}>Recover password</Text>
      </AuthenticationScreen>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  const { verification, loading, error } = profile

  return {
    verification,
    loading,
    error,
  }
}

export default connect(mapStateToProps, { phoneAuthentication, authenticatedUser, clearError } )(SignIn);
