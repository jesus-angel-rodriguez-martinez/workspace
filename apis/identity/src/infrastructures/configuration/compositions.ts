import { type ComposeConfiguration } from '@infrastructures/configuration';
import { ConfigurationService } from '@libs/configuration';

export const composeConfiguration: ComposeConfiguration = (configuration) => {
  const configurationService = new ConfigurationService(configuration);
  const configurations = configurationService.getAll();
  return configurations;
};
