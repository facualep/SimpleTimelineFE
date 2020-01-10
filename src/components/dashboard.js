import React, { Component } from 'react';
import Task from './task';
import { connect } from 'react-redux';
import { apiGetTasks } from './../lib/apiClient';
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

class Dashboard extends Component {
  state = {
    tasks: [
      // {noteId: 23, name: "Poner relojes en hora", description: null, date: "2021-07-05T00:00:00", access: 2},
      // {noteId: 24, name: "Ordenar carpeta de descargas", description: null, date: "2021-07-05T00:00:00", access: 2},
      // {noteId: 6, name: "Limpiar la bolita del mouse", description: null, date: "2019-07-31T00:00:00", access: 2},
      // {noteId: 8, name: "Salir a ver si llueve", description: null, date: "2019-07-31T00:00:00", access: 2},
      // {noteId: 25, name: "Contar fideos que vienen en una bolsa", description: null, date: "2019-07-06T00:00:00", access: 2},
      // {noteId: 19, name: "Ordenar especias", description: null, date: "2019-06-27T00:00:00", access: 2},
      // {noteId: 7, name: "Pintar pared y ver cómo se seca", description: null, date: "2019-06-13T00:00:00", access: 2},
      // {noteId: 1, name: "Rebobinar casettes", description: "Usar bic.", date: "2019-05-31T04:00:00", access: 2},
      // {noteId: 5, name: "Separar ropa blanca de la de color", description: null, date: "2019-05-22T00:00:00", access: 2},
      // {noteId: 9, name: "Ver crecer el pasto", description: null, date: "2019-05-15T17:00:00", access: 2},
      // {noteId: 4, name: "Regar tunas", description: null, date: "2019-05-15T16:47:00", access: 2}
    ]
  }

  componentWillMount() {
    if (this.props.user.accessToken === null)
      this.props.history.push('/login');
    else {
      apiGetTasks(this.props.user.accessToken)
        .then(response => {
          this.setState({
            tasks: response.data
          })
          console.log(this.state.tasks)
        })
    }
  }
  
  render() {
    return(
      <div className="grey-background">
        <Container className="grid-container">
          <Grid className="" container spacing={3}>
            {this.state.tasks ?
              this.state.tasks.map((task) =>
                <Grid item xs={12} sm={4} key={task.noteId}>
                  <Task task={task}/>
                </Grid> 
              )
            :
              'No tasks yet'
            }
          </Grid>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Dashboard)