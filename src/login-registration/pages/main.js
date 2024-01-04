import * as usecases from '../usecases/index.js';

// Obtiene el valor del parámetro nombre del QueryString.
// function getNombreFromQueryString() {
//     let querystring = window.location.search;
//     let parametros = new URLSearchParams( querystring );
//     let parametroNombre = parametros.get( 'nombre' );

//     return parametroNombre;
// }

let h1NombreUsuario = document.getElementById( 'h1-bienvenida' );

/**
 * 
 */
const mostrarDatosDelUsuario = async () => {

    try {
        const usuario = await usecases.getUsuario();
        h1NombreUsuario.innerHTML = `Bienvenido ${ usuario.nombre }!`;
        h1NombreUsuario.style.display = 'block';
    } catch ( error ) {
        // AccessTokenNotFound
        // JsonWebTokenError
        // ApiHitFail
        // TokenExpiredError

        //console.log( error );
        window.location.href = 'login.html';
    }
};

mostrarDatosDelUsuario();
