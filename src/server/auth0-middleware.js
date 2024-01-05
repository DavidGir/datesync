// This serves as Auth0 configuration and middleware setup

import { auth } from 'express-oauth2-jwt-bearer';
import 'dotenv/config';

// This is the config for the JWT middleware:
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
  // tokenSigningAlg: 'RS256'
});

export default checkJwt;

