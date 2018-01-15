import React from 'react'
import {View, Text, AsyncStorage, TouchableOpacity} from 'react-native'


class DeckShell extends React.Component {

state = {
title: '',
questions: [],
questionNum: 0,
side: true
}

componentDidMount(){

AsyncStorage.getItem(this.props.title)
  .then(val => {
  	let item = JSON.parse(val)
  	this.props.cardCheck(item.questions.length)
  	this.setState({title: item.title,
  				   questions: item.questions})
	})
  .catch(err => console.log(err))

}

componentWillReceiveProps(nextProps){
	const {questions, questionNum, checkFinished} = this.state

	if (questions.length > 0){
		if (nextProps.score === 0){
			this.setState({
				questionNum: 0,
				side: true,
			})
		}

		if (!this.props.quizFinished && this.props.quizView){
			this.props.cardCheck(questions.length, questionNum + 1)
		}

		if (nextProps.increment && questionNum + 1 < questions.length){
			this.setState({questionNum: this.state.questionNum + 1})
			
		}

}
}

onPress = () =>{

	this.setState({question: !this.state.question,
				   side: !this.state.side})
}



render() {


const {questions, title, questionNum, question, side, quizComplete} = this.state
const {quizView} = this.props
const questionLength = questions.length
const cardSide = side ? 'question' : 'answer'

if (!this.state.questions){
	<Text> Loading </Text>
}


if (this.props.quizFinished){
	return(
	<View style={styles.containerStyle}> 
		<Text style={styles.titleStyle}>Quiz Finished</Text>
		<Text style={styles.countStyle}> Score : {this.props.score} /  {questionLength } </Text>
	</View> 

	)
}


	return (
	<View>
	{quizView ? <Text> {questionNum + 1} / {questionLength} </Text> : undefined}
		{ !quizView 
		?	<View style={styles.containerStyle}> 
			 <Text style={styles.titleStyle}>{title}</Text>
			<Text style={styles.countStyle}> {questions.length} Cards </Text>
			</View> 
		
		:	<View style={styles.containerStyle}> 
			
			 <Text style={styles.titleStyle}>{questions[questionNum][`${cardSide}`]}</Text>
			 <TouchableOpacity onPress={this.onPress}>
			 <Text>{!question ? 'Answer' : 'Question'}</Text>
			 </TouchableOpacity>
			</View> 
		}
	</View>
	)
}
}


const styles = {
	
	containerStyle:{
	borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 325
 	
  
   	 
	},
titleStyle:{
		fontWeight: 'bold',
		fontSize: 25,
		margin: 15
	},
	countStyle:{
		fontWeight: 'bold',
		fontSize: 17,
		opacity: 0.7
	}
}



export default DeckShell

