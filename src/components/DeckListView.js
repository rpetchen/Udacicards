import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
import Card from './common/Card'
import {setDummyData, getDecks} from '../../utils/api'

class DeckListView extends React.Component {

state = {
 decks: {}
}

componentDidMount(){

 setDummyData()
 .then(getDecks((key, asyncData) => {
   this.setState({...this.state, decks:{
    ...this.state.decks,
    [key]: asyncData
 }})
}))
 AsyncStorage.getAllKeys().then((k)=>{
  const length = k.length 
  this.setState({length})
})
}



onPress=(deck)=>{
  this.props.navigation.navigate('DeckView', {deck})
}

objTitle = (item) =>{
  let objItem = JSON.parse(item)
  return objItem.title
}

objQuestionCount = (item) => {
  let objItem = JSON.parse(item)
  return objItem.questions.length
}

  render() {
  	const {decks, length} = this.state

  	if ( Object.keys(decks).length !== length ) {
  		return <Text> Loading </Text>
  	}

  	const deckList = Object.keys(decks).map((d) => {return decks[d]})
  
    return (
      <FlatList
                data={deckList}
                extraData={this.state} 
                renderItem={({item}) =>(

                <Card title = {this.objTitle(item)} 
                length = {this.objQuestionCount(item)} 
                onPress={this.onPress}
                />
               
                )}
                keyExtractor={(item, index) => index}
            />
    );
  }
}


export default DeckListView
