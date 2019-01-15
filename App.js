/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

const HeaderBar = props => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

class UsersScreen extends Component {

  state = {
    users: [],
  }

  static navigationOptions = {
    headerTitle: <HeaderBar title="GitHub Users"/>,
    headerStyle: {
      backgroundColor: '#282c32',
    },
  };

  componentDidMount() {
    fetch("https://api.github.com/users?since=135")
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(console.log)
  }

  renderUser = ({ item }) => {
    return (
      <View style={styles.userDescription}>
        <Image 
          style={styles.userAvatar}
          source={{ uri: item.avatar_url }}/>
        <View>
          <Text style={styles.loginS}>{item.login}</Text>
          <Text 
            style={styles.reposS} 
            onPress={() => this.props.navigation.navigate('Repos', { user: item, link: item.repos_url })}>
            Press To View Repositories
          </Text>
        </View>
      </View>
    );
  }

  userKey = ({ id }) => id.toString();

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={this.state.usersList}
          data={this.state.users}
          renderItem={this.renderUser}
          keyExtractor={this.userKey}>
        </FlatList>
      </View>
    );
  }
}

const colors = ['#404bab', '#b47400', '#5f277c', '#edec51']

class ReposScreen extends Component {
  
  state = {
    user: this.props.navigation.getParam('user', ''),
    repos: [],
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.user.login}/repos`)
      .then(res => res.json())
      .then(repos => this.setState({ repos }))
      .catch(console.log)
  }
  
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user', '');
    return {
      headerTitle: <HeaderBar title={`${user.login} repositories`}/>,
      headerStyle: {
        backgroundColor: '#282c32',
      },
    };
  };

  renderRepos = ({ item }) => {
    return (
      <View style={styles.reposDescription}>
        <View>
          <Text style={styles.reposN}>{item.name}</Text>
          {(item.description) ? <Text style={styles.reposD}>{item.description}</Text> : <Text>No Description</Text>}
          {(item.language) ?
          <View style={{ flexDirection: 'row' }}>
            <Text style={{...styles.point, backgroundColor: colors[Math.floor(Math.random() * 4)]}}> </Text>
            <Text style={styles.reposL}>{item.language}</Text>
        </View> : <Text></Text>}
        </View>
      </View>
    );
  }

  reposKey = ({ id }) => id.toString();

  render() {
    return (
      <View style={styles.reposList}>
        <FlatList
          data={this.state.repos}
          renderItem={this.renderRepos}
          keyExtractor={this.reposKey}>
        </FlatList>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: UsersScreen,
    Repos: ReposScreen
  },
  {
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 10,
    paddingLeft: 20,
  },
  reposList: {
    margin: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 15,
    textAlign: 'left',
    fontWeight: "bold",
  },
  usersList: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff3',
  },
  userDescription: {
    flexDirection: 'row',
    paddingBottom: 30,
  },
  reposDescription: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#cecaca',
    padding: 20,
    marginBottom: 10, 
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 10,
  },
  loginS: {
    fontSize: 20,
    marginBottom: 3.7,
    fontWeight: "bold",
  }, 
  reposS: {
    fontSize: 16.5,
    color: '#bc2121',
  },
  loginB: {
    fontSize: 25,
    fontWeight: "bold",
  },
  reposN: {
    fontSize: 20,
    marginBottom: 3.7,
    fontWeight: "bold",
  },  
  reposD: {
    fontSize: 17,
    marginBottom: 5,
  },  
  reposL: {
    fontSize: 18
  },
  point: {
    borderRadius: 50,
    marginTop: 5,
    marginRight: 5,
    width: 15,
    height: 15,
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
