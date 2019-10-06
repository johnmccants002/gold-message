import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Alert,
} from 'react-native'
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'
import { selectedItem, refreshInbox, clearUnread, getIncomingGoldMessage, blockUser } from '../actions/inbox'

import InboxGoldMessage from './InboxGoldMessage';

import { resetComposeMessage } from '../actions/composeMessages'
import { COMPOSE_MESSAGE, INBOX_PROFILE, PROFILE, SIGN_IN } from '../actions/screens';
import { updateFCMToken, storeInboxSnapshotUnsubscribe } from '../actions/profile';


const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

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

    async componentDidMount() {
        if(firebase.auth().currentUser == null) {
            return
        }

        this.onAuthStateChangedUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if(!user) {
                this.props.navigation.navigate(SIGN_IN)
            }
        })
        
        const usersRef = firebase.firestore().collection('users');
        this.inboxSnapshotUnbsubscribe = usersRef.doc(firebase.auth().currentUser.phoneNumber).collection('inbox').onSnapshot((snapshot) => {
            if(firebase.auth().currentUser != null) {
                this.props.refreshInbox()
            }
        })
        this.props.storeInboxSnapshotUnsubscribe(this.inboxSnapshotUnbsubscribe)

        try {
            const enabled = await firebase.messaging().hasPermission();
            if (!enabled) {
                    await firebase.messaging().requestPermission();
            }
        } catch (error) {
        }

        if(firebase.auth().currentUser != null) {
            const fcmToken = await firebase.messaging().getToken();
            this.props.updateFCMToken(fcmToken)
        }
    }

    componentWillUnmount() {
        try {
            if(this.onAuthStateChangedUnsubscribe) {
                this.onAuthStateChangedUnsubscribe()
            }
        } catch{}

        try {
            if(this.inboxSnapshotUnbsubscribe) {
                this.inboxSnapshotUnbsubscribe()
            }
        } catch{}
    }

    goldMessageSelected = (item) => {
        this.props.selectedItem(item)
        this.props.navigation.navigate(INBOX_PROFILE)
    }

    onPromptOptions = (item) => {
        const { displayName } = item
        
        Alert.alert(
            displayName,
            undefined,
            [
            { text : 'Block User', onPress : () => {
                    this.onConfirmBlock(item)
                }
            },
            { text : 'Cancel' }
            ]
        )
    }

    onConfirmBlock = (item) => {
        const { displayName } = item
        Alert.alert(
            displayName,
            'Are you sure you want to block this user?',
            [
            { text : 'Confirm', onPress : () => {
                    this.props.blockUser(item)
                }
            },
            { text : 'Cancel' }
            ]
        )
    }
    
    renderItem = ({ item }) => {

        return (
            <InboxGoldMessage key={item.phoneNumber} item={item} onPress={() => this.goldMessageSelected(item)} onLongPress={() => this.onPromptOptions(item)} />
        )
    }

    onProfilePress = () => {
        this.props.navigation.navigate(PROFILE)
    }

    render() {
        const { items, loading, photoURL } = this.props
        const { containerStyle, goldMessageListContainer } = styles

        return (
            <View style={containerStyle}>
                <Header
                    title={"Gold Messages"}
                    leftAvatar={{ source: { uri: photoURL ? photoURL : demoImage }, onPress: this.onProfilePress }}
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
    const { displayName, user, photoURL } = profile
    const { items, loading } = inbox

    return {
        user,
        displayName,
        photoURL,
        items,
        loading
    }
}
export default connect(mapStateToProps, { selectedItem, getIncomingGoldMessage, refreshInbox, clearUnread, resetComposeMessage, updateFCMToken, storeInboxSnapshotUnsubscribe, blockUser })(Inbox)
