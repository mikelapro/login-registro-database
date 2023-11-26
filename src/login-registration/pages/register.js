import { Usuario } from '../models/usuario.js';
import * as usecases from '../usecases/index.js';
// import { registrarUsuario } from '../usecases/registrar-usuario.js';


/**
 * Valida que la confirmacion de la contraseña sea igual a la contraseña.
 * @returns true, si la contraseña y la confirmación son iguales. De lo contrario, false.
 */
const validarConfirmacion = () => {
    let ret;

    let inputConfirmarContrasena = document.querySelector( '#input-confirmar-contrasena' );
    let inputContrasena = document.querySelector( '#input-contrasena' );

    let inputConfirmarContrasenaValue = inputConfirmarContrasena.value;
    let inputContrasenaValue = inputContrasena.value;

    if ( inputConfirmarContrasenaValue != inputContrasenaValue ) {
        inputConfirmarContrasena.classList.add( 'is-invalid' );
        inputConfirmarContrasena.classList.remove( 'is-valid' );
        ret = false;
    } else {
        inputConfirmarContrasena.classList.remove( 'is-invalid' );
        inputConfirmarContrasena.classList.add( 'is-valid' );
        ret = true;
    }

    return ret;
};

/**
 * Registra un usuario con los datos cargados en el formulario.
 * @returns El usuario registrado.
 */
const registrarUsuario = async () => {
    let usuario = getUsuario();
    
    const registered = await usecases.registrarUsuario( usuario );

    return registered;
};

/**
 * Obtiene un usuario generado con los datos cargados en el formulario.
 * @returns Usuario con los datos cargados en el formulario.
 */
const getUsuario = () => {
    let inputUsuarioValue = document.querySelector( '#input-usuario' ).value;
    let inputNombreValue = document.querySelector( '#input-nombre' ).value;
    let inputApellidoValue = document.querySelector( '#input-apellido' ).value;
    let inputcontrasenaValue = document.querySelector( '#input-contrasena' ).value;
    let optionGenero = document.querySelector( '#option-genero' );

    let optionGeneroText = optionGenero.options[optionGenero.selectedIndex].text;

    let usuario = new Usuario(
        inputUsuarioValue,
        inputNombreValue,
        inputApellidoValue,
        inputcontrasenaValue,
        optionGeneroText );

    return usuario;
};

( function () {
    'use strict';

    // Obtiene todos los formularios a los que queremos aplicar estilos de validación 
    // de Bootstrap personalizados.
    const forms = document.querySelectorAll( '.needs-validation' );

    // Validoción de datos del formilario (Bootstrap).
    Array.prototype.slice.call( forms )
        .forEach( function ( form ) {
            form.addEventListener( 'submit', async function ( event ) {
                if ( !form.checkValidity() || !validarConfirmacion() ) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    event.stopPropagation();

                    // TODO: Agregar un cath y controlar los errores ApiHitFail y UserNameAlreadyExist
                    // y si se capturaron estos errores mostrar un mensaje acorde al usuario
                    // en el div de mensajes.
                    
                    // Registra un usuario con los datos cargados en el formulario.
                    let usuario = await registrarUsuario();

                    event.preventDefault();
                    event.stopPropagation();
                    window.location.href = 'main.html?nombre=' + usuario.nombre;
                }

                form.classList.add( 'was-validated' );

            }, false );
        } );
        
} )();

// Agrega un EventListener al elemento confirmar-contrasena para escuchar
// el evento blur y llamar a la funcion validarConfirmacion.
document.querySelector( '#input-confirmar-contrasena' ).addEventListener( 'blur', validarConfirmacion );
