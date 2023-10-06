import { formatDistance } from "date-fns";


export function avatarGen(seed: string) {
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&size=75&backgroundColor=5aabf6,0cedea&backgroundType=gradientLinear`;
}

export function getFullName(firstname: string, lastname: string) {
    return firstname + " " + lastname;
}

export function readableDate(date: string) {
    try {
        return formatDistance(new Date(date), new Date(), { addSuffix: true })
    } catch (error) {
        return ""
    }
}

export class CustValidationErr extends Error {
    constructor(message: string) {
        super(message);
        this.message = message
    }
}