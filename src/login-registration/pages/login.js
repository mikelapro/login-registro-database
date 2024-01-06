import * as usecases from '../usecases/index.js';

// Obtiene los elementos del html que se requieren usar en JS.
let divMensajeError = document.querySelector( '#mensaje-error2' );
let inputUsuario = document.querySelector( '#usuario' );
let inputContrasena = document.querySelector( '#contrasena' );
const buttonIngresar = document.querySelector( '#button-ingresar' );

const login = async () => {
    limpiarFormulario();

    // Valida que el usuario haya ingresado los datos requeridos.
    if ( validarDatosRequeridos() == false ) {
        return;
    }

    try {
        // Deshabilita el botón (para que no haga varias veces click).
        buttonIngresar.disabled = true;

        const accessToken = await usecases.login( { nombreUsuario: inputUsuario.value, contrasena: inputContrasena.value } );
        localStorage.setItem( 'access-token', accessToken );

        // Está todo ok, lo mandamos al home.
        window.location.href = 'main.html';
        return;
    } catch ( error ) {
        let mensajeError;
        switch ( error.errorCode ) {
            case 'InvalidCredentials': 
                mensajeError = 'Las credenciales ingresadas son incorrectas. Intente nuevamente.';
                break;

            case 'ApiHitFail':
                mensajeError = error.message;
                break;

            default:
                mensajeError = error.message;
                break;
        }

        divMensajeError.innerHTML = mensajeError;
        divMensajeError.style.display = 'block';
        
        // Habilita el botón (para poder reintentar si da un error).
        buttonIngresar.disabled = false;
    }
};

/**
 * Valida que el usuario haya ingresado los datos requeridos.
 * @returns true, si todos los datos requeridos fueron ingresados. De lo contrario, false.
 */
const validarDatosRequeridos = () => {
    if ( inputContrasena.value == undefined
        || inputUsuario.value == undefined
        || inputContrasena.value == ''
        || inputUsuario.value == ''
        || inputContrasena.value.trim() == ''
        || inputUsuario.value.trim() == '' ) {
        divMensajeError.innerHTML = 'Debe ingresar las credenciales.';
        
        divMensajeError.style.display = 'block';

        return false;
    }

    return true;
};

/**
 * Limpia el mensaje de error anterior.
 */
const limpiarFormulario = () => {

    divMensajeError.innerHTML = '';
    divMensajeError.style.display = 'none';
};

// Escucha el evento click del elemento button-ingresar.
buttonIngresar.addEventListener( 'click', login );
