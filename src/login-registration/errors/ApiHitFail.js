/**
 * Error personalizado para lanzar cuando falla el API.
 */
export class ApiHitFail extends Error {
    constructor( endpoint ) {
        super( `Ups!, no pudimos conectarnos con el servidor: ${endpoint}` );
        this.errorCode = 'ApiHitFail';
    }
}