import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import logo from '../assets/images/icono.png';


class NavbarPrincipal extends Component{

    render(){
       return(
            <Navbar fixed="top" bg="light" expand="lg">
                <Navbar.Brand className="navbar__logo" href="/"><img className="navbar__img" src={logo} alt="Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/Calendario">Calendario</Nav.Link>
                        <NavDropdown title="Comidas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/NuevaComida">Nueva Comida</NavDropdown.Item>
                            <NavDropdown.Item href="/Comidas">Comidas</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/Items">Item</Nav.Link>
                        <Nav.Link href="#link">Estadisticas</Nav.Link>
                    </Nav>
                   
                </Navbar.Collapse>
            </Navbar>
        ); 
    }
    
}

export default NavbarPrincipal;