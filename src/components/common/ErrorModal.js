import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import colors from '../../ui-conf/colors';
  
export default class ErrorModal extends Component {
  

  constructor(props) {
    super(props)
  }

  render() {
    const { isVisible, onDismissed, message, actionView, containerStyle, textStyle, backgroundColor, textColor } = this.props
    const { modalStyle, errorContainer, messageStyle, closeStyle } = styles

    const backgroundColorStyle = backgroundColor ? { backgroundColor } : {}
    const textColorStyle = textColor ? { color: textColor } : {}
    
    
    return (
        <Modal style={modalStyle} isVisible={isVisible} onBackdropPress={onDismissed} animationIn={'slideInDown'} animationOut={'slideOutUp'} backdropOpacity={.15} >
          <SafeAreaView>
            <View style={[errorContainer, backgroundColorStyle, containerStyle]} onPress={onDismissed}>
              <View style={closeStyle}>
                <Icon
                  name={'times'}
                  size={20}
                  type="font-awesome"
                  color={textColor || colors.white}
                  onPress={onDismissed} />
              </View>
              <Text style={[messageStyle, textColorStyle, textStyle]}>{message}</Text>
              {actionView}
            </View>
        </SafeAreaView>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: { 
    margin: 0,
    justifyContent : 'flex-start',
  },
  errorContainer : {
    backgroundColor : colors.gold1,
    padding: 10,
    width : '100%',
    minHeight : '20%',
    alignItems: 'center',
    flexDirection: 'column'
  },
  messageStyle : {
    color : colors.white,
    fontSize : 17,
    paddingRight : 25,
    textAlign: 'center',
  },
  closeStyle : {
    alignSelf: 'flex-end'
  }
});