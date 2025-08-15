
import React, { useMemo, useState } from 'react'
import type { Psicologo, Modalidad } from '../datos/psicologos'
import { format } from 'date-fns'
import { guardarReserva, obtenerUsuario, guardarUsuario, obtenerReservas } from '../utiles/almacen'
import ModalConfirmacionAccion from './ModalConfirmacionAccion'

type Props = {
  abierto: boolean
  alCerrar: () => void
  psicologo: Psicologo | null
  iso: string | null
  tema: string
  modalidad: Modalidad
  alReservar: (detalle: { psicologo: string; modalidad: Modalidad; iso: string }) => void
}

function validarCorreoSimple(v: string){
  const re = /^[^\s@]+@[^\s@]+\.com$/i
  return re.test(v)
}
function mismaFechaLocal(aISO: string, bISO: string){
  const a = new Date(aISO); const b = new Date(bISO)
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()
}

export default function ModalReserva({abierto, alCerrar, psicologo, iso, tema, modalidad, alReservar}: Props){
  const usuario = obtenerUsuario()
  const [nombre, setNombre] = useState(usuario?.nombre || '')
  const [correo, setCorreo] = useState(usuario?.correo || '')
  const correoBloqueado = !!usuario
  const correoValido = useMemo(()=> validarCorreoSimple(correo), [correo])

  const [mostrarAlertaDia, setMostrarAlertaDia] = useState(false)
  const [mostrarChoqueHora, setMostrarChoqueHora] = useState(false)

  if (!abierto || !psicologo || !iso) return null
  const ps = psicologo
  const isoStr = iso
  const cuando = new Date(iso)

  function tieneReservaMismoDia(){
    const reservas = obtenerReservas()
    return reservas.some(r => r.correoPaciente === correo && mismaFechaLocal(r.inicioISO, isoStr))
  }
  function existeChoqueExacto(){
    const reservas = obtenerReservas()
    return reservas.some(r => r.correoPaciente === correo && r.inicioISO === iso)
  }

  function continuarReserva(){
    guardarUsuario({ nombre, correo })
    guardarReserva({
      id: Math.random().toString(36).slice(2),
      idPsicologo: ps.id,
      nombrePsicologo: ps.nombre,
      tema,
      modalidad,
      inicioISO: iso!,
      correoPaciente: correo,
      creadoEn: new Date().toISOString()
    })
    alReservar({ psicologo: ps.nombre, modalidad, iso: iso! })
    setMostrarAlertaDia(false)
    alCerrar()
  }

  function onConfirmarClick(){
    if (!nombre || !correo || !correoValido) return
    if (usuario && usuario.correo !== correo) return
    // Bloqueo duro si hay choque exacto de horario con cualquier psicólogo
    if (existeChoqueExacto()){
      setMostrarChoqueHora(true)
      return
    }
    // Alerta (confirmación) si ya hay otra reserva el mismo día
    if (tieneReservaMismoDia()){
      setMostrarAlertaDia(true)
      return
    }
    continuarReserva()
  }

  return (
    <div className="modal" onClick={alCerrar}>
      <div className="tarjeta hoja" onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>Confirmar sesión</h3>
        <p><strong>Profesional:</strong> {psicologo.nombre}</p>
        <p><strong>Temática:</strong> {tema || '—'}</p>
        <p><strong>Modalidad:</strong> {modalidad}</p>
        <p><strong>Horario (tu zona):</strong> {format(cuando, 'eeee dd/MM HH:mm')}</p>

        <div className="tarjeta" style={{marginTop:10}}>
          <div className="titulo-seccion">Tus datos</div>
          <div style={{display:'grid', gap:8}}>
            <input className="input" placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} />
            <div>
              <input
                className="input"
                placeholder="Correo (debe terminar en .com)"
                value={correo}
                onChange={e=>setCorreo(e.target.value)}
                readOnly={correoBloqueado}
                title={correoBloqueado ? 'Para cambiar el correo, usá “Salir” o “Limpiar datos”.' : ''}
              />
              {!correoValido && <div style={{color:'#b91c1c', fontSize:12, marginTop:6}}>Ingresá un correo válido (debe contener "@" y terminar en ".com").</div>}
              {usuario && usuario.correo !== correo && <div style={{color:'#b91c1c', fontSize:12, marginTop:6}}>No podés reservar con otro correo mientras haya sesión guardada. Usá “Salir” o “Limpiar datos”.</div>}
              {correoBloqueado && <div style={{color:'#065f46', fontSize:12, marginTop:6}}>Sesión activa con: <strong>{usuario?.correo}</strong></div>}
            </div>
          </div>
        </div>

        <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:12}}>
          <button className="boton" onClick={alCerrar}>Cancelar</button>
          <button className="boton primario" onClick={onConfirmarClick} disabled={!nombre || !correoValido || (usuario ? usuario.correo !== correo : false)}>Confirmar</button>
        </div>
      </div>

      {/* Modal: mismo día -> confirmación */}
      <ModalConfirmacionAccion
        abierto={mostrarAlertaDia}
        titulo="Ya tenés una reserva este día"
        mensaje="Ya existe una reserva a tu nombre para este mismo día. ¿Querés agendar otra de todos modos?"
        textoCancelar="No, volver"
        textoAceptar="Sí, continuar"
        onCancelar={()=> setMostrarAlertaDia(false)}
        onAceptar={continuarReserva}
      />

      {/* Modal: choque exacto de hora -> bloqueo */}
      <ModalConfirmacionAccion
        abierto={mostrarChoqueHora}
        titulo="Choque de horario"
        mensaje="Ya tenés una reserva a la misma hora. No es posible agendar dos sesiones en el mismo horario."
        textoCancelar="Cerrar"
        textoAceptar="Entendido"
        onCancelar={()=> setMostrarChoqueHora(false)}
        onAceptar={()=> setMostrarChoqueHora(false)}
      />
    </div>
  )
}
