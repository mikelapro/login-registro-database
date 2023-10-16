import { Usuario } from '../models/usuario.js';

// Agrega un EventListener al elemento confirmar-contrasena para escuchar
// el evento blur y llamar a la funcion validarConfirmacion.
document.getElementById( 'input-confirmar-contrasena' ).addEventListener( 'blur', validarConfirmacion );

// Valida que la confirmacion de la contraseña sea igual a la contraseña.
function validarConfirmacion() {
    let ret;

    let inputConfirmarContrasena = document.getElementById( 'input-confirmar-contrasena' );
    let inputContrasena = document.getElementById( 'input-contrasena' );

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
}

// Registra un usuario con los datos cargados en el formulario.
function registrarUsuario() {
    // TODO: Guardar los datos en base de datos.
    let usuario = getUsuario();
    console.log( 'Usuario:', usuario );

    return usuario;
}

// Crea un nuevo usuario con los datos cargados en el formulario.
function getUsuario() {
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
}

( function () {
    'use strict';

    // Obtiene todos los formularios a los que queremos aplicar estilos de validación 
    // de Bootstrap personalizados.
    var forms = document.querySelectorAll( '.needs-validation' );

    // Validoción de datos del formilario (Bootstrap).
    Array.prototype.slice.call( forms )
        .forEach( function ( form ) {  
            form.addEventListener( 'submit', function ( event ) {
                if ( !form.checkValidity() || !validarConfirmacion() ) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {

                    // Registra un usuario con los datos cargados en el formulario.
                    let usuario = registrarUsuario();

                    event.preventDefault();
                    event.stopPropagation();
                    window.location.href = 'main.html?nombre=' + usuario.nombre;
                }

                form.classList.add( 'was-validated' );

            }, false );
        } );
} )();
