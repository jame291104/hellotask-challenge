import React, { useState } from 'react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { auth } from "../Firebase/firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { createDocument } from '../Services/task_services'

export const LoginView = (props) => {

  const [register, setRegister] = useState(false)

  const createSubmit = (e) => {
     e.preventDefault();
     const email = e.target.email.value;
     const password = e.target.password.value;

     console.log(email, password);

    //  Creating User 

    createUserWithEmailAndPassword(auth,email, password)
     .then((userCreated) => {
       console.log("Usuario Creado:", userCreated) 
       props.setUser(userCreated.user)
       
       createDocument(userCreated.user.uid)


     }).catch((error) => {

      //Catching Server Errors
      const errorCode = error.code
      let textError = "Ups, Algo salio mal"
      console.log(errorCode)
      switch (errorCode) {
       
       case "auth/user-not-found":
         textError = "El usuario no existe, crea una cuenta"
         break;
       
         case "auth/wrong-password":
           textError = "La contraseña no es valida, intenta de nuevo"
           break;

         case "auth/too-many-requests":
           textError = "Demasiados intentos, intenta mas tarde"
           break;

         case "auth/invalid-email":
           textError = "Intenta con un correo válido"
           break;
          

      }
      Toastify({

       text: textError,
       style: {
         background: "red"
       },
       duration: 3000
       
       }).showToast();
      
   }) 
    
     
  }
 
  const signSubmit= (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);


    // Singin 

   signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      
      console.log("Usuario Logueado:", userCredential.user) 
      props.setUser(userCredential.user)
      
    }).catch((error) => {

       //Catching Server Errors
       const errorCode = error.code
       let textError = "Ups, Algo salio mal"
       console.log(errorCode)
       switch (errorCode) {
        
        case "auth/user-not-found":
          textError = "El usuario no existe, crea una cuenta"
          break;
        
          case "auth/wrong-password":
            textError = "La contraseña no es valida, intenta de nuevo"
            break;
          case "auth/too-many-requests":
            textError = "Demasiados intentos, intenta mas tarde"
            break;
          case "auth/invalid-email":
            textError = "Intenta con un correo válido"
            break;
            
       }
       Toastify({

        text: textError,
        style: {
          background: "red"
        },
        duration: 3000
        
        }).showToast();
       
    }) 

  }

    
  return (
    <main>
      <section>
        <div>
          <h1>{register ? "Registrate" : "Inicia sesión" }</h1>
           <form onSubmit={register ? createSubmit : signSubmit}>
            <label htmlFor="email">Correo</label>
             <input type="email" id="email" placeholder='hello@task.com' />
            <label htmlFor="password">Contraseña</label>
             <input type="password" id='password' placeholder='Ingresa tu contraseña'/>
             <button>{register ? "Registrate" : "Iniciar sesión" }</button>
           </form>
           <button onClick={() => setRegister(!register)}>
              {register ? "Inicia sesión" : "Crear cuenta" }
           </button>
        </div>
      </section>
    </main>
  )
}
