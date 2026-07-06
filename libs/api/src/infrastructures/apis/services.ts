import { AbstractApiService, type IApiServiceConfiguration } from '@domains/apis';

export class ApiService extends AbstractApiService {
  constructor(configuration: IApiServiceConfiguration) {
    super(configuration);
  }

  public async close(): Promise<void> {
    try {
      const { server } = this;

      if (!server) {
        this.loggerService.warn('Server connection not found.');
        return;
      }

      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        });
      });

      this.loggerService.info('Server connection closed successfully.');
      this.server = undefined;
    } catch (e) {
      const error = e as Error;
      this.loggerService.error('Failed to close the server connection.', { error });
    }
  }

  public async init(): Promise<void> {
    try {
      this.globalMiddlewaresService.setRequestMiddlewares();

      this.globalMiddlewaresService.setValidators();

      await this.globalMiddlewaresService.setRouting();

      this.globalMiddlewaresService.setResponseMiddlewares();

      this.authenticationMiddlewaresService.init();

      this.server = this.app.listen(this.port, () =>
        this.loggerService.info(`Server connection established successfully on 'PORT:${this.port}'.`)
      );
    } catch (e) {
      const error = e as Error;
      throw new Error('Failed to init the server.', { cause: error });
    }
  }
}
