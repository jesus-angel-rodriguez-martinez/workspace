import passport from 'passport';
import { type ISecureUser } from '@libs/security';
import { type OpenAPI } from 'openapi-types';

export const jwtSecurityHandler = (request: OpenAPI.Request): Promise<boolean> => {
  return new Promise((resolve) => {
    passport.authenticate('jwt', { session: false }, (error: Error, user: ISecureUser | undefined) => {
      if (error || !user) {
        return resolve(false);
      }

      request.user = user;
      return resolve(true);
    })(request);
  });
};
