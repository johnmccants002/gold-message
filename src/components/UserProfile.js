import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    View,
    StyleSheet,
} from 'react-native'
import Header from './common/Header'
import HeaderIconButton from './common/HeaderIconButton'

import UserCard from './UserCard';
import colors from '../ui-conf/colors';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.windowBackground,
    },
})

class UserProfile extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
    }

    onBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        const { photoURL, displayName, about } = this.props
        const { containerStyle } = styles
        
        return (
            <View style={containerStyle}>
                <Header
                    title={'Profile'}
                    leftElement={() => <HeaderIconButton iconName={'chevron-left'} onPress={this.onBack} />}
                    rightElement={() => <View style={{ padding: 25 }} />}
                />
                <UserCard user={{ photoURL, displayName, about }} />
            </View>
        )
    }
}
const mapStateToProps = ({ inbox }) => {
    const { loading, selectedUser } = inbox
    const {  photoURL, displayName, about } = selectedUser
    
    return {
        photoURL, displayName, about,
        loading
    }
}
export default connect(mapStateToProps)(UserProfile)
