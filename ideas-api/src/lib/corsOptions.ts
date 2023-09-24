import { CorsOptions } from "cors";
import { AllowedOrigins, CorsErrMsg } from "../config";

const corsOptions: CorsOptions = {
    origin(requestOrigin, callback) {
        // On Production remove the undefined check. If you Don't, Application will be vulnerable to CORS-Related Attacks
        if (typeof requestOrigin === "undefined" || AllowedOrigins.includes(requestOrigin)) {
            return callback(null, true);
        } else {
            return callback(new Error(CorsErrMsg))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions;