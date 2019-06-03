import React from 'react';
import { Button, ThemeProvider } from 'react-native-elements';
import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    buttonStyle: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#ffd64d',
    },
    titleStyle: {
      color: '#ffffff',
      fontSize: 20,
    },
  
  });

const GoldButton = ({ title, onPress }) => {
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

export default GoldButton