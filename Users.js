import React, {Component} from 'react';
import {Text, View, FlatList, Image, TextInput, TouchableOpacity} from 'react-native';
import HeaderBar from './HeaderBar';
import styles from './Styles';

const gitApi = "https://api.github.com/";
const auth = { headers: { Authorization: "token 9788d62861b34d417eb4b173a9c7b955f76d1edb" } };

export default class UsersScreen extends Component {

  state = {
    users: [],
    textInputValue: '',
  }

  static navigationOptions = {
    headerTitle: <HeaderBar title="GitHub Users"/>,
    headerStyle: {
      backgroundColor: '#282c32',
    },
  };

  componentDidMount() {
    fetch(`${gitApi}users?since=135`, auth)
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(console.log)
  }

  navigateToRepos = item => {
    this.props.navigation.navigate('Repos', { user: item, link: item.repos_url })
  }

  renderUser = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.navigateToRepos(item)}>
        <View 
          style={styles.userDescription}>
          <Image
            style={styles.userAvatar}
            source={{ uri: item.avatar_url }}/>
          <View>
            <Text style={styles.loginS}>{item.login}</Text>
            <Text style={styles.reposS}>
              Press To View Repositories
            </Text>
          </View>
        </View> 
      </TouchableOpacity>
    );
  }

  userKey = ({ id }) => id.toString();

  updateTextInput = e => {
    this.setState({ textInputValue: e });
  }

  searchUser = () => {
    fetch(`${gitApi}users/${this.state.textInputValue}`, auth)
      .then(res => res.json())
      .then(user => {
        this.setState({ users: [user] })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.inputArea}>
            <TextInput
              style={styles.textInput}
              onChangeText={this.updateTextInput}
              value={this.state.textInputValue}
              placeholder="Search an user">
            </TextInput>
            <TouchableOpacity onPress={this.searchUser}>
              <Image
                style={styles.searchIcon} 
                source={{ uri: "https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"}} />
            </TouchableOpacity>
          </View>
        </View>
        {(this.state.users.length !== 0) ?
          <FlatList
            style={this.state.usersList}
            data={this.state.users}
            renderItem={this.renderUser}
            keyExtractor={this.userKey}>
          </FlatList> : <Text style={styles.emptyList}>This user doesn't exists</Text>
        }
      </View>
    );
  }
}