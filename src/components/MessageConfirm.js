import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Button, Input, ThemeProvider, Icon, colors,
} from 'react-native-elements';
import { COMPOSE_MESSAGE_RECIPIENT } from '../actions/screens';

// Strings
const WINDOW = 'window';

const screenHeight = Dimensions.get(WINDOW).height;

class ComposeMessage extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 55, backgroundColor: '#fff', shadowOffset: 4, borderBottomColor: colors.windowMuted, borderBottomWidth: 0.6,
        }}
        >
          <View style={{ padding: 15, paddingTop: 10 }}>
            <Icon
              name="times"
              size={29}
              type="font-awesome"
              color="#ffd64d"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>New Gold Message</Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#ffd64d', fontSize: 17 }} onPress={() => this.props.navigation.navigate(COMPOSE_MESSAGE_RECIPIENT)}>Next</Text>
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
              margin: 0, padding: 0, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 100, marginTop: 0,
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


          <Text style={styles.instructions}>Recover password</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default ComposeMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
    padding: 20,
    height: screenHeight,
  },
  create: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'stretch',
    color: '#fff',
    margin: 0,
    marginTop: 120,
    textTransform: 'uppercase',
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
    marginTop: 5,
  },
  invited: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'stretch',
    textTransform: 'uppercase',
    color: '#fff',
    margin: 0,
    marginTop: 85,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  btnSignUp: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
  },
  btnXO: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
  },
  btnSignUpText: {
    color: '#ffd64d',
    fontSize: 20,
  },

});
