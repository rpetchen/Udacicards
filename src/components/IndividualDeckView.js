import React from 'react';
import { StyleSheet, Text, View, Animated, Button, TextInput, KeyboardAvoidingView, } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DeckShell from './common/DeckShell';
import { clearLocalNotification, setLocalNotification, addCardToDeck } from '../../utils/api';

//class for the individual deck view once a user clicks a card from the list view
export default class IndividualDeckView extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    width: new Animated.Value(0),
    height: new Animated.Value(0),
    quizView: false,
    disableQuiz: false,
    score: 0,
    increment: false,
    quizFinished: false,
    addCard: false,
    question: '',
    answer: '',
    title: ''
  };

//the componentdidmount lifecycle method sets the animations
   componentDidMount() {

    this.setState({
      title: this.props.navigation.state.params.deck
    });
    const {opacity, width, height} = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    })
      .start();

    Animated.spring(width, {
      toValue: 350,
      speed: 5
    })
      .start();
   
    Animated.spring(height, {
      toValue: 450,
      speed: 5
    })
      .start();

  }

//method for rendering the add card view. Invoked when a user clicks 'add card'. method contains custom styles and returns a jsx keyboardavoidingview
  addCardView = () => {
    const styles = {
      inputStyle: {
        color: 'black',
        borderWidth: .5,
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 50,
        margin: 5,
        width: 300

      },

      containerStyle: {
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 325,
        paddingBottom: 30

      }
    }
    const keyboardVerticalOffset = 80;
    const {width} = this.state;
    return ( < KeyboardAvoidingView behavior="padding" style={ styles.containerStyle } keyboardVerticalOffset={ keyboardVerticalOffset }>
               < View>
                 < TextInput style={ styles.inputStyle }
                   label="Question"
                   placeholder="Question"
                   value={ this.state.question }
                   onChangeText={ text => this.setState({
                                    question: text
                                  }) }
                   underlineColorAndroid='transparent' />
              < /View>
               < View>
                  < TextInput style={ styles.inputStyle }
                    label="Answer"
                    placeholder="Answer"
                    value={ this.state.answer }
                    onChangeText={ text => this.setState({
                                     answer: text
                                  }) }
                    underlineColorAndroid='transparent' />
                < /View>
                < Text>
                   { this.state.error ? this.state.error : undefined }
                < /Text>
            < /KeyboardAvoidingView>


    )
  }


//method for a user to start the quiz. Sets the state so the quiz view displays
  startQuiz = () => {
    this.setState({
      quizView: true,
      quizFinished: false,
      score: 0
    });
  };


//nethod used for determining whether deck is eligible for a quiz and whether a user has finished the quiz
  cardCheck = (num, cardIndex) => {
    if (num === 0) {
      this.setState({
        disableQuiz: true
      });
    }
    if (cardIndex == num) {
      this.setState({
        quizFinished: true,
        quizView: false
      });
      clearLocalNotification()
        .then(setLocalNotification);
    }
  };

//method for marking a question and answer as correct to increase the users score
  onPressCorrect = () => {
    const {quizFinished} = this.state;
    if (!quizFinished) {
      this.setState({
        score: this.state.score + 1,
        increment: true
      });
    }
  };

//method for marking a question and answer as incorrect
  onPressIncorrect = () => {
    const {quizFinished} = this.state;
    if (!quizFinished) {
      this.setState({
        increment: true
      });
    }
  };

  //invokes the add card view

  addCard = (e) => {
    this.setState({
      addCard: true
    });
  };

//resets the user to initial deck view
  returnDeck = () => {
    this.setState({
      quizFinished: false,
      quizView: false
    });

  };
//method for a user to add  the new card to the deck
  onSubmit = () => {
    const {answer, question} = this.state;
    const {title} = this.state;
    const navigate = (deck) => {
      this.props.navigation.navigate('DeckList', {
        deck
      });
    };

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({
        routeName: 'DeckList'
      })],
    });

    this.props.navigation.dispatch(resetAction);
    if (answer && question) {

      addCardToDeck(title, {
        question,
        answer
      });
    } else {
      this.setState({
        error: 'Missing Required Field'
      });
    }
  };

//method which returns jsx buttons. Criteria for determining which buttons to render is determined by the component state
  renderButtons = () => {
    const styles = {
      buttonStyle: {
        marginRight: 10,
        marginLeft: 10,
        paddingRight: 10,
        paddingLeft: 10,
        width: 170
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }

    }
    const {buttonStyle, buttonContainer} = styles;
    const {disableQuiz, quizFinished, addCard, quizView} = this.state;

    if (!quizView && !addCard) {
      return ( < View style={ buttonContainer }>
                 { !quizFinished ? ( < View style={ styles.buttonStyle }>
                                       < Button title="Add Card" onPress={ () => this.addCard('Add Card') } color="#FF1493" />
                                       < /View>
                   ) : ( < View style={ styles.buttonStyle }>
                           < Button onPress={ this.returnDeck } title="Return To Deck" color="purple" />
                           < /View>
                   ) }
                 < View style={ styles.buttonStyle }>
                   < Button onPress={ this.startQuiz }
                     title={ !quizFinished ? "Start Quiz" : "Restart Quiz" }
                     color="black"
                     disabled={ disableQuiz } />
                   < /View>
                 < /View>
      )
    } else if (quizView && !addCard) {
      return ( < View style={ buttonContainer }>
                 < View style={ styles.buttonStyle }>
                   < Button onPress={ this.onPressCorrect } title="Correct" color="green" />
                  < /View>
                  < View style={ styles.buttonStyle }>
                    < Button onPress={ this.onPressIncorrect } title="Incorrect" color="red" />
                  < /View>
              < /View>
      )
    } else if (addCard) {
      return ( < View style={ buttonContainer }>
                 < View style={ styles.buttonStyle }>
                   < Button onPress={ this.onSubmit } title="Submit" color="black" />
                 < /View>
               < /View>
      )
    }
  }
//main render method which returns the jsx add card view or deckshell depending on state and the buttons
  render() {
    const {opacity, width, height, increment, quizFinished, score, addCard, quizView} = this.state;
    const {title} = this.state;
    return ( < Animated.View style={ { opacity, height } }>
               < View style={ { flex: 3 } }>
                 { addCard ? this.addCardView() :
                   < DeckShell title={ this.props.navigation.state.params.deck }
                     quizView={ quizView }
                     cardCheck={ this.cardCheck }
                     increment={ increment }
                     quizFinished={ quizFinished }
                     score={ score } /> }
               < /View>
                   { this.renderButtons() }
            < /Animated.View>
      );
  }
}