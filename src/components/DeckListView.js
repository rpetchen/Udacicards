import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Card from './common/Card'
import { setDummyData, getDecks, NOTIFICATION_KEY, setLocalNotification } from '../../utils/api'
import { Notifications, Permissions } from 'expo'

class DeckListView extends React.Component {

  state = {
    decks: []
  }

  componentDidMount() {

    //set local notification to remind user to take a quiz if not taken for a day
    setLocalNotification()
    //sets dummy data if no data available then gets decks and set to local state
    setDummyData()
      .then(getDecks((key, asyncData) => {
        if (key !== NOTIFICATION_KEY) {
          this.setState({
            ...this.state,
            decks: [
              ...this.state.decks,
              asyncData
            ]
          })
        }
      }))
    AsyncStorage.getAllKeys().then((k) => {

      const length = k.length
      this.setState({
        length
      })
    })


  }

//method for navigating user to deck view
  onPress = (deck) => {
    this.props.navigation.navigate('DeckView', {
      deck
    })
  }

//render methdod which returns a flatlist view of all the decks returned from asyncstorage
  render() {
    const {decks, length} = this.state

    if (decks.length !== length - 1) {
      return <Text>
               Loading
             </Text>
    }

    const deckList = decks.map((d) => {
      return JSON.parse(d)
    })

    return (
      <FlatList data={ deckList }
        extraData={ this.state }
        renderItem={ ({item}) => (
                     
                       <Card title={ item.title } length={ item.questions.length } onPress={ this.onPress } />
                     
                     ) }
        keyExtractor={ (item, index) => index } />
      );
  }
}

export default DeckListView
