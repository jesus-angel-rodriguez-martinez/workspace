import { type Configuration, type ResolvedConfiguration } from '@libs/configuration';

export type ComposeConfigurations = <C extends Configuration>(configuration: C) => ResolvedConfiguration<C>;
