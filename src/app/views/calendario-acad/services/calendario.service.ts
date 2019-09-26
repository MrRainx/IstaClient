import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EVENTOS, ADD_EVENTO, GET_EVENTO_BY_ID, EDIT_EVENTO, DELETE_EVENTO } from './queries';
import { Evento } from '../models/calendario-models';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(
    private apollo: Apollo
  ) { }


  public async getEventos() {
    const query = await this.apollo.query({
      query: GET_EVENTOS,
      fetchPolicy: 'network-only'
    });

    const promise = await query.toPromise()

    return promise.data['appCalendarioAcademico']['eventos'] as Evento[];

  }



  public async getEventoById(id: number): Promise<Evento> {
    const query = await this.apollo.query({
      query: GET_EVENTO_BY_ID,
      variables: {
        id: id
      }
    })

    const promise = await query.toPromise()
    return promise.data['appCalendarioAcademico']['eventoById'] as Evento

  }


  public async addEvento(evento: Evento): Promise<Evento> {

    const mutation = await this.apollo.mutate({
      mutation: ADD_EVENTO,
      variables: {
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        color: evento.color
      }
    })
    const promise = await mutation.toPromise()
    return promise.data['appCalendarioAcad']['addEvento'] as Evento

  }

  public async editEvento(evento: Evento): Promise<Evento> {
    const mutation = await this.apollo.mutate({
      mutation: EDIT_EVENTO,
      variables: {
        id: evento.id,
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        color: evento.color
      }
    })
    const promise = await mutation.toPromise()
    return promise.data['appCalendarioAcad']['addEvento'] as Evento

  }

  public async deleteEvento(evento: Evento): Promise<Evento> {
    const mutation = await this.apollo.mutate({
      mutation: DELETE_EVENTO,
      variables: {
        id: evento.id,
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        color: evento.color
      }
    })
    const promise = await mutation.toPromise()
    return promise.data['appCalendarioAcad']['addEvento'] as Evento

  }

}
