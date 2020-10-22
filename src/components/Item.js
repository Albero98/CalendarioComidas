import React, { Component } from 'react'
import db from '../firebase-config'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Row, Col, InputGroup, Fade, Modal,  } from 'react-bootstrap';


export default class Item extends Component {

    state = {
        items: [],
        inputValue: '',
        edit: false,
        id: '',
        fadein: false,
        message: '',
        tipoMensaje: '', 
        showModal: false, 
        idBorrar:''
    }

    componentDidMount() {
        db.collection('Item').onSnapshot((snapShots) => {
            this.setState({
                items: snapShots.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
    }

    changeValue = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };

    getItem = (id) => {
        let docRef = db.collection("Item").doc(id);

        docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    inputValue: doc.data().item,
                    edit: true,
                    id: doc.id
                })
            } else {
                console.log("El documento no existe")
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    editAction = () => {
        const { inputValue, edit } = this.state;

        if (edit === false) {
            db.collection('Item').add({
                item: inputValue
            }).then(() => {
                this.mostrarMessage('Agregado . . .')
            }).catch(() => {
                this.mostrarMessage('Error')
            })
        } else {
            this.update();
        }

    }

    update = () => {
        const { id, inputValue } = this.state;

        db.collection("Item").doc(id).update({
            item: inputValue
        }).then(() => {
            this.mostrarMessage('Actualizado . . .')
            this.setState({
                edit: false
            })
        }).catch((error) => {
            this.mostrarMessage('Error')
        })
    };

    mostrarMessage = (message) => {

        let tipoMensaje = 'm-3 text-left text-success'
        if (message === 'Eliminado . . .') {
            tipoMensaje = 'm-3 text-left text-danger'
        }
        this.setState({
            inputValue: '',
            fadein: true,
            message: message,
            tipoMensaje: tipoMensaje
        });
        
        setTimeout(() => {
            this.setState({
                fadein: false,
                message: ''
            })
        }, 2000);
    }

    modalDelete= (id) => {
        
        this.setState({
            showModal: true,
            idBorrar: id,
        });
    }

    cerrarModalDelete = () =>{
        this.setState({
            showModal: false
        })
    }

    deleteItem = (id) => {
        this.cerrarModalDelete();
        db.collection("Item").doc(id).delete().then(() => {
            this.mostrarMessage('Eliminado . . .')
        });
    };

    render() {
        const { items, inputValue } = this.state;
        return (
            <div>
                <Row>
                    <Col xs='10'>
                        <InputGroup>
                            <FormControl className="mb-3" placeholder="Agregar un nuevo item"
                                value={inputValue}
                                onChange={this.changeValue}
                            />
                        </InputGroup>
                    </Col>
                    <Col xs='2'>
                        <div>
                            <Button className='btn btn-secondary' onClick={this.editAction}>
                                {this.state.edit ? 'Editar' : 'Agregar'}
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Fade in={this.state.fadein} tag='h6' className={this.state.tipoMensaje}>
                    <div>
                        {this.state.message}
                    </div>
                </Fade>

                <Table hover className='text-center'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items !== undefined ? items.map((item, key) => (
                            <tr key={key}>
                                <td>{item.data.item}</td>
                                <td><Button className="btn btn-secondary" onClick={() => this.getItem(item.id)}>Editar</Button></td>
                                <td><Button className="btn btn-light" onClick={() => this.modalDelete(item.id)}>Eliminar</Button></td>
                            </tr>

                        )) : null}
                    </tbody>
                </Table>

                <Modal show={this.state.showModal} onHide={this.cerrarModalDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Borrar Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Estás seguro de querer borrar el item? No habrá vuelta atrás</Modal.Body>
                    <Modal.Footer>                        
                        <Button className="btn btn-danger"  onClick={() => this.deleteItem(this.state.idBorrar)}>
                            Borrar
                        </Button>
                        <Button className="btn btn-light" onClick={this.cerrarModalDelete}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}