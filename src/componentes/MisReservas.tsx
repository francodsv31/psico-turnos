
import React, { useMemo, useState } from 'react'
import { obtenerReservas, obtenerUsuario, eliminarReserva } from '../utiles/almacen'
import ModalConfirmacionAccion from './ModalConfirmacionAccion'

function puedeCancelar(inicioISO: string){
  const ahora = Date.now()
  const inicio = new Date(inicioISO).getTime()
  const mediaHora = 30 * 60 * 1000
  return (inicio - ahora) >= mediaHora
}

export default function MisReservas({ alDespuesDeCancelar }: { alDespuesDeCancelar: ()=>void }){
  const u = obtenerUsuario()
  const [aCancelar, setACancelar] = useState<{id:string; inicioISO:string} | null>(null)

  const lista = useMemo(()=>{
    const todas = obtenerReservas()
    return u ? todas.filter(r => r.correoPaciente === u.correo) : []
  }, [u, aCancelar])

  return (
    <div>
      <div className="titulo-seccion">Listado</div>
      <div style={{display:'grid', gap:10}}>
        {lista.map(r => {
          const habilitada = puedeCancelar(r.inicioISO)
          return (
            <div key={r.id} className="tarjeta" style={{padding:16}}>
              <div style={{display:'flex', justifyContent:'space-between', gap:8, flexWrap:'wrap'}}>
                <div><strong>{r.nombrePsicologo}</strong> — <span className="etiqueta">{r.modalidad}</span></div>
                <div style={{fontSize:12, color:'var(--muted)'}}>{new Date(r.inicioISO).toLocaleString()}</div>
              </div>
              <div>Temática: {r.tema || '—'}</div>
              <div style={{fontSize:12, marginTop:6}}>Correo: <strong>{r.correoPaciente}</strong></div>
              <div style={{display:'flex', justifyContent:'flex-end', marginTop:8}}>
                <button className="boton" disabled={!habilitada} title={!habilitada ? 'No se puede cancelar si faltan menos de 30 minutos.' : ''}
                  onClick={()=> setACancelar({ id: r.id, inicioISO: r.inicioISO })}>
                  Cancelar
                </button>
              </div>
            </div>
          )
        })}
        {(!u || lista.length === 0) && <div>No hay reservas para tu usuario. (Se guardan por correo.)</div>}
      </div>

      <ModalConfirmacionAccion
        abierto={!!aCancelar}
        titulo="Cancelar reserva"
        mensaje="Si continuás, se realizará un cobro de $4000 por cancelación. ¿Deseás cancelar la reserva?"
        textoCancelar="No, volver"
        textoAceptar="Sí, cancelar"
        onCancelar={()=> setACancelar(null)}
        onAceptar={()=>{
          if(aCancelar){
            eliminarReserva(aCancelar.id)
            setACancelar(null)
            alDespuesDeCancelar()
          }
        }}
      />
    </div>
  )
}
