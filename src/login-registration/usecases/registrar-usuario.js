import{ config } from '../models/config.js';

/**
 * Regristra el usuario especificado mediante el endpoint POST /usuarios.
 * @param {Usuario} usuario El usuario a registrar.
 * @returns El usuario registrado con su nuevo id.
 */
export const registrarUsuario = async ( usuario ) => {

    let response = null;

    const endpoint = `${config.apiBaseUri}/usuarios`;
    const body = JSON.stringify( usuario );

    try {
        response = await fetch( endpoint, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        } );

        if ( !response.ok ){
            // TODO: ...
            // Analizar si se puede relanzar el error o crear uno nuevo.
        }
        
    } catch ( error ) {
        // *NOTE: La función fetch() no toma como error los 400/500, los toma como una 
        // * respuesta válida. Si es error o no, hay que tratarlo dentro del Try con 
        // * response.ok=true/false. Solo da error por falla en la conexión.
        console.log( error );
    }

    

    // TODO: Devolver el objeto y no el json.
    const jsonResponse = await response.json();

    return jsonResponse;
};
