import { type Configuration } from '@libs/configuration';

export const CONFIGURATION_SCHEMA = {
  /* 📡 API configuration. */
  API_PORT: 'number',
  /* ⚙️ Environment configuration. */
  ENVIRONMENT: 'string',
  /* 🔒 JWT configuration. */
  JWT_SECRET: 'string'
} as const satisfies Configuration;
