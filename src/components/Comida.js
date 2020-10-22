import React, { Component } from 'react'

import '../assets/css/Comida.css'
import placeholder from '../assets/images/placeholder.jpg';

export default class Comida extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.nombre,
        }
    }

    render() {
        return (
            <div className="comida-container">
                <div className="comida-card u-clearfix">
                    <div className="comida-card__content">
                        <div className="comida-card__body">
                            <div className="card-body">
                                <span className="card-body__author card-body--subtitle">Daniel Albero</span>
                                <h2 className="card-body__title">{this.props.nombre}</h2>
                                <span className="card-body__description card-body--subtitle">{this.props.desc} </span>
                            </div>
                        </div>
                        <img src={placeholder} alt="" className="comida-card__img" />
                    </div>

                    <div className="comida-card__footer">
                        <div className="card-body__line">Recipe</div>
                        <span className="card-body__tag card-body--subtitle card-body__circle">{this.props.tipo}</span>
                    </div>
                </div>
                <div className="comida-card__shadow"></div>
            </div>
        );
    }
}