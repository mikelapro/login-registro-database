/**
 * Error personalizado para lanzar cuando falla el API.
 */
export class ApiHitFail extends Error {
    constructor( endpoint ) {
        super( `Se produjo un error al intentar hacer el fetch al endpoint: ${endpoint}` );
        this.errorCode = 'ApiHitFail';
    }
}