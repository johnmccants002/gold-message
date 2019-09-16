import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';

import {
  Button, Input, Icon,
} from 'react-native-elements';

import Colors from '../ui-conf/colors';

// Strings
const WINDOW = 'window';
const SEL_RECIP = 'ComposeMessageRecipient';
const PH_NUM = 'Phone Number';
const MESS_DLY_STATUS = 'MessageDeliveryStatus';

// Test
const screenHeight = Dimensions.get(WINDOW).height;

class InputNumber extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{
        flex: 1,
      }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 55,
          backgroundColor: Colors.white,
          shadowOffset: 4,
          borderBottomColor: Colors.windowMuted,
          borderBottomWidth: 0.6,
        }}
        >
          <View style={{ padding: 15, paddingTop: 10 }}>
            <Icon
              name="chevron-left"
              size={29}
              type="font-awesome"
              color={Colors.gold1}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>New Gold Message</Text>
          </View>
          <View style={{ padding: 15 }}>
            <Icon
              name="user-plus"
              size={29}
              type="font-awesome"
              color={Colors.gold1}
              onPress={() => this.props.navigation.navigate(SEL_RECIP)}
            />
          </View>
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: Colors.gray2 }} />
          <View style={{ flex: 2, backgroundColor: Colors.gray2 }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 17,
            }}
            >
              {PH_NUM}
            </Text>
            <Input
              inputStyle={{
                color: Colors.black, padding: 0, margin: 0, textAlign: 'center', fontSize: 20,
              }}
              keyboardType="phone-pad"
              multiline={false}
              maxLength={11}
              numberOfLines={4}
            />
          </View>
          <View style={{
            flex: 1, backgroundColor: Colors.gray2, marginBottom: 0, flexDirection: 'column-reverse',
          }}
          >
            <Button
              buttonStyle={{
                backgroundColor: Colors.gold1,
                height: 65,
                marginBottom: 0,
                flexDirection: 'column-reverse',
              }}
              title="Send Gold Message"
              onPress={() => this.props.navigation.navigate(MESS_DLY_STATUS)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default InputNumber;
