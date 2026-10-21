# API REST de Gestión de Tareas

API REST desarrollada con Node.js, Express, TypeScript y PostgreSQL para administrar usuarios y sus tareas personales mediante autenticación JWT.

## Tecnologías

- Node.js y Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticación
- bcrypt para el hash de contraseñas
- Zod para validación de datos
- Swagger UI para documentación interactiva

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión con generación de token JWT.
- Contraseñas almacenadas mediante hash.
- Creación, consulta, actualización y eliminación de tareas.
- Protección de rutas mediante autenticación Bearer.
- Aislamiento de tareas por usuario: cada usuario solo puede acceder a sus propias tareas.
- Validación de datos y manejo centralizado de errores.
- Endpoint de comprobación del servicio y la base de datos.
- Documentación interactiva mediante Swagger.

## Arquitectura

El proyecto utiliza una organización por responsabilidades:

- `src/api/routes/`: definición de rutas HTTP.
- `src/api/middlewares/`: autenticación y manejo de errores.
- `src/api/schemas/`: esquemas de validación.
- `src/api/errors/`: clases de errores de aplicación.
- `src/controllers/`: recepción de solicitudes y construcción de respuestas.
- `src/services/`: lógica de negocio.
- `src/persistence/`: configuración y acceso a Prisma.
- `src/generated/prisma/`: cliente generado por Prisma.
- `prisma/`: esquema y migraciones de la base de datos.

## Requisitos

- Node.js y npm.
- PostgreSQL.
- Git.

## Instalación

Clona el repositorio y entra en la carpeta:

```bash
git clone https://github.com/julianmeza33/proyecto-prueba.git
cd proyecto-prueba
npm install
```

Crea el archivo `.env` tomando como referencia `.env.example`.

Configura las variables necesarias:

```dotenv
DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/proyecto-prueba?schema=public"
JWT_SECRET="REEMPLAZA_ESTO_POR_UN_SECRETO_ALEATORIO_DE_AL_MENOS_32_CARACTERES"
PORT=3000
```

Usa las credenciales de tu propia instalación de PostgreSQL. No publiques el archivo `.env` ni compartas secretos reales.

## Base de datos

Aplica las migraciones existentes:

```bash
npx prisma migrate deploy
npx prisma generate
```

En desarrollo, para crear nuevas migraciones cuando cambie el esquema, utiliza:

```bash
npx prisma migrate dev --name nombre_del_cambio
```

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

Compilación:

```bash
npm run build
```

Ejecución de la versión compilada:

```bash
npm start
```

## Documentación

Con el servidor en ejecución, visita:

http://localhost:3000/api-docs

## Endpoints principales

| Método | Ruta | Descripción | Autenticación |
|---|---|---|---|
| GET | `/health` | Comprobar el servicio y la base de datos | No |
| POST | `/auth/register` | Registrar un usuario | No |
| POST | `/auth/login` | Iniciar sesión y obtener un JWT | No |
| GET | `/tasks` | Listar tareas propias | Sí |
| POST | `/tasks` | Crear una tarea | Sí |
| GET | `/tasks/:id` | Consultar una tarea propia | Sí |
| PUT | `/tasks/:id` | Actualizar una tarea propia | Sí |
| DELETE | `/tasks/:id` | Eliminar una tarea propia | Sí |

## Autenticación

Para las rutas protegidas, envía el token JWT en el encabezado:

```http
Authorization: Bearer <token>
```

El token se obtiene mediante `POST /auth/login`.

## Estados de una tarea

Los estados disponibles son:

- `pendiente`
- `en curso`
- `completada`
- `cancelada`

## Seguridad y validaciones

- Las contraseñas se almacenan mediante hash con bcrypt.
- Las rutas de tareas requieren un token JWT válido.
- Las consultas y modificaciones de tareas se limitan al usuario autenticado.
- Los datos recibidos se validan mediante Zod.
- Los errores de aplicación se procesan mediante un middleware centralizado.

## Alcance

La API implementa autenticación mediante JWT, autorización por propietario y operaciones CRUD de tareas. La validación automatizada de esquemas se realiza con Vitest.

### Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm test
```

Las pruebas actuales verifican los esquemas de validación de autenticación y tareas. Para comprobar la compilación de TypeScript, ejecuta:

```bash
npm run build
```

### Nota para Windows PowerShell

En algunos equipos, PowerShell bloquea la ejecución de `npm.ps1` debido a la política de ejecución de scripts de Windows.

Si aparece ese error, utiliza `npm.cmd` en lugar de `npm`:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd test
npm.cmd run build
```

Esta alternativa permite ejecutar los comandos de npm sin modificar la política de seguridad de PowerShell.

Importante: esta nota es específica para Windows PowerShell. En Linux, macOS y otras terminales donde npm funcione normalmente, se pueden utilizar los comandos habituales.