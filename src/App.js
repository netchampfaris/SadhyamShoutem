import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import {Scene, Router, ActionConst} from 'react-native-router-flux';

import Login from './Login';
import Questions from './Main/Questions';
import Solutions from './Main/Solutions';
import Feed from './Main/Feed';
import Profile from './Main/Profile';

export default class App extends React.Component {
  render() {
    return (
        <Router>
            <Scene key="root">
                <Scene key="login" component={Login} title="Login to Sadhyam" initial hideNavBar/>
                <Scene key="maintab" tabs tabBarStyle={{backgroundColor: '#ddd'}} type={ActionConst.REPLACE}>
                    <Scene key="tab1" icon={TabIcon} title="Questions" hideNavBar>
                        <Scene key="questions" component={Questions} title="Questions" initial/>
                    </Scene>
                    <Scene key="tab2" icon={TabIcon} title="Feed">
                        <Scene key="feed" component={Feed}/>
                    </Scene>
                    <Scene key="tab3" icon={TabIcon} title="Solutions">
                        <Scene key="solutions" component={Solutions}/>
                    </Scene>
                    <Scene key="tab4" icon={TabIcon} title="Profile">
                        <Scene key="profile" component={Profile}/>
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
  }
}

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}