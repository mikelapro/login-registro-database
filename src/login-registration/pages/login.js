// import { checkCredenciales } from '../usecases/check-credenciales.js';
import * as usecases from '../usecases/index.js';

let credencialesValidas = [
    'mike|7777',
    'esteban|orlando',
    'samanta|miami'];

// Obtiene los elementos del html que se requieren usar en JS.
let divMensajeError = document.querySelector( '#mensaje-error2' );
let inputUsuario = document.querySelector( '#usuario' );
let inputContrasena = document.querySelector( '#contrasena' );

const login = async () => {
    // Valida que el usuario haya ingresado los datos requeridos.
    if ( validarDatosRequeridos() == false ) {
        return;
    }

    try {
        const token = await usecases.login( { nombreUsuario: inputUsuario.value, contrasena: inputContrasena.value } );
        console.log( token );
    } catch ( error ) {
        console.log( 'Credenciales incorrectas' );
    }
    

    // TODO 1: Llamar al caso de uso login(nu, pass) dentro de un try/catch.
    //         > Pegarle al api con fetch.
    // TODO 2: Controlar los errores que podría devolver el api.
    //         > Mostrar un mensaje al usuario para cada error.
    // TODO 3: Si se ejecuta sin errores,
    //         > Guardar el token en el local storage.
    //         > reenviar al main.



    if ( checkCredenciales() == false ) {
        // Credenciales incorrectas.
        divMensajeError.innerHTML = 'El nombre de usuario o la contraseña son incorrectos.';
        divMensajeError.style.display = 'block';
    } else {
        // Credenciales correctas.
        //mensajeError.innerHTML = "Bienvenido!";
        divMensajeError.style.display = 'none';

        // Redirige a home.html y le pasa por queryString el parametro nombre.
        let usuarioValue = inputUsuario.value;
        window.location.href = 'main.html?nombre=' + usuarioValue;
        //window.location.href = `main.html?nombre=${usuarioValue}`;
    }
};

/**
 * Valida que el usuario haya ingresado los datos requeridos.
 * @returns true, si todos los datos requeridos fueron ingresados. De lo contrario, false.
 */
const validarDatosRequeridos = () => {
    // Limpia el mensaje de error anterior.
    divMensajeError.innerHTML = '';
    divMensajeError.style.display = 'none';

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

// TODO: Todo esto ya no sirve, lo va a hacer el caso de uso.
/**
 * Verifica que las credenciales sean correctas.
 * @param {String} usuario 
 * @param {String} contrasena 
 * @returns true, si las credenciales son correctas. De lo contrario false.
 */
const checkCredenciales = () => {
    // Credenciales ingresadas por el usuario.
    const credencialesIngresadas = inputUsuario.value.toLowerCase() + '|' + inputContrasena.value;

    // TODO: Cambiar credencialesValidas por las obtenidas de la base de datos.
    // TODO: Obteber al usuario correspondiente al nombre de usuario ingresado de la base de datos.
    // TODO: Si no se encuentra el usuario en la base de datos mostrar un mensaje al usuario.
    if ( credencialesIngresadas == credencialesValidas[0]
        || credencialesIngresadas == credencialesValidas[1]
        || credencialesIngresadas == credencialesValidas[2] ) {

        return true;
    }

    return false;
};

// Escucha el evento click del elemento button-ingresar.
document.querySelector( '#button-ingresar' ).addEventListener( 'click', login );
