import React from 'react';
import db from '../firebase-config';

//Importar Componentes
import Comida from '../components/Comida'

/* function getComidas() {
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

function Comidas() {
  /* { let comidas = getComidas() } 
  return (

    <section className="section--flex">
      {/* {
       this.comidas.map((comida) => (
          <Comida nombre={comida.data.nombre} />
        ))
      } 

      <Comida />
      <Comida />
      <Comida />
      <Comida />
      <Comida />
      <Comida />

    </section>

  ); 
}*/


class Comidas extends React.Component {

  state = {
    comidas: [],
    comidas0: [],
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

  render() {
    return (
      <section className="section--flex">
        {
          this.state.comidas.map((comida) => (
            <Comida nombre={comida.data.nombre} desc={comida.data.desc} tipo={comida.data.tipo} />
          ))
        }
      </section>

    )
  }
}

export default Comidas;