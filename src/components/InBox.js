import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native'
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'
import { selectedItem, refreshInbox, clearUnread, getIncomingGoldMessage } from '../actions/inbox'

const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

import { resetComposeMessage } from '../actions/composeMessages'
import InboxGoldMessage from './InboxGoldMessage';

// Strings
const COMPOSE_MESSAGE = 'ComposeMessage'
const INBOX_PROFILE = 'InboxProfile'

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    goldMessageListContainer: {
        flex: 1,
    }
})

class Inbox extends Component {
    static navigationOptions = {
        header: null,
    }

    onNewGoldMessage = () => {
        this.props.resetComposeMessage()
        this.props.navigation.navigate(COMPOSE_MESSAGE)
    }

    componentDidMount() {
        const usersRef = firebase.firestore().collection('users');
        this.userDetailsRef = usersRef.doc(firebase.auth().currentUser.phoneNumber).collection('inbox').onSnapshot((snapshot) => {
            this.props.refreshInbox()
        })
    }

    goldMessageSelected = (item) => {
        this.props.selectedItem(item)
        this.props.navigation.navigate(INBOX_PROFILE)
    }
    
    renderItem = ({ item }) => {

        return (
            <InboxGoldMessage key={item.phoneNumber} item={item} onPress={() => this.goldMessageSelected(item)} />
        )
    }

    render() {
        const { items, loading } = this.props
        const { containerStyle, goldMessageListContainer } = styles

        return (
            <View style={containerStyle}>
                <Header
                    title={"New Gold Message"}
                    leftAvatar={{ source: { uri: demoImage } }}
                    rightElement={() => <HeaderIconButton iconName={'plus'} onPress={this.onNewGoldMessage} />}
                />
                <FlatList
                    style={goldMessageListContainer}
                    extraData={items}
                    data={items}
                    keyExtractor={item => `${item.phoneNumber}`}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => this.props.refreshInbox() }
                        />
                    }
                    /> 
            </View>
        )
    }
}
const mapStateToProps = ({ profile, inbox }) => {
    const { displayName } = profile
    const { items, loading } = inbox

    return {
        displayName,
        items,
        loading
    }
}
export default connect(mapStateToProps, { selectedItem, getIncomingGoldMessage, refreshInbox, clearUnread, resetComposeMessage })(Inbox)
