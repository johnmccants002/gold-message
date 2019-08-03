import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
    Image,
} from 'react-native'
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'

import { refreshInbox, getSentGoldMessages } from '../actions/inbox';
import GoldListItem from './common/GoldListItem';
import UserCard from './UserCard';
import colors from '../ui-conf/colors';
import GoldButton from './common/GoldButton';
import { logout, loadCurrentUserProfile, selectedSentGoldMessage } from '../actions/profile';
import { EDIT_PROFILE, GOLD_MESSAGES_SENT } from '../actions/screens';
import Autolink from 'react-native-autolink';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.windowBackground,
    },
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
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 5,
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
    sentGoldMessagesHeader: {
        backgroundColor: colors.windowBackground,
        borderBottomColor: colors.windowMuted,
        borderBottomWidth: .5,
        height: 75,
        justifyContent: 'flex-end'
    },
    sentGoldMessageTextStyle: {
        color: colors.windowMuted,
        padding: 10,
    },
    recipientCounterStyle: {
        color: colors.muted,
        marginLeft: 10,
        fontSize: 16
    },
    avatarStyle: {
        height: 30,
        width: 30,
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 15,
        marginLeft: -10,
    }
})

class Profile extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.props.loadCurrentUserProfile()
    }

    onBack = () => {
        this.props.navigation.goBack()
    }
    
    onProfileEdit = () => {
        this.props.navigation.navigate(EDIT_PROFILE)
    }

    onLogoutPressed = () => {
        this.props.logout()

        this.props.navigation.dispatch(StackActions.popToTop());
    }

    componentDidMount() {
        this.props.getSentGoldMessages()
    }

    onGoldMessageClicked = (item) => {
        this.props.selectedSentGoldMessage(item)
        this.props.navigation.navigate(GOLD_MESSAGES_SENT)
    }
    
    renderItem = ({ item }) => {
        const { itemContainer, goldMessageLineContainer, goldMessageTextStyle, recipientCounterStyle, avatarStyle } = styles
        const { goldMessage, recipients } = item

        return (
            <GoldListItem style={itemContainer} onPress={() => this.onGoldMessageClicked(item)}>
                <View style={goldMessageLineContainer}>
                    <Autolink
                        numberOfLines={2}
                        style={goldMessageTextStyle}
                        text={goldMessage}
                        hashtag="instagram"
                        mention="twitter" />
                </View>
                <View style={[goldMessageLineContainer, { marginTop: 15, marginLeft: 10, alignItems: 'center', justifyContent: 'flex-end' }]}>
                    {recipients.length > 0 && <Text style={recipientCounterStyle}>+{(recipients.length)}</Text> }
                </View>
            </GoldListItem>
        )
    }

    render() {
        const { sentGoldMessages, photoURL, displayName, about } = this.props
        const { containerStyle, sentGoldMessageListContainer, sentGoldMessagesHeader, sentGoldMessageTextStyle } = styles
        
        return (
            <View style={containerStyle}>
                <Header
                    title={'Profile'}
                    leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={this.onBack} />}
                    rightElement={() => <HeaderIconButton iconName={'cog'} onPress={this.onProfileEdit} />}
                />
                <UserCard user={{ photoURL, displayName, about }} />
                <View style={sentGoldMessagesHeader}>
                    <Text style={sentGoldMessageTextStyle}>Sent Gold Messages</Text>
                </View>
                <FlatList
                    style={sentGoldMessageListContainer}
                    extraData={sentGoldMessages}
                    data={sentGoldMessages}
                    keyExtractor={item => `${item.goldMessage}`}
                    renderItem={this.renderItem}
                    /> 
                <View style={{ padding: 10 }}>
                    <GoldButton title={'Logout'} onPress={this.onLogoutPressed} buttonColor={colors.gold1} textColor={colors.white} />
                </View>
            </View>
        )
    }
}
const mapStateToProps = ({ inbox, profile }) => {
    const { sentGoldMessages, loading } = inbox
    const {  photoURL, displayName, about } = profile
    
    return {
        photoURL, displayName, about,
        sentGoldMessages,
        loading
    }
}
export default connect(mapStateToProps, { loadCurrentUserProfile, refreshInbox, getSentGoldMessages, logout, selectedSentGoldMessage })(Profile)
