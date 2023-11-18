import{ config } from '../models/config.js';

export const registrarUsuario = async ( usuario ) => {
    // *FIXED: Faltaba CORS y agregar /usuarios al uri.
    // TODO: Hay que devolver el reques pero con el usuario registrado, si no en el 
    // la línea 90 de register.js al querer leer el .nombre, da error.
    // !OJO: hay un response pero es raro, hay que convertirlo al usuario registrado.


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
        
    } catch (error) {
        console.log( error );
    }



    console.log( response );
};
