import React from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import DeckShell from './common/DeckShell'


export default class IndividualDeckView extends React.Component {
	state = {
		opacity: new Animated.Value(0),
		width: new Animated.Value(0),
		height: new Animated.Value(0),
		quizView: false,
		disableQuiz: false,
		score: 0,
		increment: false,
		quizFinished: false
	}


	componentDidMount(){

		const {opacity, width, height} = this.state

		Animated.timing(opacity, {toValue: 1, duration: 1000})
		.start()

		Animated.spring(width, {toValue: 350, speed: 5})
		.start()

		Animated.spring(height, {toValue: 450, speed: 5})
		.start()


	}


	startQuiz=()=>{
		this.setState({quizView: true,
						quizFinished: false,
						score: 0})
	}

	cardCheck = (num, cardIndex) =>{
	 if (num === 0){
	 	this.setState({disableQuiz: true})
	 }
	 if (cardIndex == num){
	 	this.setState({quizFinished : true,
	 				   quizView: false})
	 }
}

	onPressCorrect = () =>{
		const {quizFinished} = this.state
		if (!quizFinished){
		this.setState({score: this.state.score + 1,
					   increment: true})
	}
		
	}

	onPressIncorrect = () =>{
		

	}

	renderButtons=()=>{
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
		const {buttonStyle, buttonContainer} = styles
		const {disableQuiz, quizFinished} = this.state

		if (!this.state.quizView){
		return (
			<View style = {buttonContainer}>
			{!quizFinished ? (
				<View style = {styles.buttonStyle}>  			
     			<Button
     			title = "Add Card"
     			onPress={()=> this.onPress('Add Card')}
     			color="#FF1493"
     			/>
     			</View>
     			) : (
     			<View style = {styles.buttonStyle}>  			
     			<Button
     			onPress={()=>{console.log('test')}}
     			title = "Return To Deck"
     			color="purple"
     			disabled = {disableQuiz}
     			/>
     			</View>
     			)}

     			<View style = {styles.buttonStyle}>  			
     			<Button
     			onPress={this.startQuiz}
     			title = "Start Quiz"
     			color="black"
     			disabled = {disableQuiz}
     			/>
     			</View>
     			
     		</View>
			)
		}
		else {
			return(
			<View style = {buttonContainer}>
				<View style = {styles.buttonStyle}>  			
     			<Button
     			onPress={this.onPressCorrect}
     			title = "Correct"
     			color="green"
     			/>
     			</View>

     			<View style = {styles.buttonStyle}>  			
     			<Button
     			onPress={this.onPressIncorrect}
     			title = "Incorrect"
     			color="red"
     			/>
     			</View>
     		</View>
			)
		}
	}

  render() {
  	const {opacity, width, height, increment, quizFinished, score} = this.state
  	const {quizView} = this.state
    return (
     <Animated.View  style={{opacity, height}}>
     <View style = {{flex: 3}}>
     <DeckShell 
     title={this.props.navigation.state.params.deck} 
     quizView={quizView}
     cardCheck={this.cardCheck}
     increment = {increment}
     quizFinished = {quizFinished}
     score = {score}
      />
     </View>
    
  		{this.renderButtons()}

  
     </Animated.View>
    );
  }
}


