import React, { Component } from 'react';
import db from '../firebase-config';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../assets/css/FormularioComidas.css';

import $ from 'jquery';


class FormularioComidas extends Component {

    state = {
        comidas: [],
        comidaGuardada: false,
        comida: '',
        cena: '',
    }

    componentDidMount() {
        db.collection('Comidas').onSnapshot((snapShots) => {
            this.setState({
                comidas: snapShots.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
    }

    getCurrentDate(separator = '/') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
    }

    getCurrentDateEvent(separator = ',') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month}${separator}${date}`
    }

    guardarComida = () => {
        let comidaSelected = $("#comidaForm option:selected").val();
        let cenaSelected = $("#cenaForm option:selected").val();

        db.collection('Eventos').add({
            nombre: cenaSelected,
            tipo: 'cena',
            fecha: this.getCurrentDateEvent()
        })

        db.collection('Eventos').add({
            nombre: comidaSelected,
            tipo: 'comida',
            fecha: this.getCurrentDateEvent()
        })

        this.setState({

            comidaGuardada: true,
            comida: comidaSelected,
            cena: cenaSelected,
        });

    }

    cancelarComida = () => {
        $(function () {
            $("#cenaForm select").val("DEFAULT");
            $("#comidaForm select").val("DEFAULT");
        });

    }

    render() {
        return (

            <div>

                {(() => {
                    if (this.state.comidaGuardada === false) {
                        return (
                            <div className="formContent">
                                <div className="formContent__encabezado">
                                    <div className="formContent__fechaActual text-right">
                                        <h3>{this.getCurrentDate()}</h3>

                                    </div>
                                </div>
                                <div className="formContent__body">

                                    <Form>
                                        <div className="formContent__input">
                                            <Form.Group id="comidaForm">
                                                <Form.Label className="titulo">Comida</Form.Label>
                                                <Form.Control as="select" defaultValue={'DEFAULT'}>
                                                    <option disabled value="DEFAULT"> - Selecciona una opción - </option>
                                                    {
                                                        this.state.comidas.map((comida) => (
                                                            <option value={comida.data.nombre}>
                                                                {comida.data.nombre}

                                                            </option>

                                                        ))
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="formContent__input">
                                            <Form.Group id="cenaForm">
                                                <Form.Label className="titulo">Cena</Form.Label>
                                                <Form.Control as="select" defaultValue={'DEFAULT'}>
                                                    <option disabled value="DEFAULT"> - Selecciona una opción - </option>
                                                    {
                                                        this.state.comidas.map((comida) => (
                                                            <option>
                                                                {comida.data.nombre}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="text-right">
                                            <Button className="btn btn-secondary m-2" onClick={this.guardarComida}>Guardar</Button>
                                            <Button className="btn btn-light m-2" onClick={this.cancelarComida}>Cancelar</Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="formContent">
                                <div className="formContent__encabezado">
                                    <div className="formContent__fechaActual text-right">
                                        <h3>{this.getCurrentDate()}</h3>

                                    </div>
                                </div>
                                <div className="formContent__body">
                                    <div>Esto ya estaria</div>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>


        );
    }
}

export default FormularioComidas;