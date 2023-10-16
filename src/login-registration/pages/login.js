
let credencialesValidas = [
    'mike|7777',
    'esteban|orlando',
    'samanta|miami'];

document.querySelector( '#button-ingresar' ).addEventListener( 'click', () => {
    let divMensajeError = document.querySelector( '#mensaje-error2' );
    let inputUsuario = document.querySelector( '#usuario' );
    let inputContrasena = document.querySelector( '#contrasena' );

    // Lmpia el mensaje de error anterior.
    divMensajeError.innerHTML = '';
    divMensajeError.style.display = 'none';

    // Valida que el usuario haya ingresado datos.
    if ( inputContrasena.value == undefined
        || inputUsuario.value == undefined
        || inputContrasena.value == ''
        || inputUsuario.value == ''
        || inputContrasena.value.trim() == ''
        || inputUsuario.value.trim() == '' ) {
        divMensajeError.innerHTML = 'Debe ingresar las credenciales.';
        divMensajeError.style.display = 'block';

        return;
    }

    let flagCredencialesOk;

    // Credenciales ingresadas por el usuario.
    const credencialesIngresadas = inputUsuario.value.toLowerCase() + '|' + inputContrasena.value;
    
    // Asigna al Flag si las credenciales son correctas o no.
    // TODO: Cambiar credencialesValidas por las obtenidas de la base de datos.
    // TODO: Obteber al usuario correspondiente al nombre de usuario ingresado de la base de datos.
    // TODO: Si no se encuentra el usuario en la base de datos mostrar un mensaje al usuario.
    if ( credencialesIngresadas == credencialesValidas[0]
        || credencialesIngresadas == credencialesValidas[1]
        || credencialesIngresadas == credencialesValidas[2] ) {

        flagCredencialesOk = true;
    } else {
        flagCredencialesOk = false;
    }

    if ( flagCredencialesOk == false ) {
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
} );
