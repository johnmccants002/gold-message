import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';

import Colors from '../ui-conf/colors';

const WINDOW = 'window';

const screenHeight = Dimensions.get(WINDOW).height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: .5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleStyle: {
    textTransform: 'uppercase'
  },

});


class ComposeMessageContainer extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { container, titleContainer, titleStyle } = styles
    const { title, children } = this.props

    return (
        <KeyboardAvoidingView style={container} behavior="padding" enabled>
          <View style={titleContainer}>
            <Text style={titleStyle} >{title}</Text>
          </View>
          {children}
        </KeyboardAvoidingView>
    );
  }
}

export default ComposeMessageContainer;
