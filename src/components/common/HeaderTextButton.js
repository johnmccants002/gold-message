import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import colors from '../../ui-conf/colors';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 15 
  },
  textStyle: {
    color: colors.gold1,
    fontSize: 17
  },
});

const HeaderTextButton = ({ title, onPress }) => {
    const { containerStyle, textStyle } = styles

    return (
      <View style={containerStyle}>
        <Text style={textStyle} onPress={onPress}>{title}</Text>
      </View>
    )
}

export default HeaderTextButton