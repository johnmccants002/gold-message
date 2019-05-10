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

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, ThemeProvider } from 'react-native-elements';

// Strings
const WINDOW = 'window';

const screenHeight = Dimensions.get(WINDOW).height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd64d',
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
  btnSignUpText: {
    color: '#ffd64d',
    fontSize: 20,
  },

});

class SignIn extends Component {
  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.create}>Lorem Ipsum</Text>
          <Text style={styles.welcome}>Sign In</Text>


          <Input
            containerStyle={{
              margin: 0, padding: 0, borderBottomWidth: 1, borderColor: '#fff', marginBottom: 100, marginTop: 180,
            }}
            inputStyle={{
              color: '#fff', padding: 0, margin: 0, textAlign: 'center',
            }}
            inputContainerStyle={{ padding: 0, margin: 0, borderBottomWidth: 0 }}
            keyboardType="number-pad"
            placeholder="ENTER PHONE NUMBER"
          />

          <ThemeProvider>
            <Button
              buttonStyle={styles.btnSignUp}
              titleStyle={styles.btnSignUpText}
              onPress={() => this.props.navigation.navigate('Inbox')}
              title="Sign In"
            />
          </ThemeProvider>


          <Text style={styles.instructions}>Recover password</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default SignIn;
