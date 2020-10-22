import React from 'react';

//Importar Componentes
import FormularioNuevaComida from '../components/FormularioNuevaComida'
import banner from '../assets/images/bannerLateral.jpg'


function NuevaComida() {

  return (
    <div>

    <section>
      <FormularioNuevaComida />
     {/*  <img src={banner} alt="" /> */}
    </section>
    
    </div>
  );
}

export default NuevaComida;