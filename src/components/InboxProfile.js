import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
    Linking
} from 'react-native'
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'
import HeaderTextButton from './common/HeaderTextButton'

import { getIncomingGoldMessage, clearUnread } from '../actions/inbox';
import GoldListItem from './common/GoldListItem';
import moment from 'moment';
import { updatePhoneNumber, sendMessage } from '../actions/composeMessages';
import ErrorModal from './common/ErrorModal';
import { clearError } from '../actions/errors';
import { SENT_GOLD_MESSAGES_ERROR } from '../actions/types';

// Strings
const COMPOSE_MESSAGE = 'ComposeMessage'

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    goldMessageListContainer: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goldMessageTextStyle: {
        opacity: .7,
        flex: 3,
    },
    goldMessageTimeStyle: {
        opacity: .7,
        flex: 1,
    }
})

class InboxProfile extends Component {
    static navigationOptions = {
        header: null,
    }

    onBack = () => {
        this.props.navigation.goBack()
    }
    
    onNewGoldMessage = () => {
        const { selectedUser } = this.props
        const { phoneNumber } = selectedUser

        this.props.sendMessage(phoneNumber, "", SENT_GOLD_MESSAGES_ERROR)
    }

    componentDidMount() {
        const { selectedUser } = this.props
        const { phoneNumber } = selectedUser

        this.props.getIncomingGoldMessage(phoneNumber)
        this.props.clearUnread(phoneNumber)
    }
    
    renderItem = ({ item }) => {
        const { itemContainer, goldMessageTextStyle, goldMessageTimeStyle } = styles
        const { goldMessage, received } = item

        const receivedTimeMillis = received ? received.toMillis() : 0
        const time = receivedTimeMillis > 0 ? moment(receivedTimeMillis).fromNow() : ''

        return (
            <GoldListItem style={itemContainer}>
                <Text style={goldMessageTextStyle}>{goldMessage}</Text>
                <Text style={goldMessageTimeStyle} numberOfLines={2}>{time}</Text>
            </GoldListItem>
        )
    }

    render() {
        const { selectedUser, selectedUserGoldMessages, loading, error } = this.props
        const { containerStyle, goldMessageListContainer } = styles
        const { displayName, phoneNumber } = selectedUser

        return (
            <View style={containerStyle}>
                <ErrorModal isVisible={error != undefined} message={error} onDismissed={() => this.props.clearError()} />
                <Header
                    title={displayName}
                    leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={this.onBack} />}
                    rightElement={() => <HeaderTextButton title={'Text'} onPress={() => this.onNewGoldMessage() } />}
                />
                <FlatList
                    style={goldMessageListContainer}
                    extraData={selectedUserGoldMessages}
                    data={selectedUserGoldMessages}
                    keyExtractor={(item, index) => `${item.goldMessage}${index}`}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => this.props.getIncomingGoldMessage(phoneNumber) }
                        />
                    }
                    /> 
            </View>
        )
    }
}
const mapStateToProps = ({ inbox }) => {
    const { selectedUser, selectedUserGoldMessages, loading, error } = inbox
    
    return {
        selectedUser,
        selectedUserGoldMessages,
        loading,
        error
    }
}
export default connect(mapStateToProps, { getIncomingGoldMessage, clearUnread, updatePhoneNumber, sendMessage, clearError })(InboxProfile)
