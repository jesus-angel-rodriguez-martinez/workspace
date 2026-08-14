import { type AbstractTokenService, type ITokenServiceConfiguration } from '@libs/security';

export type ComposeToken = (configuration: ITokenServiceConfiguration) => AbstractTokenService;
