import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { Actions } from 'react-native-router-flux';
import {
    Text,
    Button,
    TextInput,
    Heading,
    Spinner
} from '@shoutem/ui';

import colors from '../utils/colors';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import { loginUser, createNewUser, isUserLoggedIn } from '../api/login';

export default class Login extends Component {
    constructor(props) {
		super(props);
		this.initialState = {
			isLoading: false,
			email: 'netchamp.faris@gmail.com',
			password: 'qwe',
            firstName: null,
            lastName: null,
            showLogin: true,
			errorMessage: null,
            infoMessage: null,
		};
		this.state = this.initialState;

        this.onPressLogin.bind(this);
	}

    componentWillMount() {
        isUserLoggedIn()
        .then(() => this.navigateToMain());
    }

    onPressLogin() {
		this.setState({
			isLoading: true
		});
		dismissKeyboard();

        const { email, password } = this.state;
        if(this.state.showLogin) {
            // login existing user
		    this.loginExistingUser(email, password);
        } else {
            // create new account
            const { firstName, lastName } = this.state;
            this.createNewAccount(email, password, firstName, lastName);
        }
	}

    loginExistingUser(email, password) {
		loginUser(email, password)
        .then(res => {
            console.log('Login Success', res);
            this.setState({
                isLoading: false
            });
            this.navigateToMain();
        })
        .catch((error) => {
            this.setState({
                isLoading:false,
                errorMessage: error
            });
        });
	}

    createNewAccount(email, password, firstName, lastName) {
        createNewUser(email, password, firstName, lastName)
        .then(res => {
            console.log('New user created', res);
            this.setState({
                isLoading: false,
                infoMessage: 'Account created successfully!'
            });
            setTimeout(() => {
                this.setState({ infoMessage: null });
            }, 3000);
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                errorMessage: error
            });
        });
    }

    navigateToMain() {
        Actions.maintab();
    }

    toggleLogin() {
        const { showLogin } = this.state;
        this.setState({
            showLogin: !showLogin
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Heading styleName="lg-gutter-bottom">Sadhyam</Heading>
                {(() => {
                    if(this.state.showLogin) {
                        return <LoginForm
                            onChangeEmail={email => this.setState({ email })}
                            onChangePassword={password => this.setState({ password })}
                            onPressLogin={() => this.onPressLogin()}
                            isLoading={this.state.isLoading}
                        />
                    } else {
                        return <SignupForm
                            onChangeFirstName={firstName => this.setState({ firstName })}
                            onChangeLastName={lastName => this.setState({ lastName })}
                            onChangeEmail={email => this.setState({ email })}
                            onChangePassword={password => this.setState({ password })}
                            onPressSignup={() => this.onPressLogin()}
                        />
                    }
                })()}
                <Button styleName="md-gutter-top" onPress={() => this.toggleLogin()}>
                {(() => {
                    if(this.state.showLogin) {
                        return <Text>Create new account</Text>
                    } else {
                        return <Text>Login</Text>
                    }
                })()}
                </Button>
                <Text style={{color: colors.danger}}>{this.state.errorMessage}</Text>
                <Text style={{color: colors.info}}>{this.state.infoMessage}</Text>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: colors.danger,
        fontWeight: 'bold'
    },
    infoMessage: {
        color: colors.info
    }
})