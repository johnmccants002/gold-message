import React from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import colors from '../../ui-conf/colors';

// Strings
const WINDOW = 'window';

const screenHeight = Dimensions.get(WINDOW).height;

const styles = StyleSheet.create({
  containerWrapper: {
      height: screenHeight,
      backgroundColor: colors.gold1,
  },
  container: {
      flex: 1,
      padding: 20,
  },
});

const AuthenticationScreen = ({ children, props }) => {
    const { containerWrapper, container } = styles

    return (
      <View style={containerWrapper} {...props}>
          <ScrollView>
              <KeyboardAvoidingView style={container} behavior="padding" enabled>
                {children}
              </KeyboardAvoidingView>
          </ScrollView>
      </View>
    )
}

export default AuthenticationScreen