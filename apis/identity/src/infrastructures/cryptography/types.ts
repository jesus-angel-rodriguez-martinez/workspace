import { type AbstractCryptographyService, type ICryptographyServiceOptions } from '@libs/security';

export type ComposeCryptography = (options: ICryptographyServiceOptions) => AbstractCryptographyService;
