import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhHlNU3Zn2mb-g-SG78_1edzIBEAkHQSg",
  authDomain: "pokedex-37847.firebaseapp.com",
  projectId: "pokedex-37847",
  storageBucket: "pokedex-37847.appspot.com",
  messagingSenderId: "342742300798",
  appId: "1:342742300798:web:fc083b8cfd39e6a36a402f",
  measurementId: "G-FXXZR309RT"
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebaseDB = getFirestore(app);

const usersRef = collection(firebaseDB, 'users');
const pokemonListRef = collection(firebaseDB, 'pokemonList');

export {
  firebaseAuth, 
  firebaseDB,
  usersRef,
  pokemonListRef
}