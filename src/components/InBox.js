import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native'
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'
import { refreshInbox, clearUnread } from '../actions/inbox'

const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

import { resetComposeMessage } from '../actions/composeMessages'
import InboxGoldMessage from './InboxGoldMessage';

// Strings
const COMPOSE_MESSAGE = 'ComposeMessage'

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    goldMessageListContainer: {
        flex: 1,
    }
})

class InBox extends Component {
    static navigationOptions = {
        header: null,
    }

    onNewGoldMessage = () => {
        this.props.resetComposeMessage()
        this.props.navigation.navigate(COMPOSE_MESSAGE)
    }

    componentDidMount() {
        this.props.refreshInbox()
    }

    goldMessageSelected = (item) => {
        console.log('selected item', item)
        this.props.clearUnread(item.phoneNumber)
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
export default connect(mapStateToProps, { refreshInbox, clearUnread, resetComposeMessage })(InBox)
