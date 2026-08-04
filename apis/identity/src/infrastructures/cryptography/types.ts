import { type AbstractCryptographyService, type ICryptographyServiceConfiguration } from '@libs/security';

export type ComposeCryptography = (
  configuration: ICryptographyServiceConfiguration
) => AbstractCryptographyService;
