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

const GoldButton = ({ title, onPress, buttonColor, textColor, loading, disabled }) => {
    const { buttonStyle, titleStyle } = styles

    const buttonColorStyle = buttonColor ? { backgroundColor: buttonColor } : { }
    const textColorStyle = textColor ? { color: textColor } : { }

    return (
        <ThemeProvider>
            <Button
              disabled={loading || disabled}
              loading={loading}
              buttonStyle={[buttonStyle, buttonColorStyle]}
              titleStyle={[titleStyle, textColorStyle]}
              title={title}
              onPress={onPress} />
        </ThemeProvider>
    )
}

export default GoldButton