import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  SafeAreaView
} from 'react-native';

import {
  Input, Icon,ListItem
} from 'react-native-elements';

import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import HeaderTextButton from './common/HeaderTextButton';
import ComposeMessageContainer from './ComposeMessageContainer';
import GoldButton from './common/GoldButton';

const selectRecipient = 'SelectRecipient';

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
  }

});


class SelectRecipient extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { phoneNumber : '' }
  }

  sendGoldMessage = () => {
    const { phoneNumber } = this.state
    console.log('send gold message', phoneNumber)
  }
  render() {
    const { inputContainerStyle, inputStyle, inputComponentContainerStyle } = styles
    const { phoneNumber } = this.state

    return (
      <View style={{ flex: 1 }}>
        <Header
          title={"New Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'times'} onPress={() => this.props.navigation.goBack()} />}
        />
        
        <ComposeMessageContainer title={'Phone Number'}>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 20 }} >
              <Input
                containerStyle={inputContainerStyle}
                inputStyle={inputStyle}
                inputContainerStyle={inputComponentContainerStyle}
                placeholder="+1(999)111-5555"
                maxLength={16}
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={(value) => { this.setState({ phoneNumber: value })}}
                numberOfLines={1}
              />
              <GoldButton title={"Send Gold Message"} onPress={() => this.sendGoldMessage()} />
            </View>
        </ComposeMessageContainer>
      </View>
    );
  }
}

export default SelectRecipient;
