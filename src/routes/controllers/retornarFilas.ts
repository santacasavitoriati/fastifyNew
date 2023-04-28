import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { handleValidationError } from "./gerarSenha";
import { retornarFilas } from "../../services/retornarFilas.services";

/**
 * Função genérica para lidar com erros de validação do Zod
 */


export const requestFilas= async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestPasswordSchema = z.object({
    codigoMaquina: z.string()
  });

  try {
    const {codigoMaquina} = requestPasswordSchema.parse(
      request.query
    )
    const result = await retornarFilas(codigoMaquina);
    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error, reply);
    }
    return reply.status(400).send(error);
  }
};

