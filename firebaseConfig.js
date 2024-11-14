import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCpEB9bfgQr1Z3RDlnzlPmKnRiHdMU_Yxo',
  authDomain: 'gpvdirectmsg.firebaseapp.com',
  projectId: 'gpvdirectmsg',
  storageBucket: 'gpvdirectmsg.firebasestorage.app',
  messagingSenderId: '1024252667713',
  appId: '1:1024252667713:web:8408fe8aab79e2eb32a3c0',
  measurementId: 'G-5LXENCKLGG'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };