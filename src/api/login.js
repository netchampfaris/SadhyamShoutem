import { AsyncStorage } from 'react-native';

import url from './url';

export function loginUser(username, password) {

    console.log(username, password);
    const loginUrl = url.LOGIN_URL;

    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            return AsyncStorage.multiSet([
                ['user', res.subscriber.user],
                ['api_key', res.subscriber.api_key]
            ]);
        } else {
            throw 'Authentication Error';
        }
    });
}

export function createNewUser(email, password, firstName, lastName) {
    const signupUrl = url.SIGNUP_URL;

    return fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            email,
            password,
            first_name: firstName,
            last_name: lastName
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        if(res.error_message) {
            throw res.error_message;
        }
    })
    .catch(e => {
        console.log(e)
    });
}

export function isUserLoggedIn() {
    return AsyncStorage.getItem('user')
    .then((user) => {
        if(user)
            return true;
        return false;
    });
}

export function getUserApi() {
    return AsyncStorage.multiGet(['user', 'api_key'])
    .then((res) => {
        const out = {}
        out[res[0][0]] = res[0][1];
        out[res[1][0]] = res[1][1];
        return out;
    });
}

getUserApi();