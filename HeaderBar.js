import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './Styles';

export default class HeaderBar extends Component {
  render() {
    return (
    <View>
      <Text style={styles.title}>{this.props.title}</Text>
    </View>
  )};
}