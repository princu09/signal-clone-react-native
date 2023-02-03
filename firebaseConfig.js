import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCBh2-z4FXltfYtHyfRHyglUKbGpWJilSc',
  authDomain: 'signal-b9fad.firebaseapp.com',
  projectId: 'signal-b9fad',
  storageBucket: 'signal-b9fad.appspot.com',
  messagingSenderId: '583969510404',
  appId: '1:583969510404:web:73e2caf59cce32f99a9151',
  measurementId: 'G-RNCKHDDML1',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// let app;

// if (firebase.apps.length == 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const db = firebaseApp;
// const auth = firebase.auth();

export {db, auth};
