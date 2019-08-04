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

import InboxGoldMessage from './InboxGoldMessage';

import { resetComposeMessage } from '../actions/composeMessages'
import { COMPOSE_MESSAGE, INBOX_PROFILE, PROFILE, EDIT_PROFILE } from '../actions/screens';
import { updateFCMToken } from '../actions/profile';


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
        const usersRef = firebase.firestore().collection('users');
        this.userDetailsRef = usersRef.doc(firebase.auth().currentUser.phoneNumber).collection('inbox').onSnapshot((snapshot) => {
            this.props.refreshInbox()
        })

        try {
            const enabled = await firebase.messaging().hasPermission();
            if (!enabled) {
                    await firebase.messaging().requestPermission();
            }
        } catch (error) {
        }

        const fcmToken = await firebase.messaging().getToken();
        this.props.updateFCMToken(fcmToken)
    }
    
    componentWillUnmount() {
        
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
export default connect(mapStateToProps, { selectedItem, getIncomingGoldMessage, refreshInbox, clearUnread, resetComposeMessage, updateFCMToken })(Inbox)
