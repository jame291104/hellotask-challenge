import { addDoc, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { app, auth, db } from "../Firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";

export const createTask = async ({newTask}) => {
    try {
        await updateDoc(doc(db,"Todos", newTask.idUser), {
            item: arrayUnion(
               {
                   id: newTask.idTask,
                   name: newTask.taskName,
                   state: newTask.stateTask,
                   dateLimit: newTask.taskDate,
                   dateCreated: newTask.taskDateCreated 
               }
            )
        })

    } catch (error) {
        
    }
}

export const createDocument = async (idUser) => {
    try {
           console.log(idUser)
            await setDoc(doc(db,"Todos", idUser),{item: []})

    } catch (error) {
        
    }
}