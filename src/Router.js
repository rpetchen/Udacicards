import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import IndividualDeckView from './components/IndividualDeckView'




//stack navigator to navigate from decklist to deckview
const DeckListStack = StackNavigator({

  DeckList: {
    screen: DeckListView,
    navigationOptions: {
      title: 'Deck List',
    },
  },
  DeckView: {
    screen: IndividualDeckView,
    navigationOptions: {
      title: 'Your Deck',
    },
  },
},
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#DDDDDD'
      }
    }
  });


//tab navigator for the deck view and new deck view
const Tabs = TabNavigator({
  DeckList: {
    screen: DeckListStack,
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
        backgroundColor: '#3D9970',


      },
    },
  });

export default Tabs
