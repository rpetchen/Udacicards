import React from 'react'
import {Text, ScrollView} from 'react-native'
import axios from 'axios'
import AlbumDetail from './AlbumDetails'

class AlbumList extends React.Component{

state = { albums: []}

componentWillMount(){
	axios.get('https://rallycoding.herokuapp.com/api/music_albums')
	 .then(response => {
	 	
	 	this.setState({albums: response.data})
	})
}



render(){	
	return(
		<ScrollView>
			{ this.state.albums.map(album => <AlbumDetail key={album.title} album={album}/>)}
		</ScrollView>
	)
 }
}

export default AlbumList