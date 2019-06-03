import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  Input,
} from 'react-native-elements';

import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import HeaderTextButton from './common/HeaderTextButton';
import ComposeMessageContainer from './ComposeMessageContainer';
import { composeMessageText } from '../actions/messages';

const selectRecipient = 'SelectRecipient';

const styles = StyleSheet.create({


});


class ComposeMessage extends Component {
  static navigationOptions = {
    header: null,
  };

  onNext = () => {
    const { messageText } = this.props
    if(!messageText || messageText.length == 0) {
      console.log(`message cant be enmpty`)

      return
    }

    this.props.navigation.navigate(selectRecipient)
  }

  render() {
    const { messageText } = this.props
    
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={"New Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'times'} onPress={() => this.props.navigation.goBack()} />}
          rightElement={() => <HeaderTextButton title={'Next'} onPress={() => this.onNext() } />}
        />
        
          <ComposeMessageContainer title={'Type Your Gold Message'}>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 20 }} >
              <Input
                containerStyle={{
                  margin: 0, padding: 0, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 0, marginTop: 0,
                }}
                inputStyle={{
                  color: '#000', padding: 0, margin: 0, textAlign: 'center', fontSize: 25,
                }}
                inputContainerStyle={{ padding: 0, margin: 0, borderBottomWidth: 0 }}
                placeholder="Start typing..."
                multiline
                maxLength={145}
                numberOfLines={4}
                value={messageText}
                onChangeText={(value) => { this.props.composeMessageText(value)}}
              />
            </View>
          </ComposeMessageContainer>
      </View>
    );
  }
}

const mapStateToProps = ({ messages }) => {
  const { messageText } = messages

  return {
    messageText
  }
}

export default connect(mapStateToProps, { composeMessageText })(ComposeMessage)
