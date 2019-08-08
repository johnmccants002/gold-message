import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Text,
    StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase'

import { Input } from 'react-native-elements';
import Colors from '../ui-conf/colors';
import AuthenticationScreen from './common/AuthenticationScreen';
import AuthenticationTitle from './common/AuthenticationTitle';
import AuthenticationButton from './common/AuthenticationButton';
import ErrorModal from './common/ErrorModal';

import { completeSignIn, authenticatedUser } from '../actions/profile';
import { clearError } from '../actions/errors';
import { INBOX } from '../actions/screens';

// Placeholders, labels
const fName = 'First Name';
const lName = 'Last Name';

const styles = StyleSheet.create({
    inputLabels: {
        marginTop: 10,
        marginBottom: 0,
        color: Colors.white,
    },
    inputStyle: {
        color: Colors.white,
        padding: 0,
        margin: 0,
    },
    inputContainer: {
        margin: 0,
        padding: 0,
        borderBottomWidth: 1,
        borderColor: Colors.white,
    },
    inputContainerStyle: {
        padding: 0,
        margin: 0,
        borderBottomWidth: 0,
    },
    invited: {
        fontSize: 15,
        textAlign: 'left',
        alignSelf: 'stretch',
        textTransform: 'uppercase',
        color: Colors.white,
        margin: 0,
        marginTop: 85,
    },

});


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = { email : '', firstName: '', lastName: '' }
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.props.authenticatedUser(user)
            }
        })
      }

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    componentDidUpdate(prevProps) {
        const { displayName: prevDisplayName } = prevProps
        const { displayName } = this.props

        if(prevDisplayName !== displayName) {
            this.props.navigation.navigate(INBOX)
        }
    }

    completeSignIn = () => {
        const { email, firstName, lastName } = this.state

        this.props.completeSignIn(email, firstName, lastName)
    }

    onErrorDismissed = () => {
      this.props.clearError()
    }

    render() {
        const { email, firstName, lastName } = this.state
        const { loading, error } = this.props

        return (
            <AuthenticationScreen>
                <ErrorModal isVisible={error != undefined} message={error} onDismissed={this.onErrorDismissed} backgroundColor={Colors.white} textColor={Colors.gold1} />
                <AuthenticationTitle leadingText={'Complete Sign In'} title={'Welcome to Gold Message'} />
                <Text style={styles.invited}>You're invited by Alexander S</Text>


                <Text style={styles.inputLabels}>Email Address</Text>
                <Input
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder={'user@domain.com'}
                    rightIcon={{ type: 'font-awesome', name: 'check', color: Colors.white }}
                    value={email}
                    onChangeText={value => this.setState({ email: value })}
                    autoCapitalize = 'none'
                />

                <Text style={styles.inputLabels}>{fName}</Text>
                <Input
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder={fName}
                    rightIcon={{ type: 'font-awesome', name: 'check', color: Colors.white }}
                    value={firstName}
                    onChangeText={value => this.setState({ firstName: value })}
                />

                <Text style={styles.inputLabels}>{lName}</Text>
                <Input
                    containerStyle={{
                        margin: 0, padding: 0, borderBottomWidth: 1, borderColor: Colors.white, marginBottom: 85,
                    }}
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    placeholder={lName}
                    rightIcon={{ type: 'font-awesome', name: 'check', color: Colors.white }}
                    value={lastName}
                    onChangeText={value => this.setState({ lastName: value })}
                />

                <AuthenticationButton title="Complete Sign In" onPress={() => this.completeSignIn()} loading={loading} />
            </AuthenticationScreen>
        );
    }
}

const mapStateToProps = ({ profile }) => {
    const { displayName, loading, error } = profile
  
    return {
        displayName,
        loading,
        error,
    }
}

export default connect(mapStateToProps, { completeSignIn, authenticatedUser, clearError } )(SignUp);
