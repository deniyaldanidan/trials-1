import { GraphQLError } from "graphql";

/**
 - Throw this error when user is not authenticated
 - Has optional `message` param (accepts `string`).
*/
export default class AuthenticationError extends GraphQLError {

    constructor(message = "USER NOT AUTHENTICATED") {
        super(message, {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 }
            }
        });
        this.name = "AuthenticationError";
    }
}