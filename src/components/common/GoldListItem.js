import React from 'react';
import colors from '../../ui-conf/colors';

import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
      flex: 1,
      flexDirection: 'column',
      padding: 20,
      borderBottomColor: colors.windowMuted,
      borderBottomWidth: .25,
  },
});

const GoldListItem = ({ style, onPress, children, disabled }) => {
  const { itemContainer } = styles

  return (
      <TouchableOpacity style={[itemContainer, style]} onPress={onPress} disabled={disabled}>
        {children}
      </TouchableOpacity>
  )
}

export default GoldListItem