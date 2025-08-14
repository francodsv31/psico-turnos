
import { format, addMinutes, startOfWeek, addDays } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'
import type { Disponibilidad, DiaSemana } from '../datos/psicologos'
export const zonaHorariaUsuario = Intl.DateTimeFormat().resolvedOptions().timeZone
export type Turno = { inicioLocalISO: string; etiquetaHora: string; dia: DiaSemana }
export function generarTurnosParaSemana(inicioSemanaLocal: Date, disp: Disponibilidad, tzProfesional: string): Turno[] {
  const fechaDiaLocal = addDays(inicioSemanaLocal, disp.dia)
  const [hIni, mIni] = disp.inicio.split(':').map(Number)
  const [hFin, mFin] = disp.fin.split(':').map(Number)
  const baseUTC = new Date(Date.UTC(fechaDiaLocal.getFullYear(), fechaDiaLocal.getMonth(), fechaDiaLocal.getDate(), 0, 0, 0))
  const inicioZ = toZonedTime(baseUTC, tzProfesional); inicioZ.setHours(hIni, mIni, 0, 0)
  const finZ = toZonedTime(baseUTC, tzProfesional); finZ.setHours(hFin, mFin, 0, 0)
  const inicioUtc = fromZonedTime(inicioZ, tzProfesional); const finUtc = fromZonedTime(finZ, tzProfesional)
  const turnos: Turno[] = []
  for (let t = inicioUtc; t < finUtc; t = addMinutes(t, disp.minutosPorTurno)) {
    const local = toZonedTime(t, zonaHorariaUsuario)
    turnos.push({ inicioLocalISO: local.toISOString(), etiquetaHora: format(local, 'HH:mm'), dia: disp.dia })
  }
  return turnos
}
export function inicioDeSemanaLocal(fecha: Date){ return startOfWeek(fecha, { weekStartsOn: 0 }) }
export function etiquetaDia(d: DiaSemana){ return ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][d] }
