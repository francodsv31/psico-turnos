
import React from 'react'
import type { Psicologo } from '../datos/psicologos'
import { zonaHorariaUsuario } from '../utiles/tiempo'
type Props = { items:Psicologo[]; idsPocaDisponibilidad:Set<string>; alSeleccionar:(p:Psicologo)=>void }
export default function ListaPsicologos({items, idsPocaDisponibilidad, alSeleccionar}: Props){
  return (
    <div className="tarjeta">
      <div className="titulo-seccion">Psicólogos disponibles</div>
      <div className="lista">
        {items.map(p => (
          <div className="item" key={p.id}>
            <div style={{flex:1}}>
              <h4>{p.nombre}</h4>
              <div className="chips">{p.temas.map(t => <span key={t} className="chip">{t}</span>)}</div>
              <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
                <span className={"etiqueta" + (idsPocaDisponibilidad.has(p.id) ? " warn" : "")}>
                  {idsPocaDisponibilidad.has(p.id) ? "Poca disponibilidad" : "Sesiones"}
                </span>
                <span className="etiqueta">TZ terapeuta: {p.zonaHoraria}</span>
                <span className="etiqueta">Tu TZ: {zonaHorariaUsuario}</span>
                {p.modalidades.includes('online') && <span className="etiqueta online">Online</span>}
                {p.modalidades.includes('presencial') && <span className="etiqueta presencial">Presencial</span>}
              </div>
            </div>
            <button className="boton" onClick={()=>alSeleccionar(p)}>Ver disponibilidad</button>
          </div>
        ))}
        {items.length === 0 && <div className="item">No hay profesionales con ese filtro.</div>}
      </div>
    </div>
  )
}
