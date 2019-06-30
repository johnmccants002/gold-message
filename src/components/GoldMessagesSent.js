import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation';
import {
    View,
    StyleSheet,
    FlatList,
    Linking,
    Text,
    Image,
    Alert,
} from 'react-native'
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'

import GoldListItem from './common/GoldListItem';
import colors from '../ui-conf/colors';

import { EDIT_PROFILE, INBOX } from '../actions/screens';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteGoldMessage } from '../actions/composeMessages';

const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.windowBackground,
    },
    recipientListContainer: {
        flex: 1,
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContainer: {
        height: 65,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop:  5,
        marginBottom: 5,
        borderBottomWidth: undefined,
        borderBottomColor: undefined,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.windowMuted,
    },
    avatarStyle: {
        height: 50,
        width: 50,
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 25,
        marginLeft: -10,
    },
    goldMessageRecipientStyle: {
        margin: 5
    },
    headerContainer: {
        backgroundColor: colors.windowBackground,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        justifyContent: 'flex-end',
    },
    headerText: {
        color: colors.windowMuted,
    },
    sentGoldMessageTextStyle: {
        margin: 10,
    },
    textButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.gold1,
        textAlign: 'center',
        height: 35,
        width: 65,
        borderRadius: 5,
    },
    textButtonTextStyle: {
        color: colors.gold1
    }
})

class GoldMessagesSent extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
    }

    onBack = () => {
        this.props.navigation.goBack()
    }
    
    onTextRecipient = (item) => {
        const { phoneNumber } = item

        const smsLink = `sms:${phoneNumber}`
        Linking.openURL(smsLink);
    }

    renderItem = ({ item }) => {
        const { itemContainer, listItemContainer, avatarStyle, goldMessageRecipientStyle, textButtonContainer, textButtonStyle, textButtonTextStyle } = styles
        const { displayName, photoURL } = item

        return (
            <GoldListItem style={itemContainer} disabled={true}>
                <View style={listItemContainer}>
                    <Image source={{ uri: photoURL ? photoURL : demoImage}} style={avatarStyle} /> 
                    <Text style={goldMessageRecipientStyle} numberOfLines={2}>{displayName}</Text>
                    <View style={textButtonContainer}>
                        <TouchableOpacity style={textButtonStyle} onPress={() => this.onTextRecipient(item)}> 
                            <Text style={textButtonTextStyle}>Text</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </GoldListItem>
        )
    }
    onDeleteGoldMessage = () => {
        const { goldMessageText } = this.props
        this.props.deleteGoldMessage(goldMessageText)
        this.props.navigation.navigate(INBOX)

    }
    
    confirmDelete = () => {
        
        Alert.alert(
            'Delete Gold Message',
            'Are you want to delete this gold message?',
            [
            { text : 'Delete', onPress : () => this.onDeleteGoldMessage() },
            { text : 'Cancel', onPress : () => console.log('cancelled delete') },
            ],
            { cancelable : true },
        );
    }

    rightMenu = () => {
        return (
            <Menu style={{ backgroundColor: 'yello'}} >
            <MenuTrigger>
                <HeaderIconButton iconName={'ellipsis-h'} />
            </MenuTrigger>
            <MenuOptions style={{ marginTop: 20 }}>
              <MenuOption style={{ padding: 10 }} onSelect={this.confirmDelete} text='Delete' />
            </MenuOptions>
          </Menu>
        )
    }

    render() {
        const { selectedGoldMessage, recipients } = this.props
        const { containerStyle, recipientListContainer, headerContainer, headerText, itemContainer, sentGoldMessageTextStyle } = styles
        const { goldMessage } = selectedGoldMessage

        return (
            <MenuProvider style={containerStyle}>
                <Header
                    title={'Gold Message'}
                    leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={this.onBack} />}
                    rightElement={this.rightMenu}
                />
                <View style={headerContainer}>
                    <Text style={headerText}>Gold Message</Text>
                </View>
                <View style={itemContainer}>
                    <Text style={sentGoldMessageTextStyle}>{goldMessage}</Text>
                </View>
                <View style={headerContainer}>
                    <Text style={headerText}>Sent To</Text>
                </View>
                <FlatList
                    style={recipientListContainer}
                    extraData={recipients}
                    data={recipients}
                    keyExtractor={item => `${item.phoneNumber}`}
                    renderItem={this.renderItem}
                    /> 
            </MenuProvider>
        )
    }
}
const mapStateToProps = ({ profile }) => {
    const { selectedGoldMessage } = profile
    const { recipients, goldMessage: goldMessageText } = selectedGoldMessage

    return {
        selectedGoldMessage,
        goldMessageText,
        recipients
    }
}
export default connect(mapStateToProps, { deleteGoldMessage })(GoldMessagesSent)
