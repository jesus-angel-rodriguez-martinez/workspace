import { AbstractPathService } from '@domains/path';
import { join, resolve } from 'node:path';

export class PathService extends AbstractPathService {
  public constructor() {
    super();
  }

  public resolveCertificateFile(certificateFileName: string): string {
    const certificateFolder = this.resolveCertificateFolder();
    const filePath = join(certificateFolder, certificateFileName);
    return filePath;
  }

  public resolveCertificateFolder(): string {
    const directory = process.cwd();
    const folderPath = resolve(directory, 'database', 'certificates');
    return folderPath;
  }

  public resolveMigrationFile(migrationFileName: string): string {
    const migrationFolder = this.resolveMigrationFolder();
    const filePath = join(migrationFolder, migrationFileName);
    return filePath;
  }

  public resolveMigrationFolder(): string {
    const directory = process.cwd();
    const folderPath = resolve(directory, 'database', 'migrations');
    return folderPath;
  }
}
