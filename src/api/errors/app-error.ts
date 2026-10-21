
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}
