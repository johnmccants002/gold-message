import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  Input
} from 'react-native-elements';

import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import ComposeMessageContainer from './ComposeMessageContainer';
import GoldButton from './common/GoldButton';

import { sendGoldMessage } from '../actions/composeMessages'
import { Icon } from 'react-native-elements';
import ErrorModal from './common/ErrorModal';
import { clearError } from '../actions/errors';

const INBOX = 'InBox'


const styles = StyleSheet.create({
  inputContainerStyle: {
    margin: 0, padding: 0, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 0, marginTop: 0,
  },
  inputStyle: {
    color: '#000', padding: 0, margin: 0, textAlign: 'center', fontSize: 25,
  },
  inputComponentContainerStyle: {
    padding: 0,
    margin: 0,
    borderBottomWidth: 0
  },
   contentContainerStyle: {
     flex: 1,
     justifyContent: 'space-between',
     paddingBottom: 20 
  }, 
  messageSentStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#BBC2CA'
  },
});


class ComposeMessageRecipient extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { phoneNumber : '' }
  }

  sendGoldMessage = () => {
    const { messageText, messageSent } = this.props
    const { phoneNumber } = this.state

    if(messageSent) {
      this.props.navigation.navigate(INBOX)
    } else {
      this.props.sendGoldMessage(phoneNumber, messageText)
    }
  }

  onHandleBack = () => {
    const { messageSent } = this.props

    if(messageSent) {
      this.props.navigation.navigate(INBOX)
    } else {
      this.props.navigation.goBack()
    }
  }

  onErrorDismissed = () => {
    this.props.clearError()
  }
  
  render() {
    const { inputContainerStyle, inputStyle, inputComponentContainerStyle, contentContainerStyle, messageSentStyle } = styles
    const { phoneNumber } = this.state
    const { messageSent, messageError, loading } = this.props

    const containerTitle = messageSent ? '' : 'Phone Number'
    const buttonText = messageSent ? 'Sent!' : 'Send Gold Message'
    const buttonColor = messageSent ? '#BBC2CA' : undefined

    return (
      <View style={{ flex: 1 }}>
      <ErrorModal isVisible={messageError != undefined} message={messageError} onDismissed={this.onErrorDismissed} />
        <Header
          title={"New Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'times'} onPress={this.onHandleBack} />} />
        
        <ComposeMessageContainer title={containerTitle}>
            <View style={contentContainerStyle} >
              {!messageSent && 
                <Input
                  containerStyle={inputContainerStyle}
                  inputStyle={inputStyle}
                  inputContainerStyle={inputComponentContainerStyle}
                  placeholder="+1(999)111-5555"
                  maxLength={16}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(value) => { this.setState({ phoneNumber: value })}}
                  numberOfLines={1}
                />
              }
              {messageSent &&
                  <View>
                    <Icon
                      name="check-circle"
                      size={55}
                      type="font-awesome"
                      color="#ffd64d"
                      onPress={() => this.props.navigation.navigate(INBOX)} />
                    <Text style={messageSentStyle}>Your Gold Message was sent!</Text>
                  </View>
              }
              <GoldButton title={buttonText} onPress={() => this.sendGoldMessage()} buttonColor={buttonColor} loading={loading} />
            </View>
        </ComposeMessageContainer>
      </View>
    );
  }
}
const mapStateToProps = ({ composeMessages }) => {
  const { messageText, messageSent, messageError, loading } = composeMessages
  
  return {
    messageText,
    messageSent,
    messageError,
    loading,
  }
}
export default connect(mapStateToProps, { sendGoldMessage, clearError })(ComposeMessageRecipient);
