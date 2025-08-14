
import React, { useMemo, useState } from 'react'
import { psicologos } from './datos/psicologos'
import BarraFiltros from './componentes/BarraFiltros'
import ListaPsicologos from './componentes/ListaPsicologos'
import CalendarioSemanal from './componentes/CalendarioSemanal'
import ModalReserva from './componentes/ModalReserva'
import ModalConfirmacion from './componentes/ModalConfirmacion'
import ModalMisReservas from './componentes/ModalMisReservas'
import { obtenerReservas } from './utiles/almacen'
import Encabezado from './componentes/Encabezado'


export default function App(){

  const [tema,setTema] = useState(''); const [busqueda,setBusqueda] = useState(''); const [modalidadFiltro,setModalidadFiltro]=useState('')
  const [seleccionado,setSeleccionado] = useState<typeof psicologos[number] | null>(null)
  const [semana] = useState(new Date()); const [isoElegido,setIsoElegido]=useState<string|null>(null); const [modalidadElegida,setModalidadElegida]=useState<'online'|'presencial'>('online')
  const [claveReservas,setClaveReservas]=useState(0)
  const [abrirMis,setAbrirMis] = useState(false)
  const [confirmacion,setConfirmacion] = useState<{mensaje:string}|null>(null)

  const filtrados = useMemo(()=> psicologos.filter(p=>{
    const porTema = tema ? p.temas.includes(tema) : true
    const porNombre = busqueda ? p.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true
    const porModalidad = modalidadFiltro ? p.modalidades.includes(modalidadFiltro as any) : true
    return porTema && porNombre && porModalidad
  }), [tema,busqueda,modalidadFiltro])

  const idsPocaDisponibilidad = useMemo(()=>{
    const ids = new Set<string>()
    for (const p of psicologos){
      let libres = 0
      const sumar = (arr: typeof p.disponibilidad.online)=>{ for(const d of arr){ const [h1,m1]=d.inicio.split(':').map(Number); const [h2,m2]=d.fin.split(':').map(Number); libres += Math.floor(((h2*60+m2)-(h1*60+m1))/d.minutosPorTurno)}}
      sumar(p.disponibilidad.online); sumar(p.disponibilidad.presencial)
      const reservas = obtenerReservas().filter(r=>r.idPsicologo===p.id); libres = Math.max(0, libres - reservas.length)
      if(libres<=3) ids.add(p.id)
    }
    return ids
  }, [claveReservas])

  return (
    <div className="contenedor">
      <Encabezado alAbrirMis={()=>setAbrirMis(true)} alLimpiar={()=>{ localStorage.clear(); setClaveReservas(k=>k+1) }} />
      <div className="grid">
        <div style={{display:'grid', gap:16}}>
          <BarraFiltros tema={tema} setTema={setTema} busqueda={busqueda} setBusqueda={setBusqueda} modalidad={modalidadFiltro} setModalidad={setModalidadFiltro} />
          <ListaPsicologos items={filtrados} idsPocaDisponibilidad={idsPocaDisponibilidad} alSeleccionar={(p)=>{ setSeleccionado(p) }} />
        </div>
        <div style={{display:'grid', gap:16}}>
          {seleccionado ? <CalendarioSemanal psicologo={seleccionado} semana={semana} claveReservas={claveReservas} alElegir={(iso,mod)=>{ setIsoElegido(iso); setModalidadElegida(mod) }} /> : <div className="tarjeta">Elegí un profesional para ver horarios por modalidad.</div>}
        </div>
      </div>

      <ModalReserva abierto={!!isoElegido} alCerrar={()=>setIsoElegido(null)} psicologo={seleccionado} iso={isoElegido} tema={tema} modalidad={modalidadElegida} alReservar={({psicologo, modalidad, iso})=>{ setClaveReservas(k=>k+1); setConfirmacion({ mensaje:`${psicologo} • ${modalidad} • ${new Date(iso).toLocaleString()}` }) }} />
      <ModalConfirmacion abierto={!!confirmacion} alCerrar={()=>setConfirmacion(null)} mensaje={confirmacion?.mensaje || ''} />
      <ModalMisReservas abierto={abrirMis} alCerrar={()=>setAbrirMis(false)} alDespuesDeCancelar={()=> setClaveReservas(k=>k+1)} />
    </div>
  )
}
