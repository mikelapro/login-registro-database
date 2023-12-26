import { checkApp } from '../usecases/check-app.js';
import{ config } from '../models/config.js';

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


const prueba = async () => {
    // Obtiene el accessToken del local storage.
    let accessToken = localStorage.getItem( 'access-token' );
    console.log( accessToken );

    // 
    if ( accessToken == null || accessToken == undefined ) {
        window.location.href = 'login.html';
    }


    let response;
    let objResponse;
    const endpoint = `${config.apiBaseUri}/usuarios/auth`;
    //const body = JSON.stringify( usuario );

    // Hit al API.
    response = await fetch( endpoint, {
        method: 'GET',
        //body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    } );

    // Convierte el json del response en objeto.
    objResponse = await response.json();
    console.log( objResponse );
};

prueba();



// Obtiene el usuario autenticado (el usuario correspondiente al accessToken).