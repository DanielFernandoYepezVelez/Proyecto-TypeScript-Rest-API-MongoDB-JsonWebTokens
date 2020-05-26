/* Estoy Agregando Una Nueva Propiedad A La Interface Request, Para Obtener El Payload Del Token Y asi, Poder Pasar El Middleware Del ValidaToken En Todas Las Rutas Y Obtener El Id Del Usuario Que Se Encuentra En El Payload */
declare namespace Express {
  export interface Request {
    userId;
  }
}
