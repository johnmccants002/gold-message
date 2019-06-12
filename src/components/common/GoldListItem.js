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
      paddingTop: 20,
      paddingBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      borderBottomColor: colors.gray1,
      borderBottomWidth: .25,
  },
});

const GoldListItem = ({ style, onPress, children }) => {
  const { itemContainer } = styles

  return (
      <TouchableOpacity style={[itemContainer, style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
  )
}

export default GoldListItem