import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { HttpExceptionFilter } from './exception/HttpExceptionFilter';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    bodyParser: true,
  });
  app.setGlobalPrefix('api/v1');

  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
