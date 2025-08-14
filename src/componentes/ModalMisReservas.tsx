
import React from 'react'
import MisReservas from './MisReservas'
export default function ModalMisReservas({abierto, alCerrar}:{abierto:boolean; alCerrar:()=>void}){
  if(!abierto) return null
  return (
    <div className="modal" onClick={alCerrar}>
      <div className="tarjeta hoja" onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3 style={{marginTop:0}}>Mis reservas</h3>
          <button className="boton" onClick={alCerrar}>Cerrar</button>
        </div>
        <MisReservas alDespuesDeCancelar={alDespuesDeCancelar} />
      </div>
    </div>
  )
}
