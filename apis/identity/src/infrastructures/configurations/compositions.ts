import { CONFIGURATION_SCHEMA } from '@infrastructures/configurations';
import { ConfigurationService } from '@libs/configuration';

export const composeConfiguration = () => {
  const configurationService = new ConfigurationService(CONFIGURATION_SCHEMA);
  const configurations = configurationService.getAll();
  return configurations;
};
