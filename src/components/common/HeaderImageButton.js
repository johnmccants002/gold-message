import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
  }
});

const HeaderImageButton = ({ source, onPress }) => {
    const { containerStyle } = styles

    return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <Image
        source={source}
        style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    )
}

export default HeaderImageButton