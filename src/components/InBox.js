import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Linking,
    SafeAreaView,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import {
    ListItem,
} from 'react-native-elements';

import Colors from '../ui-conf/colors';
import Header from './common/Header';
import HeaderIconButton from './common/HeaderIconButton';
import { resetComposeMessage } from '../actions/composeMessages';

// Strings
const COMPOSE_MESSAGE = 'ComposeMessage';

const demoImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

const genericAlert = () => {
    Linking.openURL(`sms:+19725551244?body=Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt${new Date()}`);
};

const styles = StyleSheet.create({
    titleStyle: {
        color: Colors.black,
        fontSize: 20,
        marginLeft: 60,
        fontWeight: 'bold',
        width: 200,
    },
    containerStyleOuter: {
        marginBottom: 10,
        borderBottomWidth: 0.2,
        paddingBottom: 10,
        borderBottomColor: Colors.white,
        backgroundColor: Colors.white,
        shadowOffset: { width: 4, height: 4 }
    },
    containerStyleInner: {
        backgroundColor: Colors.white,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderBottomWidth: 0.6,
        borderBottomColor: Colors.gray1,
    },
    titleStyleInner: {
        color: Colors.white,
        marginLeft: -10,
        marginBottom: 8,
        fontWeight: 'bold',
        width: 200,
    },
    righTitleStyle: { marginTop: -5 },
    subtitleStyle: { marginLeft: -10 },
});

class InBox extends Component {
    static navigationOptions = {
        header: null,
    };
    
    onNewGoldMessage = () => {
        this.props.resetComposeMessage()
        this.props.navigation.navigate(COMPOSE_MESSAGE)
    }

    render() {
        // Only for demo.  Move call to componentDidMount
        const demoData = [
            {
                name: 'Bruce Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Bruce Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson2',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Amy Farha3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
            {
                name: 'Chris Jackson3',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur',
            },
        ];

        const { displayName } = this.props

        return (
            <View>
                <Header
                    title={"New Gold Message"}
                    leftAvatar={{ source: { uri: demoImage } }}
                    rightElement={() => <HeaderIconButton iconName={'plus'} onPress={this.onNewGoldMessage} />}
                />
                <Text style={{ width : '100%', textAlign: 'center' }}>{displayName}</Text>
                <ScrollView>
                    <SafeAreaView>
                        <View>
                            {
                                demoData.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        title={l.name}
                                        underlayColor={Colors.gold1}
                                        badge={{
                                            value: 3, containerStyle: { marginTop: -20 }, badgeStyle: { padding: 5 }, status: 'warning',
                                        }}
                                        subtitle={l.subtitle}
                                        containerStyle={styles.containerStyleInner}
                                        titleStyle={styles.titleStyleInner}
                                        righTitleStyle={styles.righTitleStyle}
                                        subtitleStyle={styles.subtitleStyle}
                                    />
                                ))
                            }
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = ({ profile }) => {
    const { displayName } = profile

    return {
        displayName
    }
}
export default connect(mapStateToProps, { resetComposeMessage })(InBox);
