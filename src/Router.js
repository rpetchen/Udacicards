import React from 'react'
import {TabNavigator} from 'react-navigation'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'



const Tabs = TabNavigator({
   DeckList: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Deck List' 
    },
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    },
  },
},
 {
  tabBarOptions: {
  	activeTintColor: '#B1EEBC',
     style: {
    backgroundColor: '#241541',


  },
  },
});

export default Tabs
