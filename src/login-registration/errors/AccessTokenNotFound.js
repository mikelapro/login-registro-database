/**
 * Error personalizado para lanzar cuando no se encuentra el accessToken en el LocalStorage.
 */
export class AccessTokenNotFound extends Error {
    constructor() {
        super( 'No se encuentra el accessToken en el LocalStorage.' );
        this.errorCode = 'AccessTokenNotFound';
    }
}
