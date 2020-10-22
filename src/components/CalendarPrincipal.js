import React, { Component } from "react";
import db from '../firebase-config';

import BigCalendar from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('moment/locale/es.js');


const localizer = BigCalendar.momentLocalizer(moment);
//array de eventos

export default class CalendarPrincipal extends Component {

  state = {
    eventos: [],
    todosEventos: '',
  }

  componentDidMount() {
    db.collection('Eventos').onSnapshot((snapShots) => {
      this.setState({
        eventos: snapShots.docs.map(doc => {
          return { data: doc.data() }
        })
      })
    }, error => {
      console.log(error)
    });

  }

  getAllEvents = () => {
    let allEvents = this.state.eventos.map((evento) => (
     {
        'title': evento.data.nombre,
        'allDay': true,
        'start': new Date(evento.data.fecha),
        'end': new Date(evento.data.fecha)
      } 
    ))

   return allEvents;
  }

  render() {
    return (
      <div className="bigCalendar-container">
        <BigCalendar
          localizer={localizer}
          events={this.getAllEvents()}
          startAccessor="start"
          endAccessor="end"

          messages={{
            next: "sig",
            previous: "ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día"
          }}
        />
      </div>);
  }
}
