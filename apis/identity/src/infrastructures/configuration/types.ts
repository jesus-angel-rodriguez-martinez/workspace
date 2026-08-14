import { type Configuration, type ResolvedConfiguration } from '@libs/configuration';

export type ComposeConfiguration = <C extends Configuration>(configuration: C) => ResolvedConfiguration<C>;
