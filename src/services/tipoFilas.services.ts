import { execute } from "../database/conn";
import oracledb from "oracledb";

const CURSOR = oracledb.CURSOR;
const BIND_OUT = oracledb.BIND_OUT;


const bindVars = {
  pCursor: { dir: BIND_OUT, type: CURSOR }
};
const prRetornarTiposFilas = `mvintegra.pkg_totem_senha.pr_retorna_tipos_fila`

export const retornarTiposFilas = async () => {
  const opts = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  };
  const sql = `BEGIN ${prRetornarTiposFilas}(:pCursor); END;`
  try {
      const result = await execute(sql, bindVars, opts);
      return result[0]
  } catch (error) {
    throw new Error(
      `Erro ao retornar tipos de filas: ${error.message}`
    );
  }
};
