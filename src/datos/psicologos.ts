
export type DiaSemana = 0|1|2|3|4|5|6
export type Modalidad = 'online' | 'presencial'
export type Disponibilidad = { dia: DiaSemana; inicio: string; fin: string; minutosPorTurno: number }
export type DisponibilidadPorModalidad = { online: Disponibilidad[]; presencial: Disponibilidad[] }
export type Psicologo = {
  id: string; nombre: string; temas: string[]; zonaHoraria: string;
  modalidades: Modalidad[]; disponibilidad: DisponibilidadPorModalidad
}
export const TEMAS = ['Ansiedad','Depresión','Estrés laboral','Relaciones','Fobias','Autoestima','Duelo','LGBTQ+']
export const psicologos: Psicologo[] = [
  { id:'ps1', nombre:'Dra. Sofía López', temas:['Ansiedad','Relaciones','Autoestima','LGBTQ+'], zonaHoraria:'America/Argentina/Buenos_Aires', modalidades:['online','presencial'],
    disponibilidad:{ online:[{dia:1,inicio:'09:00',fin:'12:00',minutosPorTurno:30},{dia:3,inicio:'14:00',fin:'18:00',minutosPorTurno:30}], presencial:[{dia:5,inicio:'10:00',fin:'12:00',minutosPorTurno:30}] } },
  { id:'ps2', nombre:'Lic. Martín Pereyra', temas:['Depresión','Duelo','Relaciones'], zonaHoraria:'America/Montevideo', modalidades:['online'],
    disponibilidad:{ online:[{dia:2,inicio:'13:00',fin:'17:00',minutosPorTurno:60},{dia:4,inicio:'08:30',fin:'11:30',minutosPorTurno:60}], presencial:[] } },
  { id:'ps3', nombre:'Lic. Camila Díaz', temas:['Fobias','Ansiedad','Estrés laboral'], zonaHoraria:'America/Bogota', modalidades:['presencial'],
    disponibilidad:{ online:[], presencial:[{dia:1,inicio:'18:00',fin:'20:00',minutosPorTurno:30}] } },
  { id:'ps4', nombre:'Dra. Elena Torres', temas:['Estrés laboral','Autoestima'], zonaHoraria:'Europe/Madrid', modalidades:['online','presencial'],
    disponibilidad:{ online:[{dia:0,inicio:'15:00',fin:'17:00',minutosPorTurno:30}], presencial:[{dia:6,inicio:'09:00',fin:'11:00',minutosPorTurno:30}] } }
]
