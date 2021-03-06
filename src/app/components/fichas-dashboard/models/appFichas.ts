import {Persona} from '../../../models/persona';

export interface SeccionFs {
  id?: number;
  nombre?: string;
  posicion?: string;
  activo?: boolean;
  preguntafsSet: PreguntaFs[];
}

export interface PreguntaFs {
  id?: number;
  posicion?: number;
  titulo?: string;
  ayuda?: string;
  tipo?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  regex?: string;
  seccion?: SeccionFs;
  dependeDe?: PreguntaFs;
  parametros?: ParametroFs[];
  respuestaPersona?: RespuestaFs;
}

export interface ParametroFs {
  id?: number;
  titulo?: string;
  agregado_por?: string;
  pregunta?: PreguntaFs;
  activo?: boolean;
  check?: boolean;
}

export interface PermisoIngresoFs {
  id?: number;
  inicio?: Date;
  fin?: Date;
  // periodo?: PeriodoLectivo
  activo?: boolean;
}

export interface PersonaFs {
  id?: number;
  fechaIngreso?: Date;
  fechaModificacion?: Date;
  finalizada?: boolean;
  persona?: Persona;
}

export interface RespuestaFs {
  id?: number;
  respuestas?: string | ParametroFs | ParametroFs[] | Diagnostico[] | DiagnosticoDiscapacidad[];
  personaFs?: PersonaFs;
  pregunta?: PreguntaFs;
}

export interface Diagnostico {
  parentesco?: string;
  diagnostico?: string;
  medicacion?: 'SI' | 'NO';
}

export interface DiagnosticoDiscapacidad {
  tipoDiscapacidad?: string;
  parentesco?: string;
  noCarnet?: string;
  porcentaje?: number;
}

export interface DiagnosticoMedicamento {
  tipoMedicamento?: string;
  parentesco?: string;
}


export interface NuevoParametro {
  titulo?: string;
  agregadoPor?: string;
  pregunta?: number;

}
