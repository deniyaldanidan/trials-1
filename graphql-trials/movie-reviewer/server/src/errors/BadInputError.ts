import { GraphQLError } from "graphql";

/**
 - Throw this error when input values from client are invalid
 - Has optional `message` param (accepts `string`).
*/
export default class BadInputError extends GraphQLError {

    constructor(message = "Invalid Values") {
        super(message, {
            extensions: {
                code: "BAD_USER_INPUT",
                http: { status: 400 }
            }
        });
        this.name = "BadInputError";
    }
}