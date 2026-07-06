import passport from 'passport';
import { ExtractJwt, Strategy, type StrategyOptionsWithoutRequest } from 'passport-jwt';
import {
  AbstractAuthenticationMiddlewaresService,
  AuthenticationMiddlewareAlreadyInitializedError,
  type IAuthenticationMiddlewaresServiceConfiguration
} from '@domains/authentication-middlewares';
import { type ISecureUser, type ITokenPayload } from '@libs/security';

export class AuthenticationMiddlewaresService extends AbstractAuthenticationMiddlewaresService {
  protected static isAlreadyInitialized: boolean = false;

  constructor(configuration: IAuthenticationMiddlewaresServiceConfiguration) {
    super(configuration);
  }

  public init(): void {
    if (AuthenticationMiddlewaresService.isAlreadyInitialized) {
      throw new AuthenticationMiddlewareAlreadyInitializedError();
    }

    const jwtStrategy = this.setJwtStrategy();
    passport.use(jwtStrategy);

    AuthenticationMiddlewaresService.isAlreadyInitialized = true;
  }

  protected setJwtStrategy() {
    const options: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret
    };

    const strategy = new Strategy(options, async (tokenPayload: ITokenPayload, done) => {
      try {
        const { user } = tokenPayload;
        const { id } = user;

        const userModel = await this.usersRepository.findOne({
          id
        });
        if (!userModel) {
          return done(null, false);
        }

        const secureUser: ISecureUser = {
          about: userModel.about,
          id: userModel.id,
          name: userModel.name,
          username: userModel.username
        };
        return done(null, secureUser);
      } catch {
        return done(null, false);
      }
    });

    return strategy;
  }
}
