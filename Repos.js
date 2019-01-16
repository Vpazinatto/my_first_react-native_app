import React, {Component} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import HeaderBar from './HeaderBar';
import styles from './Styles'

const colors = ['#404bab', '#b47400', '#5f277c', '#edec51'];

const gitApi = "https://api.github.com/";
const auth = { headers: { Authorization: "token 9788d62861b34d417eb4b173a9c7b955f76d1edb" } };

export default class ReposScreen extends Component {
  
  state = {
    user: this.props.navigation.getParam('user', ''),
    repos: [],
  }

  componentDidMount() {
    fetch(`${gitApi}users/${this.state.user.login}/repos`, auth)
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
          <View style={styles.flexRow}>
            {(item.language) ?
            <View style={{ flexDirection: 'row' }}>
              <Text style={{...styles.point, backgroundColor: colors[Math.floor(Math.random() * 4)]}}> </Text>
              <Text style={styles.reposL}>{item.language}</Text>
            </View> : <Text></Text>}
            {(item.stargazers_count) ? 
            <View style={styles.flexRow}>
              <Image source={{ uri: "https://img.icons8.com/metro/26/000000/christmas-star.png" }}/>
              <Text></Text>
            </View> : <Text></Text>}
          </View>
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