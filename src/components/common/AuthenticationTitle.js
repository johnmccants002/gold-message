import React from 'react';
import { Button, ThemeProvider } from 'react-native-elements';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  leadingTextStyle: {
    fontSize: 15,
    textAlign: 'left',
    alignSelf: 'stretch',
    color: '#fff',
    margin: 0,
    marginTop: 120,
    textTransform: 'uppercase',
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
    marginTop: 5,
  },
});

const RegistrationTitle = ({ leadingText, title }) => {
    const { leadingTextStyle, titleStyle } = styles

    return (
        <View>
          <Text style={leadingTextStyle}>{leadingText}</Text>
          <Text style={titleStyle}>{title}</Text>
        </View>
    )
}

export default RegistrationTitle