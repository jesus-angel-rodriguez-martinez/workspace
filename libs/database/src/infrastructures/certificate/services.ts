import { AbstractCertificateService, type ICertificateServiceOptions } from '@domains/certificate';
import { readFileSync } from 'node:fs';

export class CertificateService extends AbstractCertificateService {
  public constructor(options: ICertificateServiceOptions) {
    super(options);
  }

  public read(): string {
    const { fileName } = this.configuration;

    const filePath = this.pathService.resolveCertificateFile(fileName);

    const content = readFileSync(filePath, 'utf8');
    return content;
  }
}
