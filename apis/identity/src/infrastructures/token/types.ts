import { type AbstractTokenService, type ITokenServiceOptions } from '@libs/security';

export type ComposeToken = (options: ITokenServiceOptions) => AbstractTokenService;
