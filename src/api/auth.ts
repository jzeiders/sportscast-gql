import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";

export const checkJwt = jwt({
	// Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://sports-cast.auth0.com/.well-known/jwks.json`
	}),
	credentialsRequired: false,

	// Validate the audience and the issuer.
	audience: process.env.AUTH0_AUDIENCE,
	issuer: `https://sports-cast.auth0.com/`,
	algorithms: ["RS256"]
});
