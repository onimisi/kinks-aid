import firebase from 'firebase';
import * as firebaseConfig from './config.json';
const firebaseConfigured = firebase.initializeApp(firebaseConfig);
export default firebaseConfigured;