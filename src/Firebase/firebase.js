import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore, collection, addDoc, getDocs, getDoc, query, where, setDoc, deleteDoc} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCRVOudn30I6Ux6DxdvSlM_jZc8fb5Y0cw",
  authDomain: "pruebaserver-d1d7c.firebaseapp.com",
  projectId: "pruebaserver-d1d7c",
  storageBucket: "pruebaserver-d1d7c.appspot.com",
  messagingSenderId: "508431934271",
  appId: "1:508431934271:web:de139f355d42a29cb3a98a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
/*export async function insertNewTask(Task){
  try {
    const docRef = collection(db, 'tasks');
    const res = await addDoc(docRef, task)
  } catch (error) {
    console.error(error);
  }
}*/
