import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Tabs from './src/Router'
import {setDummyData, getDecks} from './utils/api'



export default class App extends React.Component {


  render() {
    return (
 <View style={{flex: 1, paddingTop: 20}}>
	<Tabs />
 </View>
    );
  }
}

