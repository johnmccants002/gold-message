import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button, Input, ListItem, Badge,
} from 'react-native-elements';

// Strings
const WINDOW = 'window';

const screenHeight = Dimensions.get(WINDOW).height;

const userSelected = () => {
  Alert.alert('User Selected', '..........');
};

class SelectRecipient extends Component {
  render() {
    const list = [
      {
        name: 'Bruce Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Amy Farha2',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Chris Jackson2',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Amy Farha3',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Chris Jackson3',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Bruce Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Amy Farha2',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Chris Jackson2',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Amy Farha3',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
      {
        name: 'Chris Jackson3',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur',
      },
    ];

    return (
      <ScrollView>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 55, backgroundColor: '#fff', shadowOffset: 4, borderBottomColor: '#ccc', borderBottomWidth: 0.6,
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Select Recipient</Text>
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 17 }}>Next</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View>

            {
                            list.map((l, i) => (
                              <ListItem
                                onPress={userSelected}
                                key={i}
                                title={l.name}
                                titleStyle={{
                                  color: '#000', marginLeft: -10, marginBottom: 8, fontWeight: 'bold', width: 200,
                                }}
                              />
                            ))
                        }
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default SelectRecipient;

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
