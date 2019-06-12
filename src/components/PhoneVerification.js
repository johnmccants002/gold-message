import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import {
  View,
  StyleSheet,
} from 'react-native';

import { Input } from 'react-native-elements';
import { verifyPhoneNumber, authenticatedUser } from '../actions/profile';
import AuthenticationButton from './common/AuthenticationButton';
import AuthenticationScreen from './common/AuthenticationScreen';
import AuthenticationTitle from './common/AuthenticationTitle';

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
  }
});

class PhoneVerification extends Component {

  constructor(props) {
    super(props);
    this.state = { verificationCode : '' }
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.props.authenticatedUser(user)
    })
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const { phoneVerified: prevPhoneVerified } = prevProps
    const { phoneVerified, user } = this.props

    if(phoneVerified && phoneVerified !== prevPhoneVerified) {
      if(user.displayName) {
        this.props.navigation.navigate('Inbox')
      } else {
        this.props.navigation.navigate('SignUp')
      }
    }
  }

  verifyCode = () => {
    const { verificationCode } = this.state
    
    this.props.verifyPhoneNumber(verificationCode)
  }

  render() {
    const { verificationCode } = this.state
    const { inputContainerStyle, inputStyle, inputComponentContainerStyle } = styles
    
    return (
      <AuthenticationScreen>
        <AuthenticationTitle leadingText={'Phone Verification'} title={'Sign In to account'} />
        <Input
          containerStyle={inputContainerStyle}
          inputStyle={inputStyle}
          inputContainerStyle={inputComponentContainerStyle}
          keyboardType="phone-pad"
          placeholder="VERIFICATION CODE"
          value={verificationCode}
          onChangeText={(value) => this.setState({ verificationCode: value})}
        />
        <View style={{ flex: 1, }}>
          <AuthenticationButton title={"Sign In"} onPress={() => this.verifyCode()} />
        </View>
      </AuthenticationScreen>
    );
  }
}

const mapStateToProps = ({ profile }) => {
  const { phoneVerified, user } = profile

  return {
    phoneVerified,
    user
  }
}

export default connect(mapStateToProps, { verifyPhoneNumber, authenticatedUser } )(PhoneVerification);
