import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyACOVQiWXQY0QgxLuWJiDD2HpAjSa3JX8g',
	authDomain: 'linkedin-clone-49992.firebaseapp.com',
	projectId: 'linkedin-clone-49992',
	storageBucket: 'linkedin-clone-49992.appspot.com',
	messagingSenderId: '438223018291',
	appId: '1:438223018291:web:04094e0f2c0c090557c646',
	measurementId: 'G-7069C3HQC8',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
