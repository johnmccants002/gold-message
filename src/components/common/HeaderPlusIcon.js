import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import colors from '../../ui-conf/colors';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 15,
    paddingTop: 10,
  }
});

const HeaderBackIcon = ({ onPress }) => {
    const { containerStyle } = styles

    return (
      <View style={containerStyle}>
        <Icon
          name="chevron-left"
          size={29}
          type="font-awesome"
          color={colors.gold1}
          onPress={onPress}
        />
      </View>
    )
}

export default HeaderBackIcon