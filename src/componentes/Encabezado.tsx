
import React from 'react'
import { obtenerUsuario, salirUsuario } from '../utiles/almacen'
type Props = { alAbrirMis:()=>void; alLimpiar:()=>void }
export default function Encabezado({ alAbrirMis, alLimpiar }: Props){
  const u = obtenerUsuario()
  return (
    <header className="encabezado">
      <div className="marca">
        <div className="logo">PS</div>
        <div>
          <div style={{fontWeight:700}}>Psico Turnos</div>
          <div style={{fontSize:12, color:'var(--muted)'}}>Turnos online / presencial</div>
        </div>
      </div>
      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        <button className="boton" onClick={alAbrirMis}>Mis reservas</button>
        <button className="boton" onClick={alLimpiar}>Limpiar datos</button>
        {u ? <button className="boton" onClick={()=>{ salirUsuario(); location.reload() }}>Salir ({u.correo})</button> : <span className="etiqueta">Modo invitado</span>}
      </div>
    </header>
  )
}
