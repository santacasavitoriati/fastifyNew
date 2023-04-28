import { confirmarLeito } from './../../schema';
import { FastifyInstance } from "fastify";
import { updateCleanLeitos } from "./controllers/confirmarLimpeza";
import { getLeitosVagos } from "./controllers/leitos";
import { login } from "./controllers/login";
import { getRequestHandle } from "./controllers/requestHandle";
import { authMiddleware } from "./firebase";
import { jwtMiddleware } from "./middleware/jwtVeify";
import { requestPassword } from './controllers/gerarSenha';
import { requestTipoFilas } from './controllers/tiposFilas';
import { requestFilas } from './controllers/retornarFilas';




export async function appRoutes(app: FastifyInstance) {
  app.route({
    method: "POST",
    url: "/gerarSenha",
    preHandler: jwtMiddleware,
    handler: requestPassword,
  });

  app.route({
    method: "GET",
    url: "/retornarTiposFilas",
    preHandler: jwtMiddleware,
    handler: requestTipoFilas,
  });

  app.route({
    method: "GET",
    url: "/retornarFilas",
    preHandler: jwtMiddleware,
    handler: requestFilas,
  });

  app.route({
    method: "POST",
    url: "/login",
    preHandler: authMiddleware,
    handler: login,
  });
}
