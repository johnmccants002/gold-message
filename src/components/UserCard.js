import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CachedImage } from 'react-native-cached-image';
import Autolink from 'react-native-autolink';
import colors from '../ui-conf/colors';

const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

const styles = StyleSheet.create({
    container: {
        height: 225,
        alignItems: 'center',
        borderBottomColor: colors.windowMuted,
        borderBottomWidth: .5,
        overflow: 'scroll',
        backgroundColor: colors.white
    },
    imageStyle: {
        width: 100,
        height: 100,
        overflow: 'hidden',
        borderRadius: 50,
    },
    displayNameStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 5,
    },
    aboutStyle: {
        color: colors.muted,
        margin: 10,
        fontWeight: '500'
    },
});

const UserCard = ({ user }) => {
  const { container, imageStyle, displayNameStyle, aboutStyle } = styles
  const { displayName, about, photoURL } = user || {  }
  
  return (
      <View style={container}>
      <View style={[imageStyle, { margin: 10 }]} onPress={this.onEditImage} activeOpacity={.6}  >
        <Image style={imageStyle} source={{ uri: photoURL ? photoURL : demoImage }} />
      </View>
        <Text style={displayNameStyle}>{displayName}</Text>
        <Autolink
          style={aboutStyle}
          text={about || ''}
          hashtag="instagram"
          mention="twitter" />
      </View>
  )
}

export default UserCard