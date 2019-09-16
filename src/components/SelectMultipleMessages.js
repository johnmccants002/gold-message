import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';

import {
  Input,
} from 'react-native-elements';

import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import HeaderTextButton from './common/HeaderTextButton';
import { COMPOSE_MESSAGE_RECIPIENT } from '../actions/screens';
import { getSentGoldMessages } from '../actions/inbox';
import GoldListItem from './common/GoldListItem';
import colors from '../ui-conf/colors';
import { updateMultipleGoldMessages } from '../actions/composeMessages';
import Autolink from 'react-native-autolink';



const styles = StyleSheet.create({
  goldMessageLineContainer: {
      flex: 1,
      flexDirection: 'row',
  },
  sentGoldMessageListContainer: {
      flex: 1,
      backgroundColor: colors.white
  },
  itemContainer: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 5,
      justifyContent: "space-between"
  },
  goldMessageTextStyle: {
      opacity: .7,
      flex: 3,
  },
  goldMessageTimeStyle: {
      opacity: .7,
      flex: 1,
      textAlign: 'right'
  },
  recipientCounterStyle: {
      color: colors.muted,
      marginLeft: 10,
      fontSize: 16
  },
})


class SelectMultipleMessages extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state = {
        checkedMessages: []
      }
  }


  onNext = () => {
    const { checkedMessages } = this.state

    if(checkedMessages.length > 0) {
      this.props.updateMultipleGoldMessages(checkedMessages)
      this.props.navigation.navigate(COMPOSE_MESSAGE_RECIPIENT)
    }
  }

  componentDidMount() {
    this.props.getSentGoldMessages()
  }

  onBack = () => {
    this.props.updateMultipleGoldMessages([])
    this.props.navigation.goBack()
  }

  onCheckGoldMessage = (goldMessage) => {
    const { checkedMessages } = this.state
    if(checkedMessages.includes(goldMessage)) {
      this.setState({ checkedMessages: checkedMessages.filter((item) => item != goldMessage)})
    } else {
      this.setState({ checkedMessages: [...checkedMessages, goldMessage]})
    }
  }

  renderItem = ({ item }) => {
    const { itemContainer, goldMessageTextStyle } = styles
    const { checkedMessages } = this.state
    const { goldMessage } = item
    const checked = checkedMessages.includes(goldMessage)

    return (
        <GoldListItem style={itemContainer} onPress={() => this.onCheckGoldMessage(goldMessage)}>
                    <Autolink
                        style={goldMessageTextStyle}
                        text={goldMessage}
                        numberOfLines={2}
                        hashtag="instagram"
                        mention="twitter" />
          <HeaderIconButton iconName={'check'} color={checked ? colors.gold1 : colors.gray1 } onPress={() => this.onCheckGoldMessage(goldMessage)} />
        </GoldListItem>
    )
  }
  render() {
    const { sentGoldMessages } = this.props
    const { checkedMessages } = this.state
    const { sentGoldMessageListContainer } = styles
    
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={"Select Gold Message"}
          leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={() => this.onBack()} />}
          rightElement={() => <HeaderTextButton title={'Done'} onPress={() => this.onNext() } />}
        />
        <FlatList
            style={sentGoldMessageListContainer}
            extraData={{sentGoldMessages, checkedMessages}}
            data={sentGoldMessages}
            keyExtractor={item => `${item.goldMessage}`}
            renderItem={this.renderItem}
            /> 
      </View>
    );
  }
}

const mapStateToProps = ({ composeMessages, inbox }) => {
  const { sentGoldMessages, loading } = inbox
  const { messageText } = composeMessages

  return {
    sentGoldMessages,
    loading,
    messageText
  }
}

export default connect(mapStateToProps, { getSentGoldMessages, updateMultipleGoldMessages })(SelectMultipleMessages)
