import React from 'react'
import {View, Text} from 'react-native'

const Card = (props) =>{

	const {title, length} = props
	return (
		<View style={styles.containerStyle}> 
		<Text style={styles.titleStyle}>  {title} </Text>
		<Text style={styles.countStyle}>  {length} cards </Text>
		</View> 
	)
}


const styles = {
	containerStyle:{
		borderBottomWidth: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		height: 100,
		justifyContent: 'center',
        alignItems: 'center',
	},
	titleStyle:{
		fontWeight: 'bold',
		fontSize: 25
	},
	countStyle:{
		fontWeight: 'bold',
		fontSize: 17,
		opacity: 0.7
	}
}
export default Card