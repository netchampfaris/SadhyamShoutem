import React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    TextInput,
    Button,
    Text,
    Spinner
} from '@shoutem/ui';

export default function LoginForm({ onChangeEmail, onChangePassword, onPressLogin, isLoading }) {

    return (
        <View style={styles.loginContainer}>
            <TextInput 
                placeholder={"Email"}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={onChangeEmail}
            />
            <TextInput 
                placeholder={'Password'}
                secureTextEntry
                onChangeText={onChangePassword}
            />
            <Button styleName={"dark md-gutter-top"+(isLoading ? " muted": "")}
                onPress={onPressLogin}
            >
                <Text>LOGIN</Text>
            </Button>
        </View>
    )
}

const styles = {
    loginContainer: {
        width: 200
    }
};