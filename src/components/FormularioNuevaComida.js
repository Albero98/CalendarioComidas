import React, { Component } from 'react';
import db from '../firebase-config';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { SketchPicker } from 'react-color';
import '../assets/css/FormularioComidas.css';

import $ from 'jquery';


class FormularioNuevaComida extends Component {

    state = {
        comidas: [],
        grupos: [],
        comidaGuardada: false,
        comida: '',
        cena: '',
    }

    componentDidMount() {
        db.collection('GruposAlimenticios').onSnapshot((snapShots) => {
            this.setState({
                grupos: snapShots.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
    }

    guardarNuevaComida = () => {
        let nuevaComida = $("#nuevaComidaForm input").val();
        let tipo = $('#radioTipoForm input[name="formHorizontalRadios"]').val();
        let grupoSelected = $("#grupoAlimenticioForm select").val();
        let descripcionNuevaComida = $("#descripcionNuevaComidaForm textarea").val();

        db.collection('Comidas').add({
            nombre: nuevaComida,
            tipo: tipo,
            grupo: grupoSelected,
            desc: descripcionNuevaComida
        })

        this.cancelarNuevaComida();
    }

    cancelarNuevaComida = () => {
        $(function () {
            $("#nuevaComidaForm input").val("");
            $('#radioTipoForm input[name="formHorizontalRadios"]').prop('checked', false);
            $("#grupoAlimenticioForm select").val("DEFAULT");
            $("#descripcionNuevaComidaForm textarea").val("");
        });
    }

    render() {
        return (

            <div className="formContent">
                <div className="formContent__encabezado">
                    <div className="formContent__fechaActual text-right">
                        <h3>Nueva Comida</h3>
                    </div>
                </div>
                <div className="formContent__body">

                    <Form>
                        <Form.Group id="nuevaComidaForm">
                            <Form.Label className="titulo">Nombre</Form.Label>
                            <Form.Control as="input" placeholder="Escribe una nueva comida . . ." />
                        </Form.Group>
                        <Form.Group id="radioTipoForm">
                            <Form.Label className="titulo">Tipo</Form.Label>
                            <Row>
                                <Form.Check
                                    className="mx-4"
                                    type="radio"
                                    label="Comida"
                                    name="formHorizontalRadios"
                                    value="CO"
                                    id="tipoComida"
                                />
                                <Form.Check
                                    className="mx-4"
                                    type="radio"
                                    label="Cena"
                                    name="formHorizontalRadios"
                                    value="CE"
                                    id="tipoComida"
                                />
                                 <Form.Check
                                    className="mx-4"
                                    type="radio"
                                    label="Ambos"
                                    name="formHorizontalRadios"
                                    value="A"
                                    id="tipoComida"
                                />
                            </Row>
                        </Form.Group>
                        <Form.Group id="grupoAlimenticioForm">
                            <Form.Label className="titulo">Grupo Alimenticio</Form.Label>
                            <Form.Control as="select" defaultValue={'DEFAULT'}>
                                <option disabled value="DEFAULT"> - Selecciona una opción - </option>
                                {
                                    this.state.grupos.map((grupo) => (
                                        <option>
                                            {grupo.data.nombre}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group id="descripcionNuevaComidaForm">
                            <Form.Label className="titulo">Descripción</Form.Label>
                            <Form.Control as="textarea" rows="3" maxLength="160" />
                        </Form.Group>
                        {/* <Form.Group controlId="exampleForm.ControlColor">
                            <Form.Label>Color</Form.Label>
                            <SketchPicker />
                        </Form.Group> */}
                        <div className="text-right">
                            <Button className="btn btn-secondary m-2" onClick={this.guardarNuevaComida}>Guardar</Button>
                            <Button className="btn btn-light m-2" onClick={this.cancelarNuevaComida}>Cancelar</Button>
                        </div>
                    </Form>
                </div>

            </div>
        )
    }
}

export default FormularioNuevaComida;