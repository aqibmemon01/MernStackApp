import * as firebase from 'firebase';

var Config={
    apiKey: "AIzaSyApvQ4fcwY34PqI7AXq0C-r6NEoKW3cqoA",
    authDomain: "alhabibtwist.firebaseapp.com",
    databaseURL: "https://alhabibtwist.firebaseio.com",
    projectId: "alhabibtwist",
    storageBucket: "alhabibtwist.appspot.com",
    messagingSenderId: "581449356652",
    appId: "1:581449356652:web:0a652805441e290ba60f49",
    measurementId: "G-9X5GGJ20XC"
};

var fire = firebase.initializeApp(Config);

export default fire;