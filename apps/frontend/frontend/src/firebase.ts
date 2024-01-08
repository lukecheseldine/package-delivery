// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBElgpM3wEQ51JGnMpzmVHmOiGU9Z0erpg',
	authDomain: 'package-watch-85a1c.firebaseapp.com',
	projectId: 'package-watch-85a1c',
	storageBucket: 'package-watch-85a1c.appspot.com',
	messagingSenderId: '1011894660789',
	appId: '1:1011894660789:web:180d3656b316d4dc7158fc',
	measurementId: 'G-T8JX8LE29H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
