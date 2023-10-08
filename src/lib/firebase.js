import firebase from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
	FIREBASE_API_KEY,
	FIREBASE_APP_ID,
	FIREBASE_DATABASE_URL,
	FIREBASE_MESSAGING_SENDER_ID
} from '$env/static/private';

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: 'moorchhana-71345.firebaseapp.com',
	databaseURL: FIREBASE_DATABASE_URL,
	projectId: 'moorchhana-71345',
	storageBucket: 'moorchhana-71345.appspot.com',
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);

export const db = getDatabase(app);
