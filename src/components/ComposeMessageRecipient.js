import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  Input
} from 'react-native-elements';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'

import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import ComposeMessageContainer from './ComposeMessageContainer';
import GoldButton from './common/GoldButton';

import { sendGoldMessage, updatePhoneNumber, requestContactsPermission } from '../actions/composeMessages'
import { Icon } from 'react-native-elements';
import ErrorModal from './common/ErrorModal';
import { clearError } from '../actions/errors';
import { INBOX } from '../actions/screens';
import HeaderImageButton from './common/HeaderImageButton';
import { selectContactPhone } from 'react-native-select-contact';


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
  }

  sendGoldMessage = () => {
    const { messageSent } = this.props
    if(messageSent) {
      this.props.navigation.navigate(INBOX)

      return
    }

    const parsedNumber = parsePhoneNumberFromString(this.asYouType.getNumber().number)
    
    if (!parsedNumber || !parsedNumber.isValid()) {
              
      Alert.alert(
        'Invalid Phone',
        'The number you have entered is not a valid phone number'
      )
      return
    } 
    
    this.props.sendGoldMessage(this.asYouType.getNumber().number, this.props.navigation)
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

  componentWillMount() {
    this.asYouType = new AsYouType('US')
  }

  onSelectContact = async() => {
    const granted = await requestContactsPermission()
    if(!granted) {
      return
    }

    const { selectedPhone } = await selectContactPhone()
    if(!selectedPhone) {
      return
    }

    const { number } = selectedPhone
    this.props.updatePhoneNumber(number)

  }
  
  render() {
    const { inputContainerStyle, inputStyle, inputComponentContainerStyle, contentContainerStyle, messageSentStyle } = styles
    const { messageSent, messageError, loading, phoneNumber } = this.props

    const containerTitle = messageSent ? '' : 'Phone Number'
    const buttonText = messageSent ? 'Sent!' : 'Send Gold Message'
    const buttonColor = messageSent ? '#BBC2CA' : undefined
    
    
    this.asYouType.reset()
    const formattedNumber = this.asYouType.input(phoneNumber)
    
    const { nationalNumber } = this.asYouType.getNumber() || { nationalNumber: '' }
    let useFormatted = nationalNumber.length >= 4

    return (
      <View style={{ flex: 1 }}>
      <ErrorModal isVisible={messageError != undefined} message={messageError} onDismissed={this.onErrorDismissed} />
        <Header
          title={"New Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={this.onHandleBack} />}
          rightElement={() => <HeaderImageButton source={require('../assets/contacts.png')} onPress={this.onSelectContact}/>}/>
        
        <ComposeMessageContainer title={containerTitle}>
            <View style={contentContainerStyle} >
              {!messageSent && 
                <Input
                  containerStyle={inputContainerStyle}
                  inputStyle={inputStyle}
                  inputContainerStyle={inputComponentContainerStyle}
                  placeholder="(999) 555-4444"
                  maxLength={16}
                  keyboardType="phone-pad"
                  value={useFormatted ? formattedNumber : phoneNumber}
                  onChangeText={(value) => { this.props.updatePhoneNumber(value) }}
                  numberOfLines={1}
                  autoFocus
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
  const { messageSent, messageError, loading, phoneNumber } = composeMessages
  
  return {
    messageSent,
    messageError,
    loading,
    phoneNumber,
  }
}
export default connect(mapStateToProps, { sendGoldMessage, clearError, updatePhoneNumber })(ComposeMessageRecipient);
