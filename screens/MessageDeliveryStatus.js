import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Button, Input, ThemeProvider, Icon,
} from 'react-native-elements';

// Strings
const WINDOW = 'window';
const selectRecipient = 'SelectRecipient';
const inbox = 'InBox';

const screenHeight = Dimensions.get(WINDOW).height;

class MessageDeliveryStatus extends Component {
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
          backgroundColor: '#fff',
          shadowOffset: 4,
          borderBottomColor: '#ccc',
          borderBottomWidth: 0.6,
        }}
        >
          <View style={{ padding: 15, paddingTop: 10 }}>
            <Icon
              name="times"
              size={29}
              type="font-awesome"
              color="#fff"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>New Gold Message</Text>
          </View>
          <View style={{ padding: 15 }}>
            <Icon
              name="user-plus"
              size={29}
              type="font-awesome"
              color="#fff"
              onPress={() => this.props.navigation.navigate('SelectRecipient')}
            />
          </View>
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#fafbfc' }} />
          <View style={{ flex: 2, backgroundColor: '#fafbfc' }}>
            <Icon
              name="check-circle"
              size={55}
              type="font-awesome"
              color="#ffd64d"
              onPress={() => this.props.navigation.navigate('SelectRecipient')}
            />
            <Text style={{
              textAlign: 'center',
              fontSize: 20,
            }}
            >
                            Your Gold Message was sent!
            </Text>
          </View>
          <View style={{
            flex: 1, backgroundColor: '#fafbfc', marginBottom: 0, flexDirection: 'column-reverse',
          }}
          >
            <Button
              buttonStyle={{
                backgroundColor: '#ffd64d',
                height: 65,
                marginBottom: 0,
                flexDirection: 'column-reverse',
              }}
              title="Sent!"
              disabled
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default MessageDeliveryStatus;
