/**
 * Error personalizado para lanzar cuando el nombre de usuario ya existe en la base de datos.
 */
export class UserNameAlreadyExist extends Error {
    constructor() {
        super( 'Este nombre de usuario ya existe.' );
        this.errorCode = 'UserNameAlreadyExist';
    }
}
