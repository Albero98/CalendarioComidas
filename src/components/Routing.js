import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home'
import Item from '../pages/Items'
import NotFound from '../pages/NotFound'
import NavbarPrincipal from './NavbarPrincipal';
import Calendario from '../pages/Calendario';
import Comidas from '../pages/Comidas';
import NuevaComida from '../pages/NuevaComida';

function Routing() {

    return (
        <BrowserRouter>
            <div>
                <NavbarPrincipal />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Calendario" component={Calendario} />
                    <Route exact path="/Items" component={Item} />
                    <Route exact path="/Comidas" component={Comidas} />
                    <Route exact path="/NuevaComida" component={NuevaComida} />
                    <Route path="*" component={NotFound} />
                </Switch>

            </div>
        </BrowserRouter>

    )
}

export default Routing