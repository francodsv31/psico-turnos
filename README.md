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
   
