
import React from 'react'
import { TEMAS } from '../datos/psicologos'
type Props = { tema:string; setTema:(t:string)=>void; busqueda:string; setBusqueda:(s:string)=>void; modalidad:string; setModalidad:(m:string)=>void }
export default function BarraFiltros({tema,setTema,busqueda,setBusqueda,modalidad,setModalidad}: Props){
  return (
    <div className="tarjeta" style={{display:'grid', gap:12}}>
      <div style={{display:'grid', gap:8}}>
        <label className="titulo-seccion">Filtrar resultados</label>
        <div style={{display:'grid', gridTemplateColumns: undefined, gap:8}}>
          <input className="input" placeholder="Buscar profesional…" value={busqueda} onChange={e=>setBusqueda(e.target.value)} />
          <select className="select" value={tema} onChange={e=>setTema(e.target.value)}>
            <option value="">Todas las temáticas</option>
            {TEMAS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="select" value={modalidad} onChange={e=>setModalidad(e.target.value)}>
            <option value="">Todas las modalidades</option>
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>
      </div>
    </div>
  )
}
