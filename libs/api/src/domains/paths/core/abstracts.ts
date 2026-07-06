import { type IResolvedPaths } from '@domains/paths';

/**
 * Base abstract service responsible for resolving application paths.
 */
export abstract class AbstractPathsService {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Resolves absolute paths for an application's core document and its associated directory.
   *
   * @param app - Name of the application whose paths are being resolved.
   *
   * @returns An object containing the resolved absolute paths.
   */
  public abstract resolve(app: string): IResolvedPaths;
}
