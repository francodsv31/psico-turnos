
import type { Modalidad } from '../datos/psicologos'
export type Usuario = { nombre: string; correo: string }
export type Reserva = { id: string; idPsicologo: string; nombrePsicologo: string; tema: string; modalidad: Modalidad; inicioISO: string; correoPaciente: string; creadoEn: string }
const CLAVE_RESERVAS = 'psico_reservas_v3'; const CLAVE_USUARIO = 'psico_usuario_v1'
export function guardarReserva(r: Reserva){ const arr = obtenerReservas(); arr.push(r); localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(arr)) }
export function obtenerReservas(): Reserva[]{ try{ return JSON.parse(localStorage.getItem(CLAVE_RESERVAS) || '[]') }catch{ return [] } }
export function obtenerUsuario(): Usuario | null { try{ return JSON.parse(localStorage.getItem(CLAVE_USUARIO) || 'null') }catch{ return null } }
export function guardarUsuario(u: Usuario){ localStorage.setItem(CLAVE_USUARIO, JSON.stringify(u)) }
export function salirUsuario(){ localStorage.removeItem(CLAVE_USUARIO) }
export function turnoOcupado(iso: string, idPs: string){ return obtenerReservas().some(r => r.idPsicologo === idPs && r.inicioISO === iso) }


export function eliminarReserva(id: string){
  const arr = obtenerReservas().filter(r => r.id !== id)
  localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(arr))
}
