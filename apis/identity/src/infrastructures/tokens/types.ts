import { type AbstractTokenService, type ITokenServiceConfiguration } from '@libs/security';

export type ComposeTokens = (configuration: ITokenServiceConfiguration) => AbstractTokenService;
