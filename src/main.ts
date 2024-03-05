import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const yamlDocument = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf8' }),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, yamlDocument);

  await app.listen(4000);
}

bootstrap();
