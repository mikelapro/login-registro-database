import { checkApp } from '../usecases/check-app.js';

checkApp();

// Obtiene el valor del parámetro nombre del QueryString.
function getNombreFromQueryString() {
    let querystring = window.location.search;
    let parametros = new URLSearchParams( querystring );
    let parametroNombre = parametros.get( 'nombre' );

    return parametroNombre;
}

let h1NombreUsuario = document.getElementById( 'h1-bienvenida' );
h1NombreUsuario.innerHTML = 'Bienvenido ' + getNombreFromQueryString() + '!';