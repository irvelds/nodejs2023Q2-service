import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const yamlDocument = yaml.load(
    await readFile('./doc/api.yaml', { encoding: 'utf8' }),
  ) as OpenAPIObject;
  SwaggerModule.setup('doc', app, yamlDocument);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(4000);
}

bootstrap();
