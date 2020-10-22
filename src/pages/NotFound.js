import React from 'react';
import '../assets/css/NotFound.css';
import Button from 'react-bootstrap/Button'

class NotFoundPage extends React.Component {
  
 
  render() { 
    return <div>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404"></div>
          <h1>404</h1>
          <h2>Oops! Página No Encontrada</h2>
          <p>Lo sentimos, pero la pagina que buscas no existe, ha sido borrada, cambiada de nombre o no está disponible temporalmente</p>
          <Button className="btn btn-secondary"><a href="/">Volver a Inicio</a></Button>
        </div>
      </div>

    </div>
  }
}
export default NotFoundPage;