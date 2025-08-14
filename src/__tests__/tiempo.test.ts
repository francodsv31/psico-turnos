
import { describe, it, expect } from 'vitest'
import { generarTurnosParaSemana, inicioDeSemanaLocal } from '../utiles/tiempo'
describe('generación de turnos', ()=>{
  it('genera turnos según franja y tamaño', ()=>{
    const inicio = inicioDeSemanaLocal(new Date('2025-08-10T00:00:00'))
    const turnos = generarTurnosParaSemana(inicio, { dia:1, inicio:'09:00', fin:'10:00', minutosPorTurno:30 }, 'America/Argentina/Buenos_Aires')
    expect(turnos.length).toBe(2)
    expect(turnos[0].etiquetaHora).toMatch(/\d{2}:\d{2}/)
  })
})
