import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PopUp = ({initialState, handleClose, handleNewName, handleNewDate, modifiedTask, newTaskName, newDate}) => {


    //const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    
    return (
        <div>
            <Modal show={initialState} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cocinar"
                                autoFocus
                                value={newTaskName}
                                onChange={handleNewName}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Fecha limite</Form.Label>
                            <Form.Control
                                type='date'
                                value={newDate}
                                onChange={handleNewDate} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={modifiedTask}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
