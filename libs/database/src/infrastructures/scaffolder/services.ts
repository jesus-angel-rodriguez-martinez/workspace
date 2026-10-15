import {
  AbstractScaffolderService,
  type IScaffolderServiceOptions,
  InvalidMigrationNameError,
  MissingMigrationNameError,
  SCAFFOLDER_RULES
} from '@domains/scaffolder';
import { promises } from 'node:fs';

export class ScaffolderService extends AbstractScaffolderService {
  public constructor(options: IScaffolderServiceOptions) {
    super(options);
  }

  public async create(name: string | undefined): Promise<string> {
    if (!name) {
      throw new MissingMigrationNameError();
    }

    const { ALLOWED_CHARACTERS } = SCAFFOLDER_RULES.fileName.REGEX_PATTERNS;
    if (!ALLOWED_CHARACTERS.test(name)) {
      throw new InvalidMigrationNameError(name);
    }

    const fileName = this.createFileName(name);
    const migrationFolder = this.pathService.resolveMigrationFolder();
    const filePath = this.pathService.resolveMigrationFile(fileName);
    const template = this.createTemplate();

    await promises.mkdir(migrationFolder, { recursive: true });
    await promises.writeFile(filePath, template, { flag: 'wx' });

    return filePath;
  }

  protected createFileName(name: string): string {
    const timestamp = this.createTimestamp();
    const fileName = `${timestamp}_${name}.ts`;
    return fileName;
  }

  protected createTemplate(): string {
    const template = [
      `import { type Kysely } from 'kysely';`,
      ``,
      `export async function up(db: Kysely<unknown>): Promise<void> {}`,
      ``,
      `export async function down(db: Kysely<unknown>): Promise<void> {}`,
      ``
    ].join('\n');
    return template;
  }

  private createTimestamp(): string {
    const { NON_DIGITS } = SCAFFOLDER_RULES.timestamp.REGEX_PATTERNS;

    const timestamp = new Date().toISOString().replace(NON_DIGITS, '').slice(0, 14);
    return timestamp;
  }
}
