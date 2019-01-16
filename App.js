import React, {Component} from 'react';
import UsersScreen from './Users';
import ReposScreen from './Repos';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Users: UsersScreen,
    Repos: ReposScreen
  },
  {
    initialRouteName: "Users"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
