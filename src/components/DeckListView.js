import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Card from './common/Card'
import {setDummyData, getDecks} from '../../utils/api'

class DeckListView extends React.Component {

state = {
 decks: []
}

componentDidMount(){

console.log('mount')
 setDummyData()
 .then(getDecks((key, asyncData) => {
   this.setState({...this.state, decks:[
    ...this.state.decks,
    asyncData
 ]})
}))
 AsyncStorage.getAllKeys().then((k)=>{
  
  const length = k.length 
  this.setState({length})
})
}



onPress=(deck)=>{
  this.props.navigation.navigate('DeckView', {deck})
}


  render() {
    const {decks, length} = this.state

    if ( decks.length !== length ) {
      return <Text> Loading </Text>
    }
    
  const deckList = decks.map((d) => {return JSON.parse(d)})

    return (
      <FlatList
                data={deckList}
                extraData={this.state} 
                renderItem={({item}) =>(

                <Card title = {item.title} 
                length = {item.questions.length} 
                onPress={this.onPress}
                />
               
                )}
                keyExtractor={(item, index) => index}
            />
    );
  }
}

export default DeckListView
