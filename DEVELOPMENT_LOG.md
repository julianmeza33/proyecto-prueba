# Registro de desarrollo — API de Gestión de Tareas

## 1. Uso de herramientas de IA

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo para resolver dudas técnicas, revisar implementaciones, corregir errores y mejorar la organización del código.

La IA se utilizó como asistente, no como sustituto de la verificación del desarrollador. Las propuestas se revisaron y se comprobaron mediante compilación y pruebas manuales de los endpoints.

## 2. Decisiones técnicas

### Decisión 1: PostgreSQL y Prisma ORM

- **Decisión:** utilizar PostgreSQL como base de datos y Prisma ORM para el acceso a los datos.
- **Motivo:** PostgreSQL permite mantener relaciones entre usuarios y tareas, mientras que Prisma facilita las consultas y la gestión del esquema.
- **Verificación:** se creó la base de datos, se ejecutaron las migraciones y se comprobó el funcionamiento de las operaciones CRUD.

### Decisión 2: Autenticación JWT y contraseñas cifradas mediante hash

- **Decisión:** utilizar JWT para autenticar solicitudes y bcrypt para almacenar las contraseñas mediante hash.
- **Motivo:** proteger las rutas privadas y evitar almacenar contraseñas en texto plano.
- **Verificación:** se probaron el inicio de sesión, las credenciales incorrectas y el acceso a las tareas mediante tokens.

### Decisión 3: Control de acceso a las tareas

- **Decisión:** filtrar las consultas y operaciones por el identificador del usuario autenticado.
- **Motivo:** impedir que un usuario consulte, modifique o elimine tareas pertenecientes a otra cuenta.
- **Verificación:** se realizaron solicitudes con dos usuarios diferentes y se comprobó que el segundo no podía acceder a las tareas del primero.

### Decisión 4: Manejo centralizado de errores

- **Decisión:** crear clases de error personalizadas y un middleware centralizado.
- **Motivo:** mantener respuestas de error consistentes y separar el manejo de errores de la lógica de los controladores.
- **Verificación:** se compiló el proyecto y se revisaron los flujos de autenticación y tareas.

## 3. Validación y documentación

- Se utilizó Zod para validar los datos recibidos por la API.
- Se configuró Swagger UI para consultar los endpoints y sus esquemas.
- Se ejecutó `npm.cmd run build` y la compilación terminó sin errores.
- Se probaron manualmente las operaciones CRUD y los controles de acceso entre usuarios.

## 4. Uso de IA y revisión humana

La IA proporcionó sugerencias de implementación, estructura, validación y manejo de errores. Las modificaciones se aplicaron de manera progresiva y se revisaron mediante compilación y pruebas manuales.

Las decisiones sobre las tecnologías utilizadas, la configuración del entorno, las comprobaciones realizadas y la aceptación de los cambios se mantuvieron bajo revisión del desarrollador.


## 5. Estado de verificación

- [x] Ejecutar las pruebas automatizadas.
- [x] Verificar la compilación de TypeScript.
- [x] Probar manualmente las operaciones CRUD.
- [x] Comprobar el aislamiento de tareas entre usuarios.
- [x] Configurar y consultar la documentación Swagger.
- [ ] Verificar la instalación desde un clon limpio.
- [ ] Completar la revisión final y publicar los cambios en GitHub.

## 6. Pruebas automatizadas

Se configuró Vitest y se añadió el script `test` en `package.json`.

El archivo `tests/schemas.test.ts` contiene 11 pruebas de validación de autenticación y tareas.

**Resultado verificado:** 11 de 11 pruebas aprobadas. La compilación con `npm.cmd run build` también terminó sin errores.

Estas pruebas cubren los esquemas de validación; no sustituyen las pruebas de integración HTTP y base de datos.

## 7. Registro de decisiones asistidas por IA

### Decisión 1: Validación de datos con Zod

- **Necesidad:** validar los datos recibidos en los endpoints de autenticación y tareas.
- **Propuesta aplicada:** utilizar esquemas de Zod para validar los datos antes de ejecutar la lógica de negocio.
- **Motivo de aceptación:** permite rechazar datos inválidos y mantener las reglas de validación centralizadas.
- **Verificación:** se ejecutaron 11 pruebas automatizadas; todas fueron aprobadas.
- **Evidencia:** `src/api/schemas/auth.schema.ts`, `src/api/schemas/task.schema.ts` y `tests/schemas.test.ts`.

### Decisión 2: Control de acceso por propietario

- **Necesidad:** evitar que un usuario acceda a las tareas de otra cuenta.
- **Implementación:** las operaciones de consulta, actualización y eliminación se limitan al identificador del usuario autenticado.
- **Motivo:** cada usuario debe poder gestionar únicamente sus propias tareas.
- **Verificación:** se realizaron pruebas manuales con dos usuarios y se comprobó que uno no podía consultar, modificar ni eliminar las tareas del otro.
- **Evidencia:** `src/services/task.service.ts` y `src/controllers/task.controller.ts`.

### Decisión 3: Manejo centralizado de errores

- **Necesidad:** evitar que cada controlador implemente por separado todas las respuestas de error.
- **Implementación:** se crearon errores personalizados y un middleware centralizado.
- **Motivo:** mejorar la consistencia de las respuestas y separar responsabilidades.
- **Verificación:** la compilación de TypeScript terminó sin errores.
- **Evidencia:** `src/api/errors/app-error.ts` y `src/api/middlewares/error.middleware.ts`.

### Limitaciones de las verificaciones

Las pruebas automatizadas actuales cubren la validación de datos. Las comprobaciones de CRUD y autorización se realizaron manualmente. No se afirma que existan pruebas automatizadas de integración HTTP o de base de datos.
