import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackActions } from 'react-navigation';
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    Keyboard,
    TouchableOpacity
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { CachedImage } from 'react-native-cached-image';
import { Icon } from 'react-native-elements';
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'
import HeaderTextButton from './common/HeaderTextButton'

import colors from '../ui-conf/colors';
import { logout, loadCurrentUserProfile, saveCurrentUserProfile } from '../actions/profile';
import { refreshInbox, getSentGoldMessages } from '../actions/inbox';
import EditProfileInput from './EditProfileInput';
import firebase from 'react-native-firebase';
import GoldButton from './common/GoldButton';

const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.windowBackground,
    },
    parentImageContainerStyle: {
        height: 160,
        alignItems: 'center',
        borderBottomColor: colors.windowMuted,
        borderBottomWidth: .5,
        overflow: 'scroll',
        backgroundColor: colors.white
    },
    imageContainerStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        margin: 10,
        backgroundColor: colors.black,
    },
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        position: 'absolute',
        overflow: 'hidden',
        opacity: .6,
    },
    editImageButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

class Profile extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        Keyboard.addListener('keyboardWillShow', (eventType) => {
            this.setState({ showingKeyboard: true })
        })
        Keyboard.addListener('keyboardWillHide', (eventType) => {
            this.setState({ showingKeyboard: false })
        })
        const { email, firstName, lastName, about, photoURL } = this.props
        this.state = { email, firstName, lastName, about, photoURL }
        this.props.loadCurrentUserProfile()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.loading && !this.props.loading) {
            const { email, firstName, lastName, about, photoURL } = this.props

            this.setState({ email, firstName, lastName, about, photoURL })
        }
    }
    
    onBack = () => {
        this.props.navigation.goBack()
    }
    
    onProfileSave = () => {
        const { email, firstName, lastName, about, photoURL } = this.state

        this.props.saveCurrentUserProfile(email, firstName, lastName, about, photoURL)

        this.onBack()
    }

    onEditImage = () => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType : 'photo',
            noData : true,
            maxWidth : 1024,
            maxHeight : 1024,
        }
        ImagePicker.showImagePicker(options, async(response) => {
          
            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
              //console.log('ImagePicker Error: ', response.error);
            } else {

              // You can also display the image using data:
              //const source = { uri: 'data:image/jpeg;base64,' + response.data };
              //console.log('response', response)
              
              this.setState({
                photoURL: response.uri,
                imageInfo : response
              });

            }
        })
    }

    onLogoutPressed = () => {
        this.props.logout()

        this.props.navigation.dispatch(StackActions.popToTop());
    }

    render() {
        const { containerStyle, parentImageContainerStyle, imageContainerStyle, imageStyle, editImageButton } = styles
        const { 
            photoURL,
            email, 
            firstName, 
            lastName,
            about,
            showingKeyboard
        } = this.state

        return (
            <View style={containerStyle}>
                <Header
                    title={'Profile'}
                    leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={this.onBack} />}
                    rightElement={() => <HeaderTextButton title={'Save'} onPress={this.onProfileSave} />} 
                />
                
                <View style={parentImageContainerStyle}>
                    <View style={imageContainerStyle}>
                        <TouchableOpacity style={editImageButton} onPress={this.onEditImage} activeOpacity={.6}  >
                            <Image style={imageStyle} source={{ uri: photoURL ? photoURL : demoImage }} />
                            <Icon
                                name={'camera'}
                                size={29}
                                type="font-awesome"
                                color={colors.white}/>
                        </TouchableOpacity>
                    </View>
                </View> 
                <KeyboardAvoidingView style={containerStyle} behavior="position" keyboardVerticalOffset={-60} enabled>
                    <ScrollView style={{ backgroundColor: colors.windowBackground, marginBottom : 50 }}  >
                        <EditProfileInput label={'Email'} value={email} onChangeText={(email) => this.setState({ email })}/>
                        <EditProfileInput label={'First Name'} value={firstName} onChangeText={(firstName) => this.setState({ firstName })}/>
                        <EditProfileInput label={'Last Name'}  value={lastName} onChangeText={(lastName) => this.setState({ lastName })}/>
                        <EditProfileInput label={'About'} maxLength={160} multiline value={about} onChangeText={(about) => this.setState({ about })}/>
                    </ScrollView>
                </KeyboardAvoidingView>

                <View style={{ padding: 10 }}>
                    <GoldButton title={'Logout'} onPress={this.onLogoutPressed} buttonColor={colors.gold1} textColor={colors.white} />
                </View>
            </View>
        )
    }
}
const mapStateToProps = ({ profile }) => {
    const { user, email, firstName, lastName, displayName, about, loading, photoURL } = profile
    
    return {
        user,
        email,
        firstName,
        lastName,
        displayName,
        photoURL,
        about,
        loading
    }
}
export default connect(mapStateToProps, { saveCurrentUserProfile, loadCurrentUserProfile, logout })(Profile)
