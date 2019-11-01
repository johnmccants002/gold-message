import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  InputAccessoryView,
  Button,
  Platform
} from 'react-native';

import {
  Input,
} from 'react-native-elements';

import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import HeaderTextButton from './common/HeaderTextButton';
import ComposeMessageContainer from './ComposeMessageContainer';
import { composeMessageText, resetComposeMessage } from '../actions/composeMessages';
import { COMPOSE_MESSAGE_RECIPIENT, SELECT_MULTIPLE_MESSAGES, INBOX } from '../actions/screens';

const isIPhone = Platform.OS === 'ios'


class ComposeMessage extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      messageText: ''
    }
  }

  onNext = () => {
    const { messageText } = this.state
    if(!messageText || messageText.length == 0) {

      return
    }
    this.props.composeMessageText(messageText)
    this.props.navigation.navigate(COMPOSE_MESSAGE_RECIPIENT)
  }

  onBack = () => {
    this.props.resetComposeMessage()
    this.props.navigation.navigate(INBOX)
  }

  onSelectMultiple = () => {
    this.props.navigation.navigate(SELECT_MULTIPLE_MESSAGES)
  }

  render() {
    const { messageText } = this.state
    const inputAccessoryViewID = "inputAccessoryView1";
    
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={"New Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={() => this.onBack()} />}
          rightElement={() => <HeaderTextButton title={'Next'} onPress={() => this.onNext() } />}
        />
        
          <ComposeMessageContainer title={'Type Your Gold Message'}>
            <View style={{ flex: 1, justifyContent: 'space-between' }} >
              <Input
                containerStyle={{
                  marginTop: 0, padding: 0, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 0, marginTop: 0,
                }}
                inputStyle={{
                  color: '#000', padding: 0, marginTop: 10, textAlign: 'center', fontSize: 25,
                }}
                inputContainerStyle={{ padding: 0, margin: 0, borderBottomWidth: 0 }}
                placeholder="Start typing..."
                multiline
                maxLength={145}
                numberOfLines={4}
                value={messageText}
                onChangeText={(value) => { this.setState({ messageText: value })}}
                inputAccessoryViewID={inputAccessoryViewID}
                autoFocus
              />
              {isIPhone &&
                <InputAccessoryView nativeID={inputAccessoryViewID}>
                  <View style={{ flex: 1, alignItems: 'flex-end'}}>
                      <HeaderIconButton iconName={'clone'} onPress={() => this.onSelectMultiple()} />
                  </View>
              </InputAccessoryView>
              }
            </View>          
          </ComposeMessageContainer>
      </View>
    );
  }
}

const mapStateToProps = () => {

  return {
  }
}

export default connect(mapStateToProps, { composeMessageText, resetComposeMessage })(ComposeMessage)
