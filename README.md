# Gestor de Sesiones con Psicólogos

Aplicación web para que los pacientes puedan ver psicólogos disponibles, filtrar por temática o modalidad (online/presencial), revisar horarios y agendar una sesión de forma rápida.  
La información de usuario y reservas se guarda en el navegador (localStorage), por lo que no requiere base de datos.

## Funcionalidades
- Listado de psicólogos con nombre, temáticas, modalidad y horarios.
- Filtro por temática y por modalidad.
- Vista semanal de disponibilidad.
- Reserva de sesión con confirmación en pantalla.
- Bloqueos para evitar reservas duplicadas en mismo horario o día.
- Gestión de reservas: ver, cancelar (con advertencia) y liberar horarios.
- Adaptado para uso en PC y dispositivos móviles.

## Tecnologías usadas
- **React + **Vite** (frontend)
- **TypeScript**
- **CSS** (estilos personalizados en blanco y verde)
- **LocalStorage** para persistencia de datos en el navegador

## Instalación y ejecución
1. Clonar el repositorio e ingresar a la carpeta:
   git clone <url-del-repo>
   cd psico-scheduler
2. Instalar dependencias:
   npm install
3. Iniciar el servidor de desarrollo:
   npm run dev
4. Abrir en el navegador la URL que aparece en consola:
   http://localhost:5173
   
# Decisiones técnicas y funcionales

- **Arquitectura sin base de datos**: Se optó por manejar la persistencia de datos mediante `localStorage` para simplificar la implementación y evitar la necesidad de un backend o servidor de base de datos, dado el tiempo limitado para el desarrollo.  
- **Gestión de usuarios**: El registro y login están enfocados únicamente en los usuarios (pacientes), dejando la gestión de psicólogos como una funcionalidad para versiones futuras.  
- **Validaciones**: Se incorporó validación de formato de correo (incluyendo `@` y `.com`) y restricciones para evitar que un usuario haga más de una reserva para el mismo día y horario.  
- **Filtros dinámicos**: El listado de psicólogos permite filtrar por nombre, temática y modalidad (online/presencial).  
- **Bloqueos adicionales**: Implementado bloqueo para no permitir reservas con otro correo mientras haya una sesión activa y para evitar cancelaciones 30 minutos antes de la cita.  
- **Diseño visual**: Se aplicó un estilo minimalista en verde y blanco, con un diseño espacioso y componentes adaptados para una experiencia más clara.  
- **Responsividad**: Ajustado el diseño para que se adapte correctamente a dispositivos móviles.  

---

# Detalle de lo que hice y qué asumí

- **Estructura inicial**: Armé el proyecto con **Vite + React + TypeScript**, configurando rutas y componentes principales.  
- **Manejo de estado**: Usé `useState` y `useEffect` para manejar datos en memoria y sincronizarlos con `localStorage`.  
- **Simulación de datos**: Generé un dataset estático de psicólogos, temáticas, horarios y modalidades para simular el funcionamiento real del sistema.  
- **Reserva y cancelación**: Implementé la lógica de reservas con validaciones de fecha, hora y usuario; y el proceso de cancelación con advertencia de cobro.