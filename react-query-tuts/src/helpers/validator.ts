import { z } from 'zod';
import validator from 'validator';

const spaceFilteredString = z.string().trim();

const username = spaceFilteredString.min(3, "minimum 3 characters").max(20, "max 20 characters").refine(val => validator.isAlphanumeric(val, "en-GB", { ignore: "-_" }), "should only contain alphanumeric characters and -_ chars.")

const password = spaceFilteredString.min(8, "Should be atleast 8 characters").max(24, "Maximum value should be 24 characters").refine(val => validator.isStrongPassword(val, { minLength: 8 }), "Password is weak")

const email = spaceFilteredString.email("It Should be a valid email.")


const nameInp = spaceFilteredString.min(1, "minimum one character").max(24, "maximum 24 characters").toLowerCase().refine(val => validator.isAlpha(val), "Enter a valid name");

const unrestrictedPWD = spaceFilteredString.max(24);
const isValidJWT = spaceFilteredString.refine(val => validator.isJWT(val));

const id_err_msg = "Invalid id";
const validIntId = z.number({ errorMap: () => ({ message: id_err_msg }) }).int().positive().gte(1).finite();
const convertableValidIntId = z.string().transform((id, ctx) => {
    const parsedId = parseInt(id);
    return parsedId;
}).pipe(validIntId);

const validUUID = spaceFilteredString.uuid();

const validComment = spaceFilteredString.min(1).max(450);

const myValidators = {
    spaceFilteredString,
    username,
    password,
    email,
    nameInp,
    unrestrictedPWD,
    isValidJWT,
    validIntId,
    convertableValidIntId,
    validUUID,
    validComment
}

export default myValidators;