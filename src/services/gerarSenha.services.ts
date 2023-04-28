import { execute } from "../database/conn";
import oracledb from "oracledb";

export interface IGerarSenha {
  codigoMaquina: string;
  cdFila: number;
  tpFila: string;
}

const BIND_IN = oracledb.BIND_IN;
const BIND_OUT = oracledb.BIND_OUT;
const NUMBER = oracledb.NUMBER;
const STRING = oracledb.STRING;

const bindVars = {
  pCodigoMaquina: { dir: BIND_IN, type: NUMBER },
  pCdFilas: { dir: BIND_IN, type: NUMBER,},
  pTpFilas: { dir: BIND_IN, type: STRING,},
  pValido: { dir: oracledb.BIND_OUT, type: STRING, maxSize: 200 },
  pTxMensagem: { dir: oracledb.BIND_OUT, type: STRING, maxSize: 200  },
  pSenha: { dir: oracledb.BIND_OUT, type: STRING, maxSize: 200  },
};
const prGerarSenha = `mvintegra.pkg_totem_senha.pr_gerar_senha`
export const gerarSenha = async (params: IGerarSenha) => {
  const { codigoMaquina, cdFila, tpFila } = params;
  const variables = {
    pCodigoMaquina: codigoMaquina,
    pCdFilas: cdFila,
    pTpFilas: tpFila,
  };

  const opts = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  };
  const sql = `BEGIN ${prGerarSenha}(:pCodigoMaquina, :pCdFilas, :pTpFilas, :pValido, :pTxMensagem, :pSenha); END;`
  try {
      const result = await execute(sql,{ ...bindVars, ...variables }, opts);
      return result.outBinds.pSenha != null ? {Message: result.outBinds.pSenha} : {Message: result.outBinds.pTxMensagem};
  } catch (error) {
    throw new Error(
      `Erro ao gerar a senha: ${error.message}`
    );
  }
};
