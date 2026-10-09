import { AbstractPathService } from '@domains/path';
import { resolve } from 'node:path';

export class PathService extends AbstractPathService {
  public constructor() {
    super();
  }

  public resolveMigrationsFolder(): string {
    const directory = process.cwd();
    const folderPath = resolve(directory, 'database', 'migrations');
    return folderPath;
  }
}
