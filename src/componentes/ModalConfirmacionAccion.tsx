
import React from 'react'

type Props = {
  abierto: boolean
  titulo?: string
  mensaje: string
  textoCancelar?: string
  textoAceptar?: string
  onCancelar: () => void
  onAceptar: () => void
}

export default function ModalConfirmacionAccion({
  abierto, titulo = 'Confirmar acción', mensaje,
  textoCancelar = 'Cancelar', textoAceptar = 'Continuar',
  onCancelar, onAceptar
}: Props){
  if(!abierto) return null
  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onCancelar}>
      <div className="tarjeta hoja" onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>{titulo}</h3>
        <p>{mensaje}</p>
        <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
          <button className="boton" onClick={onCancelar}>{textoCancelar}</button>
          <button className="boton primario" onClick={onAceptar}>{textoAceptar}</button>
        </div>
      </div>
    </div>
  )
}
