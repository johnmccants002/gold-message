import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';

import {
  Input, Icon,
} from 'react-native-elements';

import Colors from '../ui-conf/colors';

// Strings
const WINDOW = 'window';
const selectRecipient = 'SelectRecipient';

const screenHeight = Dimensions.get(WINDOW).height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray2,
    padding: 20,
    height: screenHeight,
  },
  create: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'stretch',
    color: Colors.white,
    margin: 0,
    marginTop: 120,
    textTransform: 'uppercase',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.white,
    marginTop: 5,
  },
  invited: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'stretch',
    textTransform: 'uppercase',
    color: Colors.white,
    margin: 0,
    marginTop: 85,
  },
  instructions: {
    textAlign: 'center',
    color: Colors.white,
    marginBottom: 5,
  },
  btnSignUp: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: Colors.white,
  },
  btnXO: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
  },
  btnSignUpText: {
    color: Colors.gold1,
    fontSize: 20,
  },

});


class ComposeMessage extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 55, backgroundColor: Colors.white, shadowOffset: 4, borderBottomColor: '#ccc', borderBottomWidth: 0.6,
        }}
        >
          <View style={{ padding: 15, paddingTop: 10 }}>
            <Icon
              name="times"
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
            <Text style={{ color: Colors.gold1, fontSize: 17 }} onPress={() => this.props.navigation.navigate(selectRecipient)}>Next</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

          <View style={{
            alignSelf: 'center',
            padding: 0,
            margin: 0,
            paddingTop: 200,
          }}
          >
            <Text style={{
              textTransform: 'uppercase',
            }}
            >
Type Your Gold Message
            </Text>
          </View>
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
          />

        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default ComposeMessage;
