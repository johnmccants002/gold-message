import React from 'react';
import colors from '../ui-conf/colors';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker'

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    padding: 10,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 2,
  },
  mutedTextStyle: {
      color: colors.windowMuted,
  },
  inputContainerStyle: {
    backgroundColor: colors.white,
    borderColor: colors.gray1,
    borderWidth: 1,
    borderRadius: 5,

  },
  inputStyle: {
    width: '100%',
    padding: 10,
    maxHeight: 100,
  }
});

const EditProfileInput = ({ style, label, maxLength, value, onChangeText, multiline}) => {
  const { itemContainer, headerSection, mutedTextStyle, inputContainerStyle, inputStyle } = styles

  const characterLength = value ? value.length : 0
  const maxLengthText = maxLength ? `${characterLength}/${maxLength}` : ''

  return (
      <View style={[itemContainer, style]}>
        <View style={headerSection}>
          <Text style={mutedTextStyle}>{label}</Text>
          <Text style={mutedTextStyle}>{maxLengthText}</Text>
        </View>
        <View style={inputContainerStyle}>
          <TextInput
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            scrollEnabled={multiline}
            maxLength={maxLength}
            numberOfLines={3}
            maxHeight={(Platform.OS === 'ios') ? (25 * 3) : null}
            onChangeText={(value) => {
              if(!maxLength) {
                return onChangeText(value)
              }

              return onChangeText(value.slice(0, maxLength))
            }}
          />
        </View>
      </View>
  )
}

export default EditProfileInput