import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { IGerarSenha, gerarSenha } from "../../services/gerarSenha.services";

/**
 * Função genérica para lidar com erros de validação do Zod
 */
export const handleValidationError = (error: z.ZodError, reply: FastifyReply) => {
  const errors = error.errors.map((err) => {
    const message = err.message.replace(/"/g, "'");
    return `${err.path.join(".")} ${message}`;
  });
  return reply.status(400).send({ message: "Validation Error", errors });
};



export const requestPassword = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestPasswordSchema = z.object({
    codigoMaquina: z.string(),
    cdFila: z.number(),
    tpFila: z.string(),
  });

  try {
    const params: IGerarSenha = requestPasswordSchema.parse(
      request.body
    ) as IGerarSenha;
    const result = await gerarSenha(params);
    return reply.status(200).send(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error, reply);
    }
    return reply.status(400).send(error);
  }
};

