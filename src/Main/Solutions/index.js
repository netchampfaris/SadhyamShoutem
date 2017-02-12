import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Solutions extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => Actions.main()}>Solutions</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellowgreen'
    }
})