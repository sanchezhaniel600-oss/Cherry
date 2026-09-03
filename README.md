# CHERRY

CHERRY es una aplicación web orientada a la participación ciudadana y al cuidado ambiental de la ciudad de León, Nicaragua. Permite consultar reportes ambientales, visualizar ubicaciones en un mapa, publicar contenido en la comunidad, participar en actividades y administrar publicaciones y usuarios desde un panel privado.

## Tecnologías utilizadas

- **HTML5** para la estructura de las páginas.
- **CSS3** para los estilos, diseño responsive, temas claro y oscuro y componentes visuales.
- **JavaScript** para la navegación, formularios, publicaciones, comentarios, notificaciones y acciones del panel administrativo.
- **Leaflet.js** y **OpenStreetMap** para los mapas interactivos y la ubicación de reportes.
- **Firebase** como base para autenticación y servicios del proyecto cuando se conecte el backend correspondiente.
- **LocalStorage y SessionStorage** para conservar configuraciones, sesión simulada y estado administrativo en el prototipo local.

## Estructura principal

```text
CHERRY/
├── Index/
│   ├── index.html          # Sitio principal
│   └── ecoruta (1).html    # Interfaz adicional
├── admin/
│   ├── index.html           # Panel de administración
│   ├── admin.css            # Estilos del panel
│   └── admin.js             # Lógica administrativa
├── auth/
│   └── login.html           # Inicio de sesión
├── cherry-app-ui/
│   └── cherry.html          # Interfaz alternativa
├── firebase.js              # Configuración de Firebase
├── register.html            # Registro de usuarios
├── register.css
└── register.js
```

## Instalación básica

No se requiere una instalación de paquetes para ejecutar el prototipo actual. Solo necesitas:

1. Descargar o clonar el repositorio.
2. Tener instalado un navegador moderno.
3. Abrir la carpeta `CHERRY` en Visual Studio Code.
4. Ejecutar el sitio mediante un servidor local.

Para una conexión completa con Firebase, configura las credenciales del proyecto en `firebase.js` y habilita los servicios que utilizará la aplicación, como Authentication, Firestore o Storage.

## Ejecución del sistema

La forma recomendada es usar la extensión **Live Server** de Visual Studio Code:

1. Abre `CHERRY/Index/index.html`.
2. Haz clic derecho sobre el archivo.
3. Selecciona **Open with Live Server**.
4. El sitio se abrirá en una dirección local similar a `http://127.0.0.1:5500/CHERRY/Index/index.html`.

También puedes utilizar cualquier servidor estático. Por ejemplo, desde la carpeta del proyecto:

```bash
python -m http.server 5500
```

Después visita:

```text
http://localhost:5500/CHERRY/Index/index.html
```

No se recomienda abrir directamente el archivo con `file:///`, porque algunas funciones del navegador, los módulos, Firebase, la geolocalización y las rutas relativas pueden comportarse de forma diferente sin un servidor HTTP.

## Acceso al panel administrativo

Desde el sitio principal, presiona el logo de CHERRY siete veces seguidas. Esto abre:

```text
CHERRY/admin/index.html
```

El panel permite:

- Consultar publicaciones y usuarios.
- Eliminar publicaciones del sitio.
- Suspender usuarios temporalmente.
- Banear usuarios.
- Restaurar usuarios suspendidos o baneados.
- Consultar un resumen de la actividad administrativa.

En el prototipo, las acciones administrativas se guardan en `LocalStorage` con la clave `cherry-admin-state`. Para un entorno real, estas operaciones deben validarse en un backend y protegerse con permisos de administrador.

## Consideraciones

- Leaflet y los mapas de OpenStreetMap requieren conexión a Internet.
- La geolocalización necesita permiso del navegador y normalmente un contexto seguro o `localhost`.
- El estado guardado en `LocalStorage` solo existe en el navegador y dispositivo donde se ejecuta.
- Firebase todavía requiere configurar un proyecto real y reglas de seguridad antes de usarlo en producción.
- El panel administrativo del prototipo no reemplaza un sistema de autorización del servidor.
