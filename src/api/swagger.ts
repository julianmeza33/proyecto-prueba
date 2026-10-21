
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Tareas",
      version: "1.0.0",
      description:
        "API REST para registrar usuarios, autenticarlos con JWT y gestionar sus tareas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterInput: {
          type: "object",
          required: ["nombre", "email", "password"],
          properties: {
            nombre: { type: "string", example: "Juan Pérez" },
            email: { type: "string", format: "email", example: "juan@example.com" },
            password: { type: "string", minLength: 8, example: "ClaveSegura2026!" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "juan@example.com" },
            password: { type: "string", example: "ClaveSegura2026!" },
          },
        },
        TaskInput: {
          type: "object",
          required: ["titulo"],
          properties: {
            titulo: { type: "string", example: "Completar la prueba técnica" },
            descripcion: {
              type: "string",
              nullable: true,
              example: "Finalizar y documentar la API",
            },
            fecha_vencimiento: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-11-01T18:00:00Z",
            },
            estado: {
              type: "string",
              enum: ["pendiente", "en curso", "completada", "cancelada"],
              example: "pendiente",
            },
          },
        },
      },
    },
    paths: {
      "/health": {
        get: {
          tags: ["Sistema"],
          summary: "Comprobar el estado de la API y la base de datos",
          responses: {
            "200": { description: "Servicio disponible" },
            "500": { description: "Error del servicio o de la base de datos" },
          },
        },
      },
      "/auth/register": {
        post: {
          tags: ["Autenticación"],
          summary: "Registrar un usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterInput" },
              },
            },
          },
          responses: {
            "201": { description: "Usuario registrado" },
            "400": { description: "Datos inválidos" },
            "409": { description: "El correo ya está registrado" },
            "500": { description: "Error interno del servidor" },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Autenticación"],
          summary: "Iniciar sesión y obtener un token JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginInput" },
              },
            },
          },
          responses: {
            "200": { description: "Inicio de sesión correcto; devuelve token y usuario" },
            "400": { description: "Datos inválidos" },
            "401": { description: "Credenciales incorrectas" },
            "500": { description: "Error interno del servidor" },
          },
        },
      },
      "/tasks": {
        get: {
          tags: ["Tareas"],
          summary: "Listar las tareas del usuario autenticado",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": { description: "Lista de tareas" },
            "401": { description: "Token ausente, inválido o expirado" },
          },
        },
        post: {
          tags: ["Tareas"],
          summary: "Crear una tarea",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TaskInput" },
              },
            },
          },
          responses: {
            "201": { description: "Tarea creada" },
            "400": { description: "Datos inválidos" },
            "401": { description: "Autenticación requerida" },
          },
        },
      },
      "/tasks/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Identificador numérico de la tarea",
            schema: { type: "integer", minimum: 1 },
          },
        ],
        get: {
          tags: ["Tareas"],
          summary: "Consultar una tarea propia",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": { description: "Tarea encontrada" },
            "401": { description: "Autenticación requerida" },
            "404": { description: "Tarea no encontrada o no pertenece al usuario" },
          },
        },
        put: {
          tags: ["Tareas"],
          summary: "Actualizar una tarea propia",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/TaskInput" },
                  ],
                  description: "Envía uno o más campos para actualizar.",
                },
              },
            },
          },
          responses: {
            "200": { description: "Tarea actualizada" },
            "400": { description: "ID o datos inválidos" },
            "401": { description: "Autenticación requerida" },
            "404": { description: "Tarea no encontrada o no pertenece al usuario" },
          },
        },
        delete: {
          tags: ["Tareas"],
          summary: "Eliminar una tarea propia",
          security: [{ bearerAuth: [] }],
          responses: {
            "204": { description: "Tarea eliminada correctamente" },
            "401": { description: "Autenticación requerida" },
            "404": { description: "Tarea no encontrada o no pertenece al usuario" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
