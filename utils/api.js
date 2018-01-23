import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import data from './decks.json'

const deckKey = Object.keys(data)

export const NOTIFICATION_KEY = 'UdaciCard:notifications'

const dummydata = true
//function to set dummy data if not already set
export function setDummyData() {

  let int = ''

  return new Promise(resolve => {
    if (dummydata) {
      deckKey.forEach((d) => {
        AsyncStorage.setItem(d, JSON.stringify(data[d]))
          .then(int = deckKey.indexOf(d))

      })
      dummydata = false
      int - 1 >= deckKey.length ? resolve('resolved') : undefined
    }

    if (!dummydata) {
      resolve('resolved')
    }
  })
}

//function to add card to deck. takes the deck title, new card object of question and answer as parameters. 
export function addCardToDeck(title, card, callback) {
  AsyncStorage.getItem(title)
    .then((value) => {
      let d = JSON.parse(value)
      AsyncStorage.setItem(title, JSON.stringify({
        ...d,
        questions: [
          ...d.questions,
          card
        ]
      }))

    })
}

//function to get all decks in storage and pass the key and data in a callback
export function getDecks(callback) {
  AsyncStorage.getAllKeys()
    .then(data => {

      return data.map(d => {

        return AsyncStorage.getItem(d, (error, value) => {

          callback(d, value)
        })
      })
    })
}
//allows a user to create a new deck by creating a new object with the title of the new deck as the key
export function saveDeckTitle(title){
const newDeck = {
  "title" : title,
  questions: []
}
return new Promise(resolve => {
AsyncStorage.setItem(title, JSON.stringify(newDeck))
.then(resolve('resolved'))
})
}

//clear local notifications if quiz has been taken for the day
export function clearLocalNotification() {

  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

//function which returns an object of the notification data
function createNotification() {
  return {
    title: 'Take a quiz!',
    body: "don't forget to take a quiz",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

//function to set local notification. 
export function setLocalNotification() {

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
//if no notification is set the system shall set the notificaiton for the next day
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {

            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(19)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}