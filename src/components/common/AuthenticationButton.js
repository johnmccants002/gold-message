import React from 'react';
import { Button, ThemeProvider } from 'react-native-elements';
import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    buttonStyle: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#ffffff',
    },
    titleStyle: {
      color: '#ffd64d',
      fontSize: 20,
    },
  
  });

const RegistrationButton = ({ title, onPress }) => {
    const { buttonStyle, titleStyle } = styles

    return (
        <ThemeProvider>
            <Button
              buttonStyle={buttonStyle}
              titleStyle={titleStyle}
              title={title}
              onPress={onPress} />
        </ThemeProvider>
    )
}

export default RegistrationButton