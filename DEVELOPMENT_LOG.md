# Registro de desarrollo — API de Gestión de Tareas

## 1. Uso de herramientas de IA

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo de la API para resolver dudas técnicas, revisar implementaciones, corregir errores y mejorar la organización del código.

La IA se empleó como asistente durante el proceso de desarrollo, no como sustituto de la revisión del desarrollador. Las propuestas se evaluaron según los requisitos de la prueba técnica y se comprobaron mediante la revisión del código, pruebas automatizadas, compilación y verificaciones manuales.

## 2. Decisiones técnicas

### 2.1. PostgreSQL y Prisma ORM

- **Decisión:** utilizar PostgreSQL como base de datos y Prisma ORM para acceder a los datos.
- **Motivo:** PostgreSQL permite mantener relaciones entre usuarios y tareas, mientras que Prisma facilita las consultas y la gestión del esquema.
- **Verificación:** se creó la base de datos, se ejecutaron las migraciones y se comprobó el funcionamiento de las operaciones CRUD.

### 2.2. Autenticación JWT y contraseñas mediante hash

- **Decisión:** utilizar JWT para autenticar las solicitudes y bcrypt para almacenar las contraseñas mediante hash.
- **Motivo:** proteger las rutas privadas y evitar almacenar contraseñas en texto plano.
- **Verificación:** se probaron el inicio de sesión, las credenciales incorrectas y el acceso a las tareas mediante tokens.

### 2.3. Control de acceso a las tareas

- **Decisión:** limitar las consultas y operaciones sobre tareas al identificador del usuario autenticado.
- **Motivo:** impedir que un usuario consulte, modifique o elimine tareas pertenecientes a otra cuenta.
- **Verificación:** se realizaron comprobaciones manuales con dos usuarios diferentes para verificar el aislamiento de sus tareas.

### 2.4. Manejo centralizado de errores

- **Decisión:** implementar errores de aplicación personalizados y un middleware centralizado.
- **Motivo:** mantener respuestas de error consistentes y separar el manejo de errores de la lógica de los controladores.
- **Verificación:** se compiló el proyecto y se revisaron los flujos de autenticación y gestión de tareas.

## 3. Validación y documentación de la API

- Se utilizó Zod para validar los datos recibidos por los endpoints de autenticación y tareas.
- Se configuró Swagger UI para consultar la documentación de los endpoints y sus esquemas.
- Se añadió la configuración de pruebas automatizadas mediante Vitest.
- Se ejecutó `npm.cmd run build` y la compilación de TypeScript finalizó sin errores.
- Se probaron manualmente las operaciones CRUD y los controles de acceso entre usuarios.

## 4. Proceso de revisión y toma de decisiones

Durante el desarrollo se revisaron las propuestas de implementación y se evaluó su adecuación a los requisitos de la prueba técnica.

Las decisiones sobre las tecnologías utilizadas, la organización del proyecto, la configuración del entorno y los controles de acceso se mantuvieron bajo revisión del desarrollador.

Además, se revisó la estructura de las carpetas y se ajustaron partes de la implementación para mejorar la organización, la separación de responsabilidades y el flujo de ejecución.

La aceptación de los cambios se basó en la revisión del código y en los resultados de las verificaciones realizadas.

## 5. Estado de verificación

- [x] Ejecutar las pruebas automatizadas.
- [x] Verificar la compilación de TypeScript.
- [x] Probar manualmente las operaciones CRUD.
- [x] Comprobar el aislamiento de tareas entre usuarios.
- [x] Configurar y consultar la documentación Swagger.
- [x] Verificar la instalación desde un clon limpio.
- [x] Completar la revisión final y publicar los cambios en GitHub.

## 6. Pruebas automatizadas

Se configuró Vitest y se añadió el script `test` en `package.json`.

El archivo `tests/schemas.test.ts` contiene 11 pruebas de validación de los esquemas de autenticación y tareas.

**Resultado verificado:** las 11 pruebas finalizaron correctamente. La compilación mediante `npm.cmd run build` también terminó sin errores.

Estas pruebas cubren los esquemas de validación. No sustituyen las pruebas de integración HTTP ni las pruebas automatizadas de acceso a la base de datos.

## 7. Registro de decisiones asistidas por IA

### 7.1. Validación de datos con Zod

- **Necesidad:** validar los datos recibidos en los endpoints de autenticación y tareas.
- **Propuesta aplicada:** utilizar esquemas de Zod antes de ejecutar la lógica de negocio.
- **Motivo de aceptación:** centralizar las reglas de validación y rechazar datos que no cumplen los esquemas definidos.
- **Verificación:** se ejecutaron las pruebas automatizadas de validación y todas fueron aprobadas.
- **Evidencia:** `src/api/schemas/auth.schema.ts`, `src/api/schemas/task.schema.ts` y `tests/schemas.test.ts`.

### 7.2. Control de acceso por propietario

- **Necesidad:** impedir que un usuario acceda a las tareas de otra cuenta.
- **Implementación:** limitar las operaciones sobre tareas al identificador del usuario autenticado.
- **Motivo de aceptación:** garantizar que cada usuario gestione únicamente sus propias tareas.
- **Verificación:** se realizaron comprobaciones manuales con dos usuarios diferentes.
- **Evidencia:** `src/services/task.service.ts` y `src/controllers/task.controller.ts`.

### 7.3. Manejo centralizado de errores

- **Necesidad:** evitar que cada controlador implemente por separado todas las respuestas de error.
- **Implementación:** incorporar errores personalizados y un middleware centralizado.
- **Motivo de aceptación:** mejorar la consistencia de las respuestas y separar responsabilidades.
- **Verificación:** la compilación de TypeScript terminó sin errores.
- **Evidencia:** `src/api/errors/app-error.ts` y `src/api/middlewares/error.middleware.ts`.

### 7.4. Evaluación de propuestas y criterios de aceptación

Durante el desarrollo, la mayoría de las propuestas de IA que resultaron pertinentes se aceptaron después de revisar su adecuación a los requisitos del proyecto. No se registraron rechazos significativos, ya que las soluciones implementadas se comprobaron mediante pruebas automatizadas, compilación de TypeScript y verificaciones manuales.

La aceptación de una propuesta no se basó únicamente en la recomendación de la IA, sino también en la revisión del código y en los resultados obtenidos. Cuando fue necesario, se ajustó la implementación para mantener la estructura del proyecto, separar responsabilidades y asegurar el comportamiento esperado.

Las pruebas automatizadas se utilizaron para comprobar los esquemas de validación. Las operaciones CRUD y el aislamiento de tareas entre usuarios se verificaron manualmente. No se presentan estas comprobaciones manuales como pruebas automatizadas de integración.

## 8. Retos y soluciones

### 8.1. Validación de credenciales y respuestas de autenticación

- **Reto:** comprobar el comportamiento del inicio de sesión con credenciales válidas e inválidas.
- **Solución:** revisar el flujo de autenticación y verificar las respuestas HTTP correspondientes.
- **Resultado:** se comprobó el comportamiento esperado mediante solicitudes manuales.

### 8.2. Manejo uniforme de errores

- **Reto:** centralizar las respuestas de error y evitar duplicar esta responsabilidad en los controladores.
- **Solución:** incorporar errores de aplicación personalizados y un middleware centralizado.
- **Resultado:** la compilación de TypeScript finalizó sin errores.

### 8.3. Protección de las tareas por usuario

- **Reto:** impedir el acceso a tareas pertenecientes a otras cuentas.
- **Solución:** limitar las operaciones al identificador del usuario autenticado.
- **Resultado:** se realizaron comprobaciones manuales con dos usuarios diferentes.

### 8.4. Verificación de la entrega

- **Reto:** comprobar que el proyecto pudiera instalarse y ejecutarse desde una copia independiente.
- **Solución:** clonar el repositorio, instalar las dependencias y ejecutar las pruebas, la compilación y las comprobaciones de los endpoints.
- **Resultado:** las 11 pruebas fueron aprobadas, la compilación finalizó sin errores, no había migraciones pendientes, `/health` respondió correctamente con conexión a la base de datos y `/api-docs` devolvió HTTP 200.

## 9. Verificación desde un clon limpio

Se clonó el repositorio de GitHub en una carpeta independiente y se instalaron las dependencias mediante `npm.cmd ci`.

Resultados obtenidos:

- **Pruebas automatizadas:** 11 de 11 aprobadas.
- **Compilación de TypeScript:** finalizada sin errores.
- **Migraciones:** no había migraciones pendientes.
- **Endpoint `/health`:** respuesta correcta y conexión exitosa a la base de datos.
- **Documentación `/api-docs`:** respuesta HTTP 200.

Esta comprobación se realizó desde una copia independiente del repositorio, sin modificar el proyecto original.

## 10. Trazabilidad de las solicitudes de IA

Las siguientes entradas resumen solicitudes representativas del trabajo realizado. Se presentan como descripciones de las consultas y no como transcripciones literales del historial.

### 10.1. Validación de datos

- **Solicitud:** revisar cómo validar los datos recibidos por los endpoints de autenticación y tareas.
- **Propuesta:** utilizar esquemas de Zod antes de ejecutar la lógica de negocio.
- **Decisión:** aceptar la propuesta porque permite centralizar las reglas de validación.
- **Verificación:** ejecutar las pruebas automatizadas de los esquemas.

### 10.2. Autenticación y autorización

- **Solicitud:** revisar el inicio de sesión, la validación de credenciales y la protección de las operaciones sobre tareas.
- **Propuesta:** comprobar el flujo de autenticación con JWT y limitar el acceso a las tareas según el usuario autenticado.
- **Decisión:** aplicar los controles correspondientes a los requisitos del proyecto.
- **Verificación:** realizar solicitudes manuales con credenciales válidas e inválidas y con dos usuarios diferentes.

### 10.3. Manejo de errores

- **Solicitud:** revisar cómo unificar las respuestas de error de los controladores.
- **Propuesta:** utilizar errores de aplicación personalizados y un middleware centralizado.
- **Decisión:** incorporar este enfoque para separar responsabilidades y mantener respuestas consistentes.
- **Verificación:** compilar el proyecto y revisar los flujos de autenticación y gestión de tareas.

### 10.4. Pruebas y documentación

- **Solicitud:** comprobar la validación, la compilación y la documentación disponible de la API.
- **Propuesta:** ejecutar las pruebas automatizadas, compilar el proyecto y consultar Swagger UI.
- **Decisión:** mantener las pruebas de validación y documentar sus límites, sin presentarlas como pruebas de integración.
- **Verificación:** 11 pruebas aprobadas, compilación correcta y consulta de `/api-docs` con HTTP 200.

### 10.5. Evaluación de propuestas

Las propuestas pertinentes se revisaron según los requisitos de la prueba técnica. La mayoría se aceptó después de comprobar su adecuación y funcionamiento. No se registraron rechazos significativos.

La revisión del desarrollador incluyó decisiones sobre la arquitectura, la estructura de carpetas, la separación de responsabilidades y los ajustes necesarios para mantener el comportamiento esperado.

## 11. Decisiones técnicas independientes y revisión del desarrollador

Durante el desarrollo se tomaron decisiones técnicas propias para definir la arquitectura y el funcionamiento de la API:

- **Persistencia de datos:** se eligieron PostgreSQL y Prisma ORM para almacenar y gestionar la información de la aplicación.
- **Autenticación y contraseñas:** se decidió utilizar JWT para autenticar las solicitudes y bcrypt para almacenar las contraseñas mediante hash.
- **Aislamiento de datos:** se estableció que cada usuario pudiera gestionar únicamente sus propias tareas, evitando el acceso no autorizado a recursos de otras cuentas.
- **Manejo de errores:** se decidió centralizar el tratamiento de errores mediante un middleware para mantener respuestas consistentes y separar esta responsabilidad de los controladores.

Además, se evaluó de manera independiente la estructura de las carpetas y se realizaron ajustes en partes de la implementación para mejorar la organización, la separación de responsabilidades y el flujo de ejecución.

Las propuestas de IA se utilizaron como apoyo y se evaluaron según los requisitos de la prueba técnica. La aceptación de los cambios y la comprobación de su funcionamiento se realizaron mediante la revisión del código, las pruebas automatizadas, la compilación y las verificaciones manuales.
