import { GraphQLError } from "graphql";

/**
 - Throw this error when user is not allowed to perform an action
 - Has optional `message` param (accepts `string`).
*/
export default class AuthorizationError extends GraphQLError {

    constructor(message = "FORBIDDEN ACTION") {
        super(message, {
            extensions: {
                code: "FORBIDDEN_ACTION",
                http: { status: 403 }
            }
        });
        this.name = "AuthorizationError";
    }
}