// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC6bdbFKQRIn7OTEFHfs5RX3y-EpG8VY4c',
  authDomain: 'ipd-buddy.firebaseapp.com',
  projectId: 'ipd-buddy',
  storageBucket: 'ipd-buddy.firebasestorage.app',
  messagingSenderId: '1011233653697',
  appId: '1:1011233653697:web:c26046122499503075a540',
  measurementId: 'G-TVBXSJBSWM',
};

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export { firebaseApp }
// https://firebase.google.com/docs/web/setup#available-libraries
