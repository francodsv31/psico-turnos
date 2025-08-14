
import React, { useMemo, useState } from 'react'
import type { Psicologo, Modalidad } from '../datos/psicologos'
import { generarTurnosParaSemana, inicioDeSemanaLocal, etiquetaDia } from '../utiles/tiempo'
import { turnoOcupado } from '../utiles/almacen'
type Props = { psicologo:Psicologo; semana:Date; claveReservas:number; alElegir:(iso:string, modalidad:Modalidad)=>void }
export default function CalendarioSemanal({psicologo, semana, claveReservas, alElegir}: Props){
  const [modalidad, setModalidad] = useState<Modalidad>(psicologo.modalidades[0] || 'online')
  const inicio = useMemo(()=> inicioDeSemanaLocal(semana), [semana])
  const dispo = modalidad === 'online' ? psicologo.disponibilidad.online : psicologo.disponibilidad.presencial
  const mapa = new Map<number, {hora:string, iso:string, ocupado:boolean}[]>()
  for (let d of dispo){
    const turnos = generarTurnosParaSemana(inicio, d, psicologo.zonaHoraria)
    for (let t of turnos){
      const arr = mapa.get(t.dia) || []
      arr.push({hora:t.etiquetaHora, iso:t.inicioLocalISO, ocupado:turnoOcupado(t.inicioLocalISO, psicologo.id)})
      mapa.set(t.dia, arr)
    }
  }
  return (
    <div className="tarjeta">
      <div className="titulo-seccion">Disponibilidad semanal</div>
      <div className="pestanias">
        <button className={"pestania " + (modalidad==='online'?'activa':'')} onClick={()=>setModalidad('online')}>Online</button>
        <button className={"pestania presencial " + (modalidad==='presencial'?'activa':'')} onClick={()=>setModalidad('presencial')}>Presencial</button>
      </div>
      <div className="calendario">
        {[0,1,2,3,4,5,6].map(d => {
          const turnos = (mapa.get(d) || []).sort((a,b)=>a.hora.localeCompare(b.hora))
          return (
            <div className="dia" key={d}>
              <h5>{etiquetaDia(d as any)}</h5>
              <div className="turnos">
                {turnos.length === 0 && <span className="chip">—</span>}
                {turnos.map(t => (
                  <button key={t.iso+claveReservas} className={"turno"+(t.ocupado?" ocupado":"")} disabled={t.ocupado} onClick={()=>alElegir(t.iso, modalidad)}>
                    {t.hora}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
