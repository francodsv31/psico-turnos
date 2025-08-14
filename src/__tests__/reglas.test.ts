
import { describe, it, expect } from 'vitest'

function mismaFechaLocal(aISO: string, bISO: string){
  const a = new Date(aISO); const b = new Date(bISO)
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()
}

function puedeCancelar(inicioISO: string){
  const ahora = Date.now()
  const inicio = new Date(inicioISO).getTime()
  const mediaHora = 30 * 60 * 1000
  return (inicio - ahora) >= mediaHora
}

describe('reglas de negocio', ()=>{
  it('mismo día', ()=>{
    expect(mismaFechaLocal('2025-08-15T10:00:00.000Z','2025-08-15T18:00:00.000Z')).toBe(true)
    expect(mismaFechaLocal('2025-08-15T10:00:00.000Z','2025-08-16T00:00:00.000Z')).toBe(false)
  })

  it('cancelación bloqueada si faltan <30 min', ()=>{
    const dentro20 = new Date(Date.now() + 20*60*1000).toISOString()
    const dentro40 = new Date(Date.now() + 40*60*1000).toISOString()
    expect(puedeCancelar(dentro20)).toBe(false)
    expect(puedeCancelar(dentro40)).toBe(true)
  })
})
