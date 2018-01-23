import React from 'react';
import { StyleSheet, Text, View, Input } from 'react-native';


export default class AddCard extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Input label="Question"
            placeholder="Question"
            value={ this.state.question }
            onChangeText={ text => this.setState({
                             question
                           }) } />
        </View>
        <View>
          <Input label="Answer"
            placeholder="Answer"
            value={ this.state.question }
            onChangeText={ text => this.setState({
                             answer
                           }) } />
        </View>
      </View>
      );
  }
}

