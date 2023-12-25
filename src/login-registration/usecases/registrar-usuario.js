import{ config } from '../models/config.js';
import * as errors from '../errors/index.js';

/**
 * Regristra el usuario especificado mediante el endpoint POST /usuarios.
 * @param {Usuario} usuario El usuario a registrar.
 * @returns El usuario registrado con su nuevo id.
 * @throws {UserNameAlreadyExist} Cuando el nombre de usuario ya existe en la base de datos.
 * @throws {ApiHitFail} Cuando la api está apagada.
 */
export const registrarUsuario = async ( usuario ) => {

    let response;
    let objResponse;
    const endpoint = `${config.apiBaseUri}/usuarios`;
    const body = JSON.stringify( usuario );

    try {
        // Hit al API.
        response = await fetch( endpoint, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        } );

        // Convierte el json del response en objeto.
        objResponse = await response.json();

    } catch ( error ) {
        // *NOTE: La función fetch() no toma como error los 400/500, los toma como una 
        // * respuesta válida. Si es error o no, hay que tratarlo dentro del Try con 
        // * response.ok=true/false. Solo da error por falla en la conexión (si está apagada).
        throw new errors.ApiHitFail( endpoint );
    }

    // Si el response NO es ok (ej. error 400, 500, etc.)
    if ( !response.ok ){
        if( objResponse.errorCode == 'UserNameAlreadyExist' ){
            throw objResponse;
        } else {
            throw new Error( objResponse.message );
        }
    }

    return objResponse;
};
