import { type ComposeConfigurations } from '@infrastructures/configurations';
import { ConfigurationService } from '@libs/configuration';

export const composeConfigurations: ComposeConfigurations = (configuration) => {
  const configurationService = new ConfigurationService(configuration);
  const configurations = configurationService.getAll();
  return configurations;
};
