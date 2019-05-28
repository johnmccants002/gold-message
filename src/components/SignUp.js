import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

import { Button, Input, ThemeProvider } from 'react-native-elements';
import Colors from '../ui-conf/colors';

// Strings
const WINDOW = 'window';

const screenHeight = Dimensions.get(WINDOW).height;

// Placeholders, labels
const fName = 'First Name';
const lName = 'Last Name';
const uName = 'Username';

const styles = StyleSheet.create({
    containerWrapper: {
        height: screenHeight,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.gold1,
        padding: 20,
    },
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
    create: {
        fontSize: 15,
        textAlign: 'left',
        alignSelf: 'stretch',
        color: Colors.white,
        margin: 0,
        marginTop: 120,
        textTransform: 'uppercase',
    },
    welcome: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        color: Colors.white,
        marginTop: 5,
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
    instructions: {
        textAlign: 'center',
        color: Colors.white,
        marginBottom: 5,
    },
    btnSignUp: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: Colors.white,
    },
    btnSignUpText: {
        color: Colors.gold1,
        fontSize: 20,
    },

});


class SignUp extends Component {
    render() {
        return (
            <View style={styles.containerWrapper}>
                <ScrollView>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <Text style={styles.create}>Create Your Profile</Text>
                        <Text style={styles.welcome}>Welcome to Gold Message</Text>
                        <Text style={styles.invited}>You're invited by Alexander S</Text>


                        <Text style={styles.inputLabels}>{uName}</Text>
                        <Input
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder={uName}
                            rightIcon={{ type: 'font-awesome', name: 'check', color: Colors.white }}
                        />

                        <Text style={styles.inputLabels}>{fName}</Text>
                        <Input
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            placeholder={fName}
                            rightIcon={{ type: 'font-awesome', name: 'check', color: Colors.white }}
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
                        />

                        <ThemeProvider>
                            <Button
                                buttonStyle={styles.btnSignUp}
                                titleStyle={styles.btnSignUpText}
                                onPress={() => this.props.navigation.navigate('InBox')}
                                title="Sign Up"
                            />
                        </ThemeProvider>


                        <Text style={styles.instructions}>
                            Have an account?
                            <Text style={{ textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('SignIn')}>Sign In</Text>
                        </Text>
                        <Text style={styles.instructions}>Recover password</Text>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

export default SignUp;
