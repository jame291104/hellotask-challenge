import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { Dashboard } from './Dashboard';
import { LoginView } from './LoginView';

export const ToAccess = () => {

  const [user, setUser] = useState(null)

     useEffect(() => {
      onAuthStateChanged(auth, (user) => {

        if (user) {
          setUser(user);
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // ...
        } else {
          // User is signed out
          // ...
        }});

     }, [])
     
    
  return (
    <>
     {user ? <Dashboard user = {user} setUser = {setUser} /> : <LoginView setUser = {setUser}/>}
     
    </>
  )
}
