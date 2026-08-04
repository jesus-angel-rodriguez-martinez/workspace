import { ENVIRONMENT } from '@infrastructures/configurations';

export const shouldPrettify = ENVIRONMENT === 'development';
