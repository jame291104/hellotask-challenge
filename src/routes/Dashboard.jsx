import { useEffect, useState } from 'react'
import { PopUp } from "../Components/PopUp";
import "./routes_styles/dashboard.css"
import { signOut } from "firebase/auth";
import { auth, insertNewTask } from '../Firebase/firebase';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { v4 as uuidv4 } from "uuid";
import { TaskObject } from '../Model/task';
import { createTask, deleteDocument, getTask } from '../Services/task_services';
import { async } from 'q';
import Modal from 'react-bootstrap/Modal';



export const Dashboard = ({ user, setUser }) => {

    const getDate = Date.now()
    const [taskName, setTaskName] = useState("");
    const [date, setDate] = useState(null);
    const [newDate, setNewDate] = useState(null);
    const [taskList, setTaskList] = useState([]);
    const [newTaskName, setNewTaskName] = useState("");
    const [index, setIndex] = useState(null);
    const [state, setState] = useState(false);
    // const [update, setUpdate] = useState("");
    //const [additionalValue, setAdditionalValue] = useState('');


    //Modal states from bootstrap
    const [show, setShow] = useState(false);


    useEffect(() => {
        gettingTask()
    }, [])


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

            const isCreated = createTask({ newTask: newTask })
            if (isCreated) {
                setTaskName('');
                setDate(null);
                setTaskList([newTask, ...taskList])
                console.log("se creó")
            } else {
                Toastify({

                    text: "Ocurrió agregando la tarea",
                    style: {
                        background: "red"
                    },
                    duration: 3000

                }).showToast();

            }
        }
    }
    useEffect(() => {

        console.log(taskList);
    }, [taskList])


    // getting all the tasks

    const gettingTask = async () => {
        const fetchTask = await getTask(user.uid);
        console.log(fetchTask)
        setTaskList(fetchTask);
    }
    // Catching the date of Task

    const handleOnChangeDate = (e) => {
        const value = e.target.value;
        setDate(value);
        //addDate()
        console.log(value)
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
            }).catch((error) => {

                Toastify({

                    text: "No se pudo cerrar sesión, intenta de nuevo",
                    style: {
                        background: "red"
                    },
                    duration: 3000

                }).showToast();
            })
    }

    const deleteTask = async (item, index) => {

        const isDeleted = await deleteDocument(item);
        console.log(index);

        if (isDeleted) {
            const listTemp = taskList
            listTemp.splice(index, 1);
            console.log(listTemp)
            setTaskList(taskList.filter((item, indexItem) => indexItem !== index));


        }
        else {
            Toastify({

                text: "No se pudo eliminar, intenta otra vez",
                style: {
                    background: "red"
                },
                duration: 3000

            }).showToast();
        }
    }
    
    const modifiedTask = () => {
        console.log(index);
        const temporalList = [...taskList]
        temporalList[index] = new TaskObject(
            user.uid,
            temporalList[index].idTask,
            temporalList[index].taskName === "" ? temporalList[index].taskName : newTaskName,
            temporalList[index].taskDate === null ? temporalList[index].taskDate : newDate,
            temporalList[index].taskDateCreated,
            temporalList[index].stateTask === false ? temporalList[index].stateTask : state
        )
        
        setTaskList(temporalList);
        handleClose();
        //console.log(listTemp);
    }
    

    const handleIndex = (index) => {
        setIndex(index)
            modifiedTask()

        
        
    }
    
    const handleNewName = (e) => {
        setNewTaskName(e.target.value)
        //setTaskName(update);
        //console.log(taskName);
    }

    const handleNewDate = (e) => {
        const value = e.target.value;
        setNewDate(value)
        console.log(date);
    }
    //Bootstrap Modal Functions
    const handleClose = () => {
        setNewTaskName("");
        setNewDate(null);
        setState(false);
         setShow(false);
    }
    const handleShow = (list, index) => {
         setNewTaskName(list.taskName);
         setNewDate(list.taskDate);
         setIndex(index)
         console.log(list)
         setShow(true);
    
    };
    return (
        <main>
            <header>
                <div className='panel_control'>
                    <DropdownButton id="dropdown-basic-button" title={user.email}>
                        <Dropdown.Item href="#">Pendientes</Dropdown.Item>
                        <Dropdown.Item href="#"></Dropdown.Item>
                        <Dropdown.Item href="#" onClick={handleSignOut}>Cerrar Sesión</Dropdown.Item>
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
                <article className='all-tasks'>
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha límite</th>
                                    <th>Estado</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    taskList.map((list, index) => (
                                        <tr key={list.idTask}>
                                            <td>{list.taskName}</td>
                                            <td>{list.taskDate}</td>
                                            <td>{list.stateTask ? "Completada" : "Pendiente"}</td>
                                            <td>
                                                <Button onClick={() => handleIndex(index)} variant="success" ><i className="bi bi-check-circle-fill"></i></Button>
                                                <Button onClick={() => deleteTask(list, index)} variant="danger" className='mx-2'><i className="bi bi-trash-fill"></i></Button>
                                                <Button variant="primary" onClick={() => handleShow(list, index)}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                                
                            </tbody>
                        </Table>
                    </div>
                    <PopUp 
                    initialState = {show} 
                    handleClose = {handleClose} 
                    handleNewName = {handleNewName} 
                    handleNewDate = {handleNewDate} 
                    modifiedTask = {modifiedTask} 
                    newTaskName = {newTaskName} 
                    newDate = {newDate}
                    />
                </article>
            </section>
        </main>
    )
}
