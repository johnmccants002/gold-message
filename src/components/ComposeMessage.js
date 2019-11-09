import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  Text,
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
import GoldButton from './common/GoldButton';

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
    const { inputContainerStyle, inputStyle, inputComponentContainerStyle, contentContainerStyle } = styles
    const { messageText } = this.state
    const inputAccessoryViewID = "inputAccessoryView1";
    
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Header
          title={"New Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={() => this.onBack()} />}
          rightElement={() => <HeaderIconButton iconName={'clone'} onPress={() => this.onSelectMultiple()} />}
        />
      
        <ComposeMessageContainer title={`Type Your Gold Messaged`}>
            <View style={contentContainerStyle} >
              <Input
                  containerStyle={inputContainerStyle}
                  inputStyle={inputStyle}
                  inputContainerStyle={inputComponentContainerStyle}
                  placeholder="Start typing..."
                  multiline
                  maxLength={145}
                  numberOfLines={4}
                  value={messageText}
                  onChangeText={(value) => { this.setState({ messageText: value })}}
                  autoFocus
                />
            </View>
            {isIPhone &&
              <GoldButton title={`Continue`} onPress={() => this.onNext()} />
            }
        </ComposeMessageContainer>

        {!isIPhone &&
          <GoldButton title={`Continue`} onPress={() => this.onNext()} />
        }
      </View>
    );
  }
}

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
    borderBottomWidth: 0,
    minHeight: 100,
  },
   contentContainerStyle: {
     flex: 1,
     justifyContent: 'space-between',
  },
});

const mapStateToProps = () => {

  return {
  }
}

export default connect(mapStateToProps, { composeMessageText, resetComposeMessage })(ComposeMessage)
