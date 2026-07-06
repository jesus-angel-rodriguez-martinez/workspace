import { join } from 'node:path';
import { AbstractPathsService, type IResolvedPaths } from '@domains/paths';

export class PathsService extends AbstractPathsService {
  constructor() {
    super();
  }

  resolve(app: string): IResolvedPaths {
    const cwd = process.cwd();

    const apiDocPath = join(cwd, 'node_modules', '@apis', `${app}-core`, 'dist', `${app}.yaml`);
    const endpointsPath = join(cwd, 'src', 'infrastructures', 'apis', 'routes');

    return { apiDocPath, endpointsPath };
  }
}
