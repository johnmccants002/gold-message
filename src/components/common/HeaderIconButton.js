import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import colors from '../../ui-conf/colors';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
  }
});

const HeaderIconButton = ({ iconName, onPress }) => {
    const { containerStyle } = styles

    return (
      <View style={containerStyle}>
        <Icon
          name={iconName}
          size={29}
          type="font-awesome"
          color={colors.gold1}
          onPress={onPress}
        />
      </View>
    )
}

export default HeaderIconButton