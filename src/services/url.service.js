import { nanoid } from "nanoid";

export const generateShortUrl = () => {
    return nanoid(5);
}