export const GET_DECKS = 'get_decks'
export const GET_SINGLE_DECK = 'get_single_deck'

export function getDecks(){
	return{
		type: GET_DECKS
	}
}

export function getSingleDeck(title){
	return {
		type: GET_SINGLE_DECK,
		payload: title
	}
}