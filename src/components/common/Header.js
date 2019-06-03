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
    shadowOffset: { width: 4, height: 4 }
  },
});

const Header = ({ title, rightElement, leftElement, leftAvatar }) => {
    const { titleStyle, containerStyleOuter } = styles

    return (
      <SafeAreaView>
        <ListItem
            title={title}
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