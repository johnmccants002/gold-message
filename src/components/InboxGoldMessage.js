import React from 'react';
import colors from '../ui-conf/colors';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import GoldListItem from './common/GoldListItem';

const styles = StyleSheet.create({
  goldMessageLineContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  titleStyle: {
      color: colors.black,
      marginBottom: 8,
      fontWeight: 'bold',
      width: 200,
      flex: 1,
  },
  subtitleStyle: {
      opacity: .7,
      flex: 1,
  },
  sentTimeStyle: { 
      flex: 1,
      textAlign: 'right'
  },
  messageCountContainer: {
      width: 20,
      justifyContent: "flex-end",
      alignItems: 'flex-end'
  },
  messageCountStyle: {
      height: 20,
      width: 20,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
  }
  });

const InboxGoldMessage = ({ item, onPress }) => {
  const { goldMessageLineContainer, titleStyle, subtitleStyle, messageCountContainer, messageCountStyle } = styles
  const { displayName, lastGoldMessage, messageCount, unread } = item
  
  const containsUnread = unread > 0
  const messageCountContainerColor = { backgroundColor: containsUnread ? colors.gold1 : colors.lightGray }
  const messageCountTextColor = { color: containsUnread ? colors.white : colors.gold1, fontSize: 12 }

  return (
      <GoldListItem onPress={onPress}>
          <View style={goldMessageLineContainer}>
              <Text style={titleStyle}>{displayName}</Text>
          </View>
          <View style={goldMessageLineContainer}>
              <Text style={subtitleStyle}>{lastGoldMessage}</Text>
                {containsUnread && 
                <View style={messageCountContainer}>
                        <View style={[messageCountStyle, messageCountContainerColor]}>
                            <Text style={messageCountTextColor}>{unread}</Text>
                        </View>
                </View>
                }
          </View>
      </GoldListItem>
  )
}

export default InboxGoldMessage