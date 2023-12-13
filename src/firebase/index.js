import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDQHps_Kcp1aaFEoptpcTl5qMSzvEqZOvE",
    authDomain: "fir-demo-b73ab.firebaseapp.com",
    projectId: "fir-demo-b73ab",
    storageBucket: "fir-demo-b73ab.appspot.com",
    messagingSenderId: "304538644925",
    appId: "1:304538644925:web:6fa7b331f37980388922d4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

export{firebase,db,auth,storage};