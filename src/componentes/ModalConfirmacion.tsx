
import React from 'react'
export default function ModalConfirmacion({abierto, alCerrar, mensaje}:{abierto:boolean; alCerrar:()=>void; mensaje:string}){
  if(!abierto) return null
  return (
    <div className="modal" onClick={alCerrar}>
      <div className="tarjeta hoja" onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Reserva confirmada</h3>
        <p>{mensaje}</p>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <button className="boton primario" onClick={alCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
