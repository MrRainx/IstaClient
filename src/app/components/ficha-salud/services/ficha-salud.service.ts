import {Injectable} from '@angular/core';
import {UPDATE_RESPUESTA_FS, BUSCAR_FICHA} from './queries';
import {Apollo} from 'apollo-angular';
import {SeccionFs, PreguntaFs, ParametroFs} from '../../fichas-dashboard/models/appFichas';

@Injectable({
  providedIn: 'root'
})
export class FichaSaludService {

  constructor(private apollo: Apollo) {
  }

  public async buscarFichaSalud(personaId: number) {

    const query = this.apollo.query({
      query: BUSCAR_FICHA,
      variables: {
        personaId: personaId
      },
      fetchPolicy: 'no-cache'
    });

    const promise = await query.toPromise();
    const ficha = promise.data['appFs']['fichaSalud'] as SeccionFs[];

    ficha.forEach(seccion => seccion.preguntafsSet.forEach(pregunta => {

      const JSONstring = pregunta.respuestaPersona.respuestas as string;

      pregunta.respuestaPersona['select'] = {};

      if (JSONstring) {

        const res = JSON.parse(JSONstring);

        if (res.parametro) {

          pregunta.respuestaPersona['select'] = res.parametro as ParametroFs;

        } else if (res.parametros) {

          res.parametros.forEach(parametro => this.checkParams(pregunta, parametro));

        } else if (res.diagnosticos) {
          /* this.resTemplate.diagnosticos = res.diagnosticos; */
        }
      }

      if (pregunta.dependeDe) {
        pregunta.dependeDe = seccion.preguntafsSet.filter(item => item.id === pregunta.dependeDe.id)[0];
      }
    })); // FOR DE LAS SECCIONES
    return ficha;

  }

  private checkParams(pregunta: PreguntaFs, parametro: ParametroFs): void {
    pregunta.parametros.filter(param => param.id === parametro.id)[0].check = true;
  }

  public updateRespuestaFs(id: number, respuesta: string) {
    this.apollo
      .mutate({
        mutation: UPDATE_RESPUESTA_FS,
        variables: {
          id: id,
          respuesta: respuesta
        }
      })
      .toPromise()
      .then();
  }
}
