# Proyecto Angular + FastAPI

Proyecto compuesto por dos aplicaciones independientes:

- **frontend**: aplicación Angular (SSR con Angular Universal) con autenticación mediante Microsoft Entra ID (MSAL).
- **backend**: API RESTful desarrollada con FastAPI, SQLAlchemy y Pydantic para la gestión de usuarios.

Este documento describe cómo levantar ambos entornos de desarrollo. Para el detalle completo del backend (estructura, errores comunes, endpoints), consulte [backend/README.md](backend/README.md).

## Requisitos del Sistema

| Componente | Versión recomendada                   |
| ---------- | ------------------------------------- |
| Node.js    | 20.19 o superior (LTS 22 recomendado) |
| npm        | 10 o superior (incluido con Node.js)  |
| Python     | 3.12 o superior                       |
| pip        | Incluido con Python                   |

## Estructura del Repositorio

```text
Proyecto_Angular/
├── backend/     # API FastAPI (Python)
├── frontend/    # Aplicación Angular
└── README.md
```

## Puesta en Marcha del Backend

1. Sitúese en la carpeta `backend`:

   ```powershell
   cd backend
   ```

2. Cree y active un entorno virtual:

   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. Instale las dependencias:

   ```powershell
   pip install -r requirements.txt
   ```

4. Inicie el servidor de desarrollo con recarga automática:

   ```powershell
   .\venv\Scripts\uvicorn main:app --reload --app-dir src
   ```

5. Verifique que la API responde en:

   - API: [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - Documentación Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - Documentación ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

Para la solución de errores comunes durante este proceso, consulte la sección correspondiente en [backend/README.md](backend/README.md).

## Puesta en Marcha del Frontend

1. Sitúese en la carpeta `frontend`:

   ```powershell
   cd frontend
   ```

2. Instale las dependencias:

   ```powershell
   npm install
   ```

3. Configure las credenciales de Microsoft Entra ID antes de iniciar la aplicación. Edite el archivo `src/environments/environment.ts` y complete los siguientes valores, provistos por el registro de la aplicación en Azure:

   ```ts
   export const environment = {
     production: false,
     azure: {
       clientId: '',      // Application (client) ID
       tenantId: '',      // Directory (tenant) ID
       authority: 'https://login.microsoftonline.com/<tenant-id>',
       redirectUri: 'http://localhost:4200',
       protectedResourceScopes: { '<api-scope-uri>': ['<scope>'] }
     },
     apiBaseURL: 'http://localhost:8080/api'
   };
   ```

   Ajuste `apiBaseURL` al puerto real en el que se ejecuta el backend (por defecto `http://127.0.0.1:8000`).

4. Inicie el servidor de desarrollo:

   ```powershell
   npm start
   ```

5. Acceda a la aplicación en [http://localhost:4200](http://localhost:4200).

### Otros Comandos Disponibles

| Comando                             | Descripción                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `npm run build`                     | Genera la compilación de producción (incluye SSR).      |
| `npm run watch`                     | Compila en modo desarrollo con observación de cambios.  |
| `npm test`                          | Ejecuta las pruebas unitarias.                          |
| `npm run serve:ssr:frontend-simple` | Sirve la build de producción con Server-Side Rendering. |

## Ejecución Conjunta

Para trabajar con ambas aplicaciones simultáneamente, ejecute cada servidor en una terminal independiente:

- Terminal 1: backend en `http://127.0.0.1:8000` (pasos de la sección "Puesta en Marcha del Backend").
- Terminal 2: frontend en `http://localhost:4200` (pasos de la sección "Puesta en Marcha del Frontend").

**Nota sobre CORS:** el backend no tiene configurado actualmente un middleware de CORS. Si el frontend consume la API desde un origen distinto (por ejemplo, `http://localhost:4200` contra `http://127.0.0.1:8000`), las peticiones serán bloqueadas por el navegador hasta que se habilite `CORSMiddleware` en FastAPI para el origen del frontend.

## Autenticación

El frontend utiliza `@azure/msal-angular` para proteger sus rutas mediante Microsoft Entra ID. Es necesario contar con una aplicación registrada en Azure Portal con el `redirectUri` configurado en `http://localhost:4200` para el entorno de desarrollo local.
