import{ config } from '../models/config.js';
import * as errors from '../errors/index.js';

/**
 * Obtiene el usuario autenticado.
 * @returns El usuario autenticado.
 * @throws {AccessTokenNotFound} Cuando no se encuentra el accessToken en el LocalStorage.
 * @throws {ApiHitFail} Cuando falla el API.
 * @throws {JsonWebTokenError} Cuando el token es inválido.
 * @throws {TokenExpiredError} Cuando el token está expirado.
 */
export const getUsuario = async () => {
    // Obtiene el accessToken del local storage.
    let accessToken = localStorage.getItem( 'access-token' );
    console.log( accessToken );

    // Si no hay accessToken, redirigimos al login.
    if ( accessToken == null || accessToken == undefined ) {
        // AccessTokenNotFound.
        throw new errors.AccessTokenNotFound();
        //window.location.href = 'login.html';
    }

    // Obtiene el usuario autenticado vía API.
    let response;
    let objResponse;
    const endpoint = `${config.apiBaseUri}/usuarios/auth`;

    try {
        // Hit al API.
        response = await fetch( endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        } );
    
        // Convierte el json del response en objeto.
        objResponse = await response.json();
        console.log( objResponse );
        
    } catch ( error ) {
        // *NOTE: La función fetch() no toma como error los 400/500, los toma como una 
        // * respuesta válida. Si es error o no, hay que tratarlo dentro del Try con 
        // * response.ok=true/false. Solo da error por falla en la conexión (si está apagada).
        
        // ApiHitFail.
        throw new errors.ApiHitFail( endpoint );
    }

    // Si el response NO es ok (ej. error 400, 500, etc.).
    if ( !response.ok ){
        // JsonWebTokenError.
        // TokenExpiredError.
        throw new Error( objResponse.message );
    }

    return objResponse;
};
