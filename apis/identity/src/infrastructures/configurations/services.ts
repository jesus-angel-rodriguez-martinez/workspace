import { CONFIGURATION_SCHEMA } from '@infrastructures/configurations';
import { ConfigurationService } from '@libs/configuration';

const configurationService = new ConfigurationService(CONFIGURATION_SCHEMA);

export const { API_PORT, ENVIRONMENT, JWT_SECRET } = configurationService.getAll();
