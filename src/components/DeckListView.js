import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {connect} from 'react-redux'
import getDecks from '../actions/index'
import Card from './common/Card'


class DeckListView extends React.Component {

componentDidMount(){
this.props.getDecks
}


  render() {
  	const {decks} = this.props

  	if (!decks) {
  		return <Text> Loading </Text>
  	}

  	const deckList = Object.keys(decks).map((d) => {return decks[d]})

    return (

      <FlatList
                data={deckList}
                renderItem={({item}) =>(
                    
                <Card title = {item.title} length = {item.questions.length} />
                )}
                keyExtractor={(item, index) => index}
            />
    );
  }
}


const mapStateToProps = ({decks}) =>{
	return {decks : decks}
}

export default connect(mapStateToProps, {getDecks})(DeckListView)
