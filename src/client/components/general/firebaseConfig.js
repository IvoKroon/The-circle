import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBoa4lh5pWroPuxs3gnbPq97gSJtHZtqOE',
  authDomain: 'circle-2252a.firebaseapp.com',
  databaseURL: 'https://circle-2252a.firebaseio.com',
  projectId: 'circle-2252a',
  storageBucket: 'circle-2252a.appspot.com',
  messagingSenderId: '288139384856',
};
firebase.initializeApp(config);

export default firebase;
