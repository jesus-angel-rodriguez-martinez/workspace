import { type ISecureUser } from '@libs/security';

declare module 'openapi-types' {
  namespace OpenAPI {
    interface Request {
      user?: ISecureUser;
    }
  }
}
