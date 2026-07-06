import { type ISecureUser } from '@libs/security';

declare global {
  namespace Express {
    interface Request {
      user?: ISecureUser;
    }
  }
}
