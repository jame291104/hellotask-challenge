import {useEffect, useState} from 'react'
import "./routes_styles/dashboard.css"
import { signOut } from "firebase/auth";
import { auth, insertNewTask } from '../Firebase/firebase'; 
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import {v4 as uuidv4} from "uuid";
import { TaskObject } from '../Model/task';
import { createTask } from '../Services/task_services';



export const Dashboard = ({user, setUser}) => {
    
    const getDate = Date.now()
    const [taskName, setTaskName] = useState("")
    const [date, setDate] = useState(null)
    const [taskList, setTaskList] = useState([])

   
    //
     const handleOnSubmit = (e) => {
        e.preventDefault();
     }

     // Catching the name of task

     const handleOnChangeName = (e) => {
        const value = e.target.value;
        setTaskName(value);
     }

     // Adding a task

     const addTask = () => {
        if (taskName !== "" && date !== null) {
            const newTask = new TaskObject(
                user.uid,
                uuidv4(),
                taskName,
                date,
                Date.now(),
                false
            ); 
            
            createTask({newTask: newTask})

            /*const res = insertNewTask(newTask)
            newTask.docId = res.id;*/
            setTaskName('');
            setDate(null);
            setTaskList([newTask, ...taskList])
            /*setTasks((newTask) => {
               //tasks: [newTask, ...tasks]

            })*/
           
            console.log(newTask.idTask)
        }
       
     }
      
     useEffect(() => {
        console.log(taskList);
      }, [taskList]);
      
     // Catching the date of Task

     const handleOnChangeDate = (e) => {
        const value = e.target.value;
        setDate(value);
         //addDate()
        console.log(value)
     }

   const handleSignOut = () => {
        signOut(auth)
        .then(()=>{
         setUser(null)
        }).catch ((error) =>{

            Toastify({

                text: "No se pudo cerrar sesión, intenta de nuevo",
                style: {
                  background: "red"
                },
                duration: 3000
                
                }).showToast();
        })
   }
  return (
    <main>
        <header>
          <div className='panel_control'>
              <DropdownButton id="dropdown-basic-button" title={user.email}>
               <Dropdown.Item href="#/action-1">Pendientes</Dropdown.Item>
               <Dropdown.Item href="#/action-2"></Dropdown.Item>
               <Dropdown.Item href="#/action-3" onClick={handleSignOut}>Cerrar Sesión</Dropdown.Item>
              </DropdownButton>
         </div>
        </header>
        <section>
           <article className="form">
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nombre de la tarea</Form.Label>
                <Form.Control type="text" placeholder="" onChange={handleOnChangeName} />
                <Form.Label>Fecha de cumplimiento</Form.Label>
                <Form.Control type="date" placeholder="" onChange={handleOnChangeDate} />
              </Form.Group>
              <Button onClick={addTask} variant="primary">Guardar</Button>
            </Form>
           </article>
        </section>
    </main>
  )
}
