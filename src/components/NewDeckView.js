import React from 'react';
import { StyleSheet, Text, View, TextInput, 
	KeyboardAvoidingView, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'
import {saveDeckTitle} from '../../utils/api'

export default class NewDeckView extends React.Component {

state ={
	deck: ''
}

componentDidMount(){
	console.log(this.props.navigation)
}

 onSubmit = () => {
 	const {deck} = this.state
 	// const resetAction = NavigationActions.reset({
  //     index: 0,
  //     actions: [
  //  		 NavigationActions.navigate({
  //       routeName: 'DeckList'
  //     }),
  //       NavigationActions.navigate({ routeName: 'DeckView', params: { deck} }),  
  //     ],
  //     key: null
  //   });


  const resetAction = NavigationActions.navigate({
  	routeName: 'DeckList',
  	
  	action: NavigationActions.reset({
  		index: 1,

      actions: [
      	NavigationActions.navigate({routeName: 'DeckList'}),
   		NavigationActions.navigate({routeName: 'DeckView',params: {deck}}),
       
     ],
      key: null
  	})
    
    });


 	saveDeckTitle(deck)
 	.then(this.props.navigation.dispatch(resetAction))

  }


  render() {





    const styles = {
      inputStyle: {
     
        borderWidth: .5,
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 5,
        height: 50,
        margin: 5,
        width: 300

      },

      containerStyle: {
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        padding: 50

      },
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
      },
      textStyle: {
      	height: 200,
      	alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      }

    }
    const keyboardVerticalOffset = 0
    const {inputStyle, containerStyle, buttonContainer, buttonStyle, textStyle} = styles
    return (
      < KeyboardAvoidingView behavior="position" style={ containerStyle } keyboardVerticalOffset={ keyboardVerticalOffset }>
            <View style={textStyle}>
            	<Text style={{fontSize: 25, 
            		fontWeight: 'bold',
            		textAlign: 'center'}}> What is the title of your new deck? </Text>
            </View>
            <View >
              < TextInput style={ inputStyle }
                          
                          placeholder="Deck Title"
                          value={ this.state.deck }
                          onChangeText={ text => this.setState({
                                           deck : text
                                         }) }
                          underlineColorAndroid='transparent' 
              	/>
              </View> 	
                < View style={ buttonContainer }>
                  < View style={ buttonStyle }>
                    < Button onPress={ this.onSubmit } title="Submit" color="black" />
                    < /View>
                < /View>
       < /KeyboardAvoidingView>

      );
  }
}

