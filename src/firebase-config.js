import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDlChwLqbIeWQYu9SuZWGjEQDWtEwfAZq0",
    authDomain: "dbcalendariocomidas.firebaseapp.com",
    projectId: "dbcalendariocomidas",
})

let db = firebase.firestore();

export default db;

