
const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },

  NewDeck: {
    title: 'new deck',
    questions: [
     
    ]
  },
  CivilWar:{
    title: 'Civil War',
    questions:[
      {
        question: 'What were the dates of the battle of Gettysburg?',
        answer: 'July 1 - July 3 1863'
      }

    ]
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DECKS':
      return state;
    default:
      return state;
  }
};
