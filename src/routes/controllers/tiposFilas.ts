import { FastifyRequest, FastifyReply } from "fastify";
import { retornarTiposFilas } from "../../services/tipoFilas.services";

/**
 * Função genérica para lidar com erros de validação do Zod
 */
export const requestTipoFilas = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  try {
    const result = await retornarTiposFilas()
    return reply.status(200).send(result);
  } catch (error) {
    return reply.status(400).send(error);
  }
};

