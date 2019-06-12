import React from 'react';
import colors from '../ui-conf/colors';
import moment from 'moment'

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  goldMessageContainer: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomColor: colors.gray1,
      borderBottomWidth: .25,
  },
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
      flex: 1,
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
  const { goldMessageContainer, goldMessageLineContainer, titleStyle, subtitleStyle, sentTimeStyle, messageCountContainer, messageCountStyle } = styles
  const { displayName, lastGoldMessage, lastGoldMessageTime, messageCount, unread } = item
  const lastGoldMessageTimeMillis = lastGoldMessageTime.toMillis()
  const time = moment(lastGoldMessageTimeMillis).fromNow()
  const containsUnread = unread > 0
  const messageCountContainerColor = { backgroundColor: containsUnread ? colors.gold1 : colors.lightGray }
  const messageCountTextColor = { color: containsUnread ? colors.white : colors.gold1, fontSize: 12 }

  return (
      <TouchableOpacity style={goldMessageContainer} onPress={onPress}>
          <View style={goldMessageLineContainer}>
              <Text style={titleStyle}>{displayName}</Text>
              <Text style={sentTimeStyle}>{time}</Text>
          </View>
          <View style={goldMessageLineContainer}>
              <Text style={subtitleStyle}>{lastGoldMessage}</Text>
              <View style={messageCountContainer}>
                {containsUnread && 
                    <View style={[messageCountStyle, messageCountContainerColor]}>
                        <Text style={messageCountTextColor}>{unread}</Text>
                    </View>
                }
              </View>
          </View>
      </TouchableOpacity>
  )
}

export default InboxGoldMessage