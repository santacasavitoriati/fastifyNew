import { execute } from "../database/conn";
import oracledb from "oracledb";
import { retornarTiposFilas } from "./tipoFilas.services";

const BIND_IN = oracledb.BIND_IN;
const BIND_OUT = oracledb.BIND_OUT;
const NUMBER = oracledb.NUMBER;
const STRING = oracledb.STRING;
const CURSOR = oracledb.CURSOR;


const prRetornarFilas = `mvintegra.pkg_totem_senha.pr_retorna_filas`
export const retornarFilas = async (params: string) => {
  const bindVars = {
    pCodigoMaquina: { dir: BIND_IN, type: STRING, val: params },
    pCursor: { dir: BIND_OUT, type: oracledb.CURSOR},
    pValido: { dir: BIND_OUT, type: STRING,},
    pTxMensagem: { dir: BIND_OUT, type: STRING },
  };
  const opts = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  };
  const sql = `BEGIN ${prRetornarFilas}(:pCodigoMaquina, :pCursor, :pValido, :pTxMensagem); END;`
  try {
      const result = await execute(sql, bindVars, opts);
       const tiposFilas = await retornarTiposFilas()

      if (result.length > 0) {
        const novoTiposFilas = tiposFilas.map(element => ({
          CodigoTipoFila: element.TPFILA,
          DescricaoTipoFila: element.DS_TPFILA,
          ObservacaoTipoFila: element.OBS_TPFILA != null ? element.OBS_TPFILA : ''
        }));
        const novoResultado = result[0].map(element => ({
          CodigoFila: element.CDFILA,
          DescricaoFila: element.DSFILA,
        }));
        
        return {Filas:novoResultado, 
        TiposFilas: novoTiposFilas}
      }
      // return {Message: 'Não há registro válidos'}
      return result
  } catch (error) {
    throw new Error(
      `Erro ao retornar filas: ${error.message}`
    );
  }
};
