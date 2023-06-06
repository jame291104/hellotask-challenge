import { addDoc, arrayRemove, arrayUnion, deleteDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { app, auth, db } from "../Firebase/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { async } from "q";
import { TaskObject } from "../Model/task";

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
            return true;
    } catch (error) {
        return false
    }
}

export const deleteDocument = async (task) => {
    try {
        
        await updateDoc(doc(db,"Todos", task.idUser), {
            item: arrayRemove(
               {
                   id: task.idTask,
                   name: task.taskName,
                   state: task.stateTask,
                   dateLimit: task.taskDate,
                   dateCreated: task.taskDateCreated
               }
            )

        })
        return true
        
    } catch (error) {
        return false
    }
}

export const getTask = async (idUser) => {
    const docRef = doc(db,"Todos", idUser );
    const docSnap = await getDoc(docRef);
       
    if (docSnap.exists()) {
        const {item} = docSnap.data();
        console.log(item)
       return item.map((task) => {
            return new TaskObject (idUser, task["id"],task["name"], task["dateLimit"], task["dateCreated"], task["state"]);
        })
        

      } else {
        // docSnap.data() will be undefined in this case
        //console.log("No such document!");
        return []
      }
}