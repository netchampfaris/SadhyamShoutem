import React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    TextInput,
    Button,
    Text
} from '@shoutem/ui';

export default function SignupForm({ onChangeFirstName, onChangeLastName,
        onChangeEmail, onChangePassword, onPressSignup }) {

    return (
        <View style={styles.signupContainer}>
            <TextInput 
                placeholder={"First Name"}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={onChangeFirstName}
            />
            <TextInput 
                placeholder={"Last Name"}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={onChangeLastName}
            />
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
            <Button styleName="dark md-gutter-top" onPress={onPressSignup}>
                <Text>SIGNUP</Text>
            </Button>
        </View>
    )
}

const styles = {
    signupContainer: {
        width: 200
    }
}