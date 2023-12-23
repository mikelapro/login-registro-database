import{ config } from '../models/config.js';
import * as errors from '../errors/index.js';

/**
 * Verifica que las credenciales especificadas sean validas, si lo son, devuelve un token 
 * jwt.
 * @param {Object} credenciales Credenciales ingresadas por el usuario.
 * @returns Un token jwt.
 * @throws {InvalidCredentials} Cuando las credenciales son incorrectas.
 */
export const login = async ( credenciales ) => {
    let response;
    let objResponse;
    const endpoint = `${config.apiBaseUri}/login`;
    const body = JSON.stringify( credenciales );

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
            throw new errors.UserNameAlreadyExist;
        } else {
            throw new Error( objResponse.message );
        }
    }

    return objResponse; // response
};
