import React from 'react';
import {
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { ListItem } from 'react-native-elements';
import colors from '../../ui-conf/colors';

const styles = StyleSheet.create({
  titleStyle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center' 
  },
  containerStyleOuter: {
    shadowOffset: { width: 4, height: 4 },
    borderBottomColor: colors.windowMuted,
    borderBottomWidth: .5,
  },
});

const Header = ({ title, rightElement, leftElement, leftAvatar, onPress }) => {
    const { titleStyle, containerStyleOuter } = styles

    return (
      <SafeAreaView>
        <ListItem
            title={title}
            onPress={onPress}
            leftAvatar={leftAvatar}
            rightElement={rightElement}
            leftElement={leftElement}
            titleStyle={titleStyle}
            containerStyle={containerStyleOuter}
        />
      </SafeAreaView>
    )
}

export default Header